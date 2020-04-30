import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SpotifyButton from '../../Components/SpotifyButton/SpotifyButton';
import { getSongList } from '../../Services/wikipedia';
import SpotifyApi from '../../Services/SpotifyApi';
import Spinner from 'react-bootstrap/Spinner';
import './SongList.css';

function ListOfSongs({ title }) {
  const [songs, setSongs] = useState([]);
  const [songsLoaded, setSongsLoaded] = useState(false);
  const auth = useSelector((state) => state.authentication);

  useEffect(() => {
    SpotifyApi.searchAlbum(title, auth.spotifyToken)
    .then(songs => {
      if (songs.length > 0) {
        setSongs(songs);
        setSongsLoaded(true);
      } else {
        getSongList(title)
        .then((songs) => {
          setSongs(songs);
          setSongsLoaded(true);
        });
      }
    });
  }, [title]);

  return (
    <div className="listOfSong">
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
              No playlist found.
            </p>
          )
        ) : (
          <Spinner animation="border" />
        )}
      </ul>
      {songs.length > 0 && <SpotifyButton title={title} songs={songs} />}
    </div>
  );
}

export default ListOfSongs;
