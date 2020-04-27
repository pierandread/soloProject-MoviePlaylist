const wtf = require('wtf_wikipedia');
const baseUrl = 'https://en.wikipedia.org/w/api.php';

export function getWikipedia(title) {
  const params = {
    action: 'opensearch',
    search: title,
    limit: '50',
    namespace: '0',
    format: 'json',
  };

  let url = baseUrl + '?origin=*';
  Object.keys(params).forEach(function (key) {
    url += '&' + key + '=' + params[key];
  });

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
    .catch(/*Put catch code*/);
}

export async function getSongList(title) {
  const result = {
    titles: [],
    artists: [],
  };
  const wikiUrl = await getWikipedia(title);
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
        } else return undefined;
      })
      .then((data) => {
        for (let key in data) {
          if (key.includes('title')) result.titles.push(data[key]);
          if (key.includes('extra')) result.artists.push(data[key]);
        }

        return result;
      });
  }
  return result;
}
