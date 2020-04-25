// create playlist for user 

export async function createPlaylist (userId, movieTitle, token) {
  const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
  const bodyOption = {
    name: `${movieTitle} SoundTrack`,
    public: false,
    description: "Create by Movie Playlist Generator"
  };
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }, 
    Accept: 'application/json',
    body: JSON.stringify(bodyOption)
  });
  return response.json()
}

export async function searchSongs (songs, token) {
  if(!songs) return;
  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  };
  const result = [];
  await asyncForEach(songs, async (song) => {
    let url ='';
    if(song.artist) {
      url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(song.song)}%20artist:${encodeURIComponent(song.artist)}&type=track&limit=10`;
    } else {
      url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(song.song)}&type=track&limit=10`;
    }    
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }, 
        Accept: 'application/json',
      });
      const res = await response.json();
      const id = res.tracks.items[0]!== undefined && res.tracks.items[0].id;
      id && result.push(id);
    }
  )
  return result;
}

export async function addSongs (songsId, playlistId, token) {
  if(!songsId) return;
  let queryWithoutId = "spotify:track:"
  let query = songsId.map(id=>`${queryWithoutId+id}`).join();
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${encodeURIComponent(query)}`;
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }, 
    Accept: 'application/json',
  })
  return response.json();
}

// POST https://api.spotify.com/v1/users/{user_id}/playlists

//     const id= "11102616416";
//     const url = "https://api.spotify.com/v1/users/11102616416/playlists"

//     async function createPlaylist(url = '', data = {}) {
//       // Default options are marked with *
//       const response = await fetch(url, {
//         method: 'POST', // *GET, POST, PUT, DELETE, etc.
//         mode: 'cors', // no-cors, *cors, same-origin
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//           // 'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         Accept: "application/json",
//         // redirect: 'follow', // manual, *follow, error
//         // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//         body: JSON.stringify(data) // body data type must match "Content-Type" header
//       });
//       return response.json(); // parses JSON response into native JavaScript objects
//     }

//     const option = {
//       name: "create by my app :) ",
//       public: false,
//       description: "maramao"
//     }

//     if (token) {
//       console.log(token, "done"); console.log(option , url); createPlaylist(url, option); 
//     }
  
  // -------------- 



// ---------------------------
  // useEffect (() => {
  //   askingdata(url, options).then(data=>setUserID(data))
  // }, [token])

  // // getting ID
  // const url = "	https://api.spotify.com/v1/me";

  // const options = {
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
  // };
  
  
  // const askingdata = function (url, options){
  //   return fetch(url, options)
  //   .then( res => res.json() )
  //   .then( data => console.log(data) )};
