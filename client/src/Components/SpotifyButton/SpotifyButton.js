import React from 'react';
import { useSelector } from 'react-redux';
import SpotifyApi from '../../Services/SpotifyApi';
import { toast } from 'react-toastify';
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

  if (auth.spotifyToken === undefined) {
    return (
      <div>
        <button
          className="spotifyButton"
          onClick={() => {
            alert('Login Required!');
          }}
        >
          {' '}
          LogIn to your Spotify <br /> account.
        </button>
      </div>
    );
  }

  return (
    <div>
      <button className="spotifyButton" onClick={magicHappening}>
        {' '}
        Import playlist <br /> on Spotify
      </button>
    </div>
  );
}

export default SpotifyButton;
