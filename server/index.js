const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');

const app = express();

const router = require('./router');

const SERVER_URL = process.env.SERVER_BASE_URL || 'http://localhost';
const CLIENT_URL = process.env.CLIENT_BASE_URL || 'http://localhost';
const PORT = process.env.PORT || 3001;
const CLIENT_PORT = process.env.CLIENT_PORT || 3000;

// const corsOptions = {
//   origin: `${CLIENT_URL}:${CLIENT_PORT}`,
//   optionsSuccessStatus: 200,
//   allowedHeaders: 'Content-Type,Authorization',
//   credentials: true,
// };
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

const server = app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server listening at ${SERVER_URL}:${PORT}`);
});
