import ApiHelpers from './ApiHelpers';

const BASE_URL = 'https://api.spotify.com/v1';

export default {
  getSpotifyUserId: async (token) => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await ApiHelpers.fetchRequest(`${BASE_URL}/me`, options);
  },

  createPlaylist: async (userId, movieTitle, token) => {
    const url = `${BASE_URL}/users/${userId}/playlists`;
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
    return await ApiHelpers.fetchRequest(url, options);
  },

  searchAlbum: async (movieTitle, token) => {
    const url = `${BASE_URL}/search` +
      `?q=album:${movieTitle}+soundtrack` +
      `&type=album,playlist` +
      `&market=from_token`;
    const options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      Accept: 'application/json',
    };
    let songs = [];
    try {
      const res = await ApiHelpers.fetchRequest(url, options);
      if (res.albums && res.albums.items && res.albums.items[0]) {
        const album = res.albums.items[0];
        const albumUrl = `${BASE_URL}/albums/${album.id}/tracks` +
        `?limit=50`;
        const songsRes = await ApiHelpers.fetchRequest(albumUrl, options);
        if (songsRes) songs = songsRes.items;
      } else if (res.playlists && res.playlists.items && res.playlists.items[0]) {
        const playlist = res.playlists.items[0];
        const playlistUrl = `${BASE_URL}/playlists/${playlist.id}/tracks` +
        `?limit=50`;
        const songsRes = await ApiHelpers.fetchRequest(playlistUrl, options);
        if (songsRes) songs = songsRes.items;
      }
    } catch (err) {
      return [];
    }
    return songs.map(song => ({
      song: song.name,
      artist: song.artists.map(artist => artist.name).join(', '),
      id: song.id
    }));
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
        url = `${BASE_URL}/search?q=${encodeURIComponent(
          song.song
        )}%20artist:${encodeURIComponent(song.artist)}&type=track&limit=10`;
      } else {
        url = `${BASE_URL}/search?q=${encodeURIComponent(
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
    const url = `${BASE_URL}/playlists/${playlistId}/tracks?uris=${encodeURIComponent(
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
    return await ApiHelpers.fetchRequest(url, options);
  },
};
