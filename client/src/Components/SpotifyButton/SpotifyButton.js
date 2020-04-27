import React from 'react';
import { useSelector } from 'react-redux';
import {
  createPlaylist,
  searchSongs,
  addSongs,
} from '../../Services/SpotifyPlaylistFunctions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SpotifyButton.css';

function SpotifyButton({ title, songs }) {

  const auth = useSelector(state => state.authentication);

  const notify = () => toast(title + ' Playlist Imported Successfully');
  toast.configure();

  const magicHappening = async () => {
    const playlist = await createPlaylist(
      auth.spotifyId,
      title,
      auth.spotifyToken
    );
    const songIds = await searchSongs(songs, auth.spotifyToken);
    await addSongs(songIds, playlist.id, auth.spotifyToken);
    console.log('playlist imported successfully');
    await notify();
  };

  if (auth.spotifyToken === undefined) {
    return (
      <div>
        <button
          className="spotifyButton"
          style={{ left: '30px' }}
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
      <button
        className="spotifyButton"
        style={{ left: '60px' }}
        onClick={magicHappening}
      >
        {' '}
        Import playlist <br /> on Spotify
      </button>
    </div>
  );
}

export default SpotifyButton;
