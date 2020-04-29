const wtf = require('wtf_wikipedia');
const baseUrl = 'https://en.wikipedia.org/w/api.php';

// Helper function to search the movie title in Wikipedia
// Returns the URL of the movie's sountrack Wiki page, if found
export function searchWikipediaUrl(title) {
  const params = {
    action: 'opensearch',
    search: title,
    limit: '100',
    namespace: '0',
    format: 'json',
  };

  let url = `${baseUrl}?origin=*` 
    + encodeURI(Object.keys(params).map((key) => `&${key}=${params[key]}`).join(''));
  
  // TODO give priority to soundtrack and OST and avoid 'musical'
  const conditions = ['soundtrack', 'music', 'OST', 'Music'];
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      const wikiUrls = res[3];
      for (let wikiUrl of wikiUrls) {
        if (conditions.some((el) => wikiUrl.includes(el))) {
          return wikiUrl;
        }
      }
    })
    .catch((err) => {
      console.log('Problem searching for movie title in Wikipedia', err);
      return null;
    });
}

// From a given movie title, search for the corresponding soundtrack in Wikipedia
// Returns an array with the song objects { song: <song_name>, artist: <artist> }
export async function getSongList(title) {
  const wikiUrl = await searchWikipediaUrl(title);
  if (wikiUrl) {
    return wtf
      .fetch(wikiUrl)
      .then((doc) => {
        return doc.json();
      })
      .then((doc) => {
        for (let section of doc.sections) {
          if (section.title === 'Track listing') return section;
        }
      })
      .then((data) => {
        if (data?.templates) {
          return data.templates[0];
        } else return {};
      })
      .then((data) => {
        const result = {
          titles: [],
          artists: [],
        };
        let onlyArtist = '';
        for (let key in data) {
          if (key.includes('title')) result.titles.push(data[key]);
          if (key.match(/extra\d+/)) result.artists.push(data[key]);
          if (key.match(/all_/)) onlyArtist = data[key];
        }
        if (onlyArtist) result.artists = Array(result.titles.length).fill(onlyArtist);
        return result;
      })
      .then((result) => {
        const titles = result.titles;
        const artists = result.artists;
        if (titles && typeof titles[0] !== 'object') {
          const songs = [];
          if (artists) {
            for (let i = 0; i < titles.length; i++) {
              songs[i] = { song: titles[i], artist: artists[i] };
            }
          } else {
            for (let i = 0; i < titles.length; i++) {
              songs[i] = { song: titles[i], artist: undefined };
            }
          }
          return songs;
        }
      })
      .catch((err) => {
        console.log('Problem parsing Wikipedia soundtrack page', err);
        return [];
      });
  }
  return [];
}