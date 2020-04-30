import React, { useState } from 'react';
import ListOfSongs from '../../Containers/SongList/SongList';
import Button from 'react-bootstrap/Button';
import noPosterImg from '../../images/no-poster-available.png';
import './MovieItem.css';

function MovieItem({ title, posterPath, date }) {
  const [showPlaylist, setShowPlaylist] = useState(false);
  const showingButtonText = showPlaylist ? 'Hide Playlist' : 'Show Playlist';

  const openPlaylist = () => {
    return setShowPlaylist(!showPlaylist);
  };

  return (
    <div className="singleMovie">
      <div>
        <span>
          <h5 data-testid="title">{title}</h5>
        </span>
        <img className="poster-img"
          style={{ width: '200px', height: '300px' }}
          alt="movie post"
          src={
            posterPath
              ? `http://image.tmdb.org/t/p/w200${posterPath}`
              : noPosterImg
          }
        />
        <Button className="playlistButton"
          variant="outline-primary"
          onClick={openPlaylist}
        >
          {showingButtonText}
        </Button>
      </div>
      {showPlaylist && <ListOfSongs title={title} />}
    </div>
  );
}

export default MovieItem;
