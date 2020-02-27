const express = require('express');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const UserModel = require('../models/userModel');
const application = require('../app');
const router = express.Router();
const jwt = require("jsonwebtoken");

const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://04c45c80d96840b58988cb9771acd41d@sentry.io/2300829' });

/**
 * @api {post} /submit-score
 * @apiSuccess {Object[]} jwt object
 * @apiSuccess {body} the object contains user email and id
 * @apiSuccess {token} generated token
 * @apiSuccess {email} user email
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 200 OK
 *  [{
 *      status: "Score submitted. User: 123 Score: 0"
 *    }]
 * 
 */
router.post('/submit-score', asyncMiddleware(async (req, res, next) => {
  const { email, score } = req.body;
  await UserModel.updateOne({ email }, { highScore: score });

  Sentry.configureScope(function(scope) {
    scope.setUser({'email': email});
    scope.setTag("submit-score", "error with submitting scores");
    scope.setLevel('error');
    //throw new Error("thing.") //confirmed to work
  })

  await res.status(200).json({ status: `Score submitted. User: ${email} Score: ${score}` });
}));

/**
 * @api {post} /submit-score
 * @apiSuccess {Object[]} jwt object
 * @apiSuccess {body} the object contains user email and id
 * @apiSuccess {token} generated token
 * @apiSuccess {email} user email in Mongo database
 * @apiSuccess {_id} user id in Mongo database
 *  @apiSuccess {highScore} highest score id in Mongo database
 */

router.get('/scores', asyncMiddleware(async (req, res, next) => {
  const users = await UserModel.find({}, 'name highScore -_id').sort({ highScore: -1}).limit(10);
  //console.log(UserModel.find({email}));
  const cookie = req.cookies["jwt"];
  const decoded = jwt.decode(cookie);
  const { _id, email } = decoded.user
  console.log(_id, email)

  Sentry.configureScope(function(scope) {
    scope.setUser({'email': email});
    scope.setTag("scores", "error with updating scores");
    scope.setLevel('error');
    //throw new Error("thing.") //confirmed to work
  })

  res.status(200).json(users);
}));

// router.post('/submit-score', (req, res, next) => {
//   res.status(200);
//   res.json({ 'status': 'ok' });
// });
 
// router.get('/scores', (req, res, next) => {
//   res.status(200);
//   res.json({ 'status': 'ok' });
// });

module.exports = router;
