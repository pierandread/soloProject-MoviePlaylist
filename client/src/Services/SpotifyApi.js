import ApiHelpers from './ApiHelpers';

export default {
  createPlaylist: async (userId, movieTitle, token) => {
    const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const bodyOption = {
      name: `${movieTitle} SoundTrack`,
      public: false,
      description: 'Create by Movie Playlist Generator',
    };
    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      Accept: 'application/json',
      body: JSON.stringify(bodyOption),
    };

    return ApiHelpers.fetchRequest(url, options);
  },

  searchSongs: async (songs, token) => {
    if (!songs) return;
    async function asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    }
    const result = [];
    await asyncForEach(songs, async (song) => {
      let url = '';
      if (song.artist) {
        url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          song.song
        )}%20artist:${encodeURIComponent(song.artist)}&type=track&limit=10`;
      } else {
        url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          song.song
        )}&type=track&limit=10`;
      }
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        Accept: 'application/json',
      });
      const res = await response.json();
      const id = res.tracks.items[0] !== undefined && res.tracks.items[0].id;
      id && result.push(id);
    });
    return result;
  },

  addSongs: async (songsId, playlistId, token) => {
    if (!songsId) return;
    let queryWithoutId = 'spotify:track:';
    let query = songsId.map((id) => `${queryWithoutId + id}`).join();
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${encodeURIComponent(
      query
    )}`;
    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      Accept: 'application/json',
    };
    return ApiHelpers.fetchRequest(url, options);
  },
};
