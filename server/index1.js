const express = require('express');
const cors = require('cors');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const app = express();
const PORT = process.env.PORT || 3001;
// const router = require('./router');
require('dotenv').config();
const router = require('express').Router();

app.use(
  require('express-session')({
    secret: process.env.EXPRESS_PASSPORT,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cors).use(express.json());
app.use(router);
app.use(passport.initialize());
app.use(passport.session());

console.log(process.env.SPOTIFY_ID);
console.log('process.env.SPOTIFY_SECRET,', process.env.SPOTIFY_SECRET);
passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
      callbackURL: 'http://localhost:3001/callback/',
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      if (!profile) done(new Error('Empty profile'), profile);
      console.log(
        'accessToken, refreshToken, expires_in, profile',
        accessToken,
        refreshToken,
        expires_in,
        profile
      );
      const user = { accessToken, refreshToken, expires_in, profile };
      done(null, user);
    }
  )
);

app.listen(PORT, (err) => {
  if (err) return console.log(err); // eslint-disable-line no-console
  console.log(`Server listening on port ${PORT}`); // eslint-disable-line no-console
});

router.get(
  '/login',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private', 'playlist-modify-private'],
    showDialog: true,
  }),
  function (req, res) {
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  }
);
router.get('/callback', (req, res) => {
  console.log('AT CB FUNC!');
  console.log(req.body);
});
