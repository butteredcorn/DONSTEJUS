const express = require('express');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const UserModel = require('../models/userModel');

const router = express.Router();

router.post('/submit-score', asyncMiddleware(async (req, res, next) => {
  const { email, score } = req.body;
  //console.log(req.body)
  await UserModel.updateOne({ email }, { highScore: score });
  res.status(200).json({ status: 'ok' });
}));

router.get('/scores', asyncMiddleware(async (req, res, next) => {
  const users = await UserModel.find({}, 'name highScore -_id').sort({ highScore: -1}).limit(10);
  //console.log(UserModel.find({email}));
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
