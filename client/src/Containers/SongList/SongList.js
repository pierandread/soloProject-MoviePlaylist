import React, { useState, useEffect } from 'react';
import SpotifyButton from '../../Components/SpotifyButton/SpotifyButton';
import { getSongList } from '../../Services/wikipedia';
import './SongList.css';

function ListOfSongs({ title }) {
  const [songs, setSongs] = useState([]);
  const [songsLoaded, setSongsLoaded] = useState(false);

  useEffect(() => {
    getSongList(title).then((result) => {
      const songs = result.titles;
      const artists = result.artists;
      if (songs && typeof songs[0] !== 'object') {
        const dbSongs = [];
        if (artists) {
          for (let i = 0; i < songs.length; i++) {
            dbSongs[i] = { song: songs[i], artist: artists[i] };
          }
        } else {
          for (let i = 0; i < songs.length; i++) {
            dbSongs[i] = { song: songs[i], artist: undefined };
          }
        }
        setSongs(dbSongs);
        setSongsLoaded(true);
      }
    });
  }, [title]);

  return (
    <div className="listOfSong">
      <ul>
        <p style={{ textAlign: 'center', marginBottom: '25px' }}>
          {title} playlist:{' '}
        </p>
        {
          songsLoaded
          ? songs.length > 0
            ? songs.map((song, index) =>
              <li key={index}>
                {song.song} {song.artist && <span>by {song.artist}</span>}
              </li>)
            : <p className="noPlaylist">No playlist yet! We are working on it, stay tuned!</p>
          : <p className="noPlaylist">Loading</p>
        }
      </ul>
      <SpotifyButton title={title} songs={songs} />
    </div>
  );
}

export default ListOfSongs;
