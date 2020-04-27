import React, { useState, useEffect } from 'react';
import SpotifyButton from '../../Components/SpotifyButton/SpotifyButton';
import { getSongList } from '../../Services/newWikipedia';
import './SongList.css';

function ListOfSongs({ title }) {
  const [songs, setSongs] = useState();
  const [artists, setArtists] = useState();

  useEffect(() => {
    // it should return a promise
    getSongList(title).then((result) => {
      setSongs(result.titles);
      setArtists(result.artists);
    });
  }, [title]);

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
  }

  return (
    <div className="listOfSong">
      <div className="wiki"></div>;
      <ul>
        <p style={{ textAlign: 'center', marginBottom: '25px' }}>
          {title} playlist:{' '}
        </p>
        {songs &&
          songs.map((song, index) => (
            <li key={index}>
              {song.song} {song.artist && <span>by {song.artist}</span>}
            </li>
          ))}
        {!songs && <p className="noPlaylist">Loading</p>}

        {/* {!songs && <p className="noPlaylist">No playlist yet! We are working on it, stay tuned!</p>} */}
      </ul>
      <SpotifyButton title={title} songs={songs} />
    </div>
  );
}

export default ListOfSongs;

//TODO turn Wikipedia into a function rather than a react component

//MockData, artist name left in uppercase to mimic tunefind API
// if (title === "Donnie Darko" && !songs) {
//   let fakeDb = [{song: "Lucid Memory", artist: "GERARD BAUER AND MIKE BAUER"}, {song: "Never Tear Us Apart", artist: "INXS"}, {song: "Head Over Heels", artist: "TEARS FOR FEARS"}, {song: "Under the Milky Way", artist: "THE CHURCH"}, {song: "Mad World", artist: "MICHAEL ANDREWS & GARY JULES"}, {song: "Time Travel" , artist: "MICHAEL ANDREWS"}, {song:"Voices Carry" , artist:"'TIL TUESDAY"}, {song:"Waltz in the 4th Dimension" , artist:"MICHAEL ANDREWS"}];
//   setSongs(fakeDb)
// }

// if (title === "Watchmen" && !songs) {
//   let fakeDb = [{song: "Unforgettable", artist: "NAT KING COLE"}, {song: "The Times They Are A-Changin", artist: "BOB DYLAN"}, {song: "99 Luftballons", artist: "NENA"}, {song: "The sound of silence", artist: "SIMON & GARFUNKEL"}, {song: "Ride of the Valkyries", artist: "BUDAPEST SYMPHONY ORCHESTRA"}, {song: "Me and Bobby McGee" , artist: "JANIS JOPLIN"}, {song:"I'm Your Boogie Man" , artist:"K.C. AND THE SUNSHINE BAND"}, {song:"Hallelujah" , artist:"LEONARD COHEN"}, {song:"Everybody Wants to Rule the World" , artist:"TEARS FOR FEARS"}, {song:"All Along the Watchtower" , artist:"JIMI HENDRIX"}, {song:"Desolation Row" , artist:"MY CHEMICAL ROMANCE"}, {song:"First We Take Manhattan" , artist:"LEONARD COHEN"}];
//   setSongs(fakeDb)
// }
//
