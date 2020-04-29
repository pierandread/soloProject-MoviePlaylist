module.exports.authenticate = (req, res) => {
  console.log('AT REDIRECT', req.user);

  res.redirect(
    'http://localhost:3000' +
      `?token=${req.user.accessToken}` +
      `&user=${req.user.spotifyId}` +
      `&displayName=${req.user.displayName}`
  );
};
