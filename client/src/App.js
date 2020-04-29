import React from 'react';
import Header from './Components/Header/Header';
import Logins from './Components/Logins/Logins';
import Search from './Components/Search/Search';
// import { getSpotifyUserId } from './Services/apiCalls';
// import { useSelector, useDispatch } from 'react-redux';
// import { setSpotifyId } from './Actions/authenticationActions';
import './App.css';

function App() {
  // const dispatch = useDispatch();
  // const auth = useSelector(state => state.authentication);

  // if (auth.spotifyToken && !auth.spotifyId) {
  //   getSpotifyUserId(auth.spotifyToken)
  //     .then((user) => dispatch(setSpotifyId(user.id)));
  // }

  return (
    <div className="App">
      <Header></Header>
      <Logins />
      <Search></Search>
    </div>
  );
}

export default App;
