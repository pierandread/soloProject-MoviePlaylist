const router = require('express').Router();

const authorization = require('./services/authorisation');
const User = require('./controllers/user');

router.get(
  '/login',
  authorization.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private', 'playlist-modify-private'],
  })
);

router.get(
  '/login/callback',
  authorization.authenticate('spotify', {
    failureRedirect: '/',
  }),
  User.authenticate
);

module.exports = router;
