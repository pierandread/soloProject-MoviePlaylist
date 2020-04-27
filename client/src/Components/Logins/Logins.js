import React from 'react';
import SpotifyLogin from './react-spotify-login/src/SpotifyLogin';
import { useSelector, useDispatch } from 'react-redux';
import { setSpotifyToken } from '../../Actions/authenticationActions';
import './logins.css';

function Logins() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.authentication);

  const onSuccessSpotify = (response) => dispatch(setSpotifyToken(response.access_token));

  const onFailureSpotify = (response) => console.error(response);

  const loginAgain = () => dispatch(setSpotifyToken(''));

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
    </div>
  );
}

export default Logins;