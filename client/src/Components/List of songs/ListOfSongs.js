import React, { useState, useEffect } from 'react';
import SpotifyButton from '../Spotify Button/SpotifyButton';
import Wikipedia from './wikipedia';
import './ListOfSongs.css';

function ListOfSongs({ title }) {
  const [songs, setSongs] = useState();
  const [artists, setArtists] = useState();


  if (songs && typeof(songs[0])!=="object") {
    const dbSongs = [];
    if(artists) {
      for(let i=0;i<songs.length;i++){
        dbSongs[i] = {song: songs[i], artist: artists[i]}
      }
    } else {
      for(let i=0;i<songs.length;i++){
        dbSongs[i] = {song: songs[i], artist: undefined}
      }
    }
    setSongs(dbSongs);
    };
  
    return (
    <div className="listOfSong">
      <Wikipedia title={title} setSongs={setSongs} setArtists={setArtists} />
      <ul>
      <p style={{textAlign: "center", marginBottom: "25px"}}>{title} playlist: </p>
      {songs && songs.map(song=><li key={song.song}>{song.song} {song.artist && <span>by {song.artist}</span>}</li>)}
      {!songs && <p className="noPlaylist">No playlist yet! We are working on it, stay tuned!</p>}
      </ul>
      <SpotifyButton title={title} songs={songs}/>
    </div>    
  )
}




export default ListOfSongs;
