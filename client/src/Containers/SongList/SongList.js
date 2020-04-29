import React, { useState, useEffect } from 'react';
import SpotifyButton from '../../Components/SpotifyButton/SpotifyButton';
import { getSongList } from '../../Services/wikipedia';
import Spinner from 'react-bootstrap/Spinner';
import './SongList.css';

function ListOfSongs({ title }) {
  const [songs, setSongs] = useState([]);
  const [songsLoaded, setSongsLoaded] = useState(false);

  useEffect(() => {
    getSongList(title).then((songs) => {
      setSongs(songs);
      setSongsLoaded(true);
    });
  }, [title]);

  return (
    <div className="listOfSong">
      <p>{title} playlist: </p>
      <ul>
        {songsLoaded ? (
          songs.length > 0 ? (
            songs.map((song, index) => (
              <li key={index}>
                - {song.song} {song.artist && <span>by {song.artist}</span>}
              </li>
            ))
          ) : (
            <p className="noPlaylist">
              No playlist yet! We are working on it, stay tuned!
            </p>
          )
        ) : (
          <Spinner animation="border" />
        )}
      </ul>
      <SpotifyButton title={title} songs={songs} />
    </div>
  );
}

export default ListOfSongs;
