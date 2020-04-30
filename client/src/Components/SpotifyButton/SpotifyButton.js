import React from 'react';
import { useSelector } from 'react-redux';
import SpotifyApi from '../../Services/SpotifyApi';
import { toast } from 'react-toastify';
import Logins from '../Logins/Logins';
import Button from 'react-bootstrap/Button';
import 'react-toastify/dist/ReactToastify.css';
import './SpotifyButton.css';

function SpotifyButton({ title, songs }) {
  const auth = useSelector((state) => state.authentication);

  const notify = () => toast(title + ' Playlist Imported Successfully');
  toast.configure();

  const magicHappening = async () => {
    const playlist = await SpotifyApi.createPlaylist(
      auth.spotifyId,
      title,
      auth.spotifyToken
    );
    const songIds = await SpotifyApi.searchSongs(songs, auth.spotifyToken);
    await SpotifyApi.addSongs(songIds, playlist.id, auth.spotifyToken);
    console.log('playlist imported successfully');
    await notify();
  };

  return (
    auth.spotifyToken
    ? <div>
        <Button className="spotifyButton"
        onClick={magicHappening}
        variant="outline-primary"
        >
          {' '}
          Import playlist <br /> on Spotify
        </Button>
      </div>
    : <Logins />
      // <button
      //   className="spotifyButton" onClick={() => {alert('Login Required!');}}>
      //   {' '}
      //   Login to your Spotify <br /> account.
      // </button>
  );
}

export default SpotifyButton;
