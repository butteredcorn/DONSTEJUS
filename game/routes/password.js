const express = require('express');
const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
const crypto = require('crypto');

const asyncMiddleware = require('../middleware/asyncMiddleware');
const UserModel = require('../models/userModel');

const email = process.env.EMAIL;
const pass = process.env.PASSWORD;

const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://04c45c80d96840b58988cb9771acd41d@sentry.io/2300829' });


const smtpTransport = nodemailer.createTransport({
  service: process.env.EMAIL_PROVIDER,
  auth: {
    user: email,
    pass: pass
  }
});

const handlebarsOptions = {
  viewEngine: 'handlebars',
  viewPath: path.resolve('./templates/'),
  extName: '.html'
};

smtpTransport.use('compile', hbs(handlebarsOptions));

const router = express.Router();

/**
 * @api {post} /forgot-password
 * @apiSuccess {Object[]} jwt object
 * @apiSuccess {body} the object contains user email and id
 * @apiSuccess {token} generated token
 * @apiSuccess {email} user email
 * @apiSuccess {data} data to be sent to smtpTransport
 * 
 */
router.post('/forgot-password', asyncMiddleware(async (req, res, next) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    res.status(400).json({ 'message': 'invalid email' });
    return;
  }

  // create user token
  const buffer = crypto.randomBytes(20);
  const token = buffer.toString('hex');

  // update user reset password token and exp
  await UserModel.findByIdAndUpdate({ _id: user._id }, { resetToken: token, resetTokenExp: Date.now() + 600000 });

  // send user password reset email
  const data = {
    to: user.email,
    from: email,
    template: 'forgot-password',
    subject: 'Phaser Leaderboard Password Reset',
    context: {
      url: `http://localhost:${process.env.PORT || 3000}/reset-password.html?token=${token}`,
      name: user.name
    }
  };
  await smtpTransport.sendMail(data);

  Sentry.configureScope(function(scope) {
    scope.setTag("forgot password", "error with forgot password function");
    scope.setLevel('error');
    //throw new Error("thing.") //confirmed to work
  })

  res.status(200).json({ message: 'An email has been sent to your email. Password reset link is only valid for 10 minutes.' });
}));
/**
 * @api {post} /reset-password
 * @apiSuccess {Object[]} jwt object
 * @apiSuccess {refreshToken} token in the request
 * @apiSuccess {token} generated token
 * @apiSuccessExample {json} Success
 *  HTTP/1.1 200 OK
 *    [{
 *      "message: 'password updated'""
 *    }]
 *       or
 *  HTTP/1.1 400 Bad Request
 *    [{
 *      "message: 'invalid token"
 *    }]
 *      or
 *  HTTP/1.1 400 Bad Request
 *    [{
 *      "message: 'passwords do not match"
 *    }]
 */
router.post('/reset-password', asyncMiddleware(async (req, res, next) => {
  const user = await UserModel.findOne({ resetToken: req.body.token, resetTokenExp: { $gt: Date.now() } });
  if (!user) {
    res.status(400).json({ 'message': 'invalid token' });
    return;
  }

  // ensure provided password matches verified password
  if (req.body.password !== req.body.verifiedPassword) {

    // create counter, reset counter after successful login or time elapsed
    // Sentry.configureScope(function(scope) {
    //   scope.setTag("login-attempt", "error with login attempts");
    //   scope.setLevel('error');
    //   //throw new Error("thing.") //confirmed to work
    // })

    res.status(400).json({ 'message': 'passwords do not match' });
    return;
  }

  // update user model
  user.password = req.body.password;
  user.resetToken = undefined;
  user.resetTokenExp = undefined;
  await user.save();

  // send user password update email
  const data = {
    to: user.email,
    from: email,
    template: 'reset-password',
    subject: 'Phaser Leaderboard Password Reset Confirmation',
    context: {
      name: user.name
    }
  };
  await smtpTransport.sendMail(data);

  res.status(200).json({ message: 'password updated' });
}));

module.exports = router;
