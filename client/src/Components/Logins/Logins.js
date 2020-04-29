import React, { useEffect } from 'react';
import SpotifyLogin from './react-spotify-login/src/SpotifyLogin';
import { useSelector, useDispatch } from 'react-redux';
import { setSpotifyToken } from '../../Actions/authenticationActions';
import './logins.css';

function Logins() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authentication);
  const loginURL = 'http://localhost:3001/login';
  const onSuccessSpotify = (response) =>
    dispatch(setSpotifyToken(response.access_token));

  const onFailureSpotify = (response) => console.error(response);

  const loginAgain = () => dispatch(setSpotifyToken(''));

  useEffect(() => {
    const queryStr = window.location.search;
    const token = new URLSearchParams(queryStr).get('token');
    console.log(token);
    if (token) {
      dispatch(setSpotifyToken(token));
    }
  }, []);

  return (
    <div className="Logins">
      {!auth.spotifyToken && (
        <SpotifyLogin
          clientId={process.env.REACT_APP_SPOTIFY_ID}
          redirectUri="http://localhost:3000/"
          onSuccess={onSuccessSpotify}
          onFailure={onFailureSpotify}
        />
      )}
      {auth.spotifyToken && (
        <button className="loginButton" onClick={loginAgain}>
          Logout
        </button>
      )}
      {auth.spotifyToken && (
        <p>
          Spotify logged in{' '}
          <span role="img" aria-label="rock">
            🤘
          </span>
        </p>
      )}

      <a href={loginURL} target="_blank" rel="noopener noreferrer">
        Click here!!
      </a>
    </div>
  );
}

export default Logins;
