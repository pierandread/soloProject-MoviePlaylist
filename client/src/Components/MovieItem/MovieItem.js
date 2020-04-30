import React, { useState } from 'react';
import ListOfSongs from '../../Containers/SongList/SongList';
import './MovieItem.css';

function MovieItem({ title, posterPath, date }) {
  const [showPlaylist, setShowPlaylist] = useState(false);
  const showingButtonText = showPlaylist ? 'Hide Playlist' : 'Show Playlist';

  const openPlaylist = () => {
    return setShowPlaylist(!showPlaylist);
  };

  return (
    <div className="singleMovie">
      <div style={{ marginBottom: '30px' }}>
        <span>
          <p data-testid="title"> {title}</p>
        </span>
        <img className="poster-img"
          style={{ width: '200px', height: '300px' }}
          alt="movie post"
          src={
            posterPath
              ? `http://image.tmdb.org/t/p/w200${posterPath}`
              : `data:image/jpeg;base64,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`
          }
        />
        <button className="playlistButton" onClick={openPlaylist}>
          {showingButtonText}
        </button>
      </div>
      {showPlaylist && <ListOfSongs title={title} />}
    </div>
  );
}

export default MovieItem;
