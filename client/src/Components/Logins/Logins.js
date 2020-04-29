import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSpotifyToken,
  setSpotifyId,
} from '../../Actions/authenticationActions';
import './logins.css';
import Button from 'react-bootstrap/Button';

function Logins() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authentication);
  const loginURL = 'http://localhost:3001/login';

  const loginAgain = () => dispatch(setSpotifyToken(''));
  useEffect(() => {
    const queryStr = window.location.search;
    console.log('Logins -> queryStr', queryStr);
    const token = new URLSearchParams(queryStr).get('token');
    const user = new URLSearchParams(queryStr).get('user');
    console.log(token);
    // window.location.href = 'http://localhost:3000';
    if (token && user) {
      dispatch(setSpotifyToken(token));
      dispatch(setSpotifyId(user));
    }
  }, []);

  return (
    <div className="Logins">
      {!auth.spotifyToken && <Button href={loginURL}>Spotify Log In</Button>}
      {auth.spotifyToken && (
        <Button variant="primary" onClick={loginAgain}>
          Logout
        </Button>
      )}
    </div>
  );
}

export default Logins;
