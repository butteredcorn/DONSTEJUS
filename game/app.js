// reads in our .env file and makes those values available as environment variables
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const routes = require('./routes/main');
const secureRoutes = require('./routes/secure');
const passwordRoutes = require('./routes/password');
const jwt = require("jsonwebtoken");

// setup mongo connection
const uri = process.env.MONGO_CONNECTION_URL;

mongoose.connect(uri, { useNewUrlParser : true, useCreateIndex: true });
mongoose.connection.on('error', (error) => {
  console.log(error);
  process.exit(1);
});
mongoose.connection.on('connected', function () {
  console.log('connected to mongo');
});
mongoose.set('useFindAndModify', false);

// create an instance of an express app
const app = express();
const server = require('http').Server(app);
const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://04c45c80d96840b58988cb9771acd41d@sentry.io/2300829' });

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// update express settings
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// require passport auth
require('./auth/auth');


// All controllers (webpage urls essentially) should be here
app.get('/game.html', passport.authenticate('jwt', { session : false }), function (req, res) {
  const cookie = req.cookies["jwt"];
  const decoded = jwt.decode(cookie);
  const { _id, email } = decoded.user
  console.log(_id, email)

  Sentry.configureScope(function(scope) {
    scope.setUser({'email': email});
    scope.setTag("game_html", "error with sending game.html");
    scope.setLevel('warning');
  });

  res.sendFile(__dirname + '/public/game.html');
});

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// main routes
app.use('/', routes);
app.use('/', passwordRoutes);
app.use('/', passport.authenticate('jwt', { session : false }), secureRoutes);

//this is the test endpoint
app.get('/debug-sentry', function mainHandler(req, res) {
  const cookie = req.cookies["jwt"];
  const decoded = jwt.decode(cookie);
  const { _id, email } = decoded.user

  Sentry.configureScope(function(scope) {
    scope.setUser({'email': email});
    scope.setTag("test_error_tag", "hello world!");
    scope.setLevel('warning');
  });
  throw new Error('My first Sentry error!');
});

//this is where all endpoints should end, after here is the Sentry.io error handler 

//see: https://docs.sentry.io/enriching-error-data/context/?platform=javascript
// Users consist of a few key pieces of information which are used to construct a unique identity in Sentry.
// Each of these is optional, but one must be present in order for the user to be captured:



// //jwt as follows: const { _id, email } = decoded.user
// Sentry.configureScope(function(scope) {
//   scope.setUser({'email': email, 'id': _id});
//   scope.setTag("page_locale", "de-at");
//   scope.setLevel('warning');
// });

// Sentry.configureScope(function(scope) {
//   scope.setTag("page_locale", "de-at");
//   scope.setLevel('warning');
// });

// Sentry.configureScope(function(scope) {
  
// });




// catch all other routes
app.use((req, res, next) => {
  res.status(404).json({ message: '404 - Not Found' });
});

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry + "\n");
  });

  app.use(Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
    // Capture all 404 and 500 errors
    if (error.status === 404 || error.status === 500) {
        return true
    }
    return false
    }
}));




// these are built in handle errors NON-sentry linked
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.status || 500).json({ error: err.message });
});



module.exports = {
  app
}

// have the server start listening on the provided port
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on http://localhost:${process.env.PORT || 3000}`);
});