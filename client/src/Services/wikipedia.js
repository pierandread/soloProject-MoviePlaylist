import React, { useState, useEffect } from 'react';

//
const wtf = require('wtf_wikipedia');
//

function Wikipedia({ title, setSongs, setArtists }) {
  const [wikiUrls, setWikiUrls] = useState();
  const [wikiUrl, setWikiUrl] = useState();

  useEffect(() => {
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        return setWikiUrls(response[3]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  let url = 'https://en.wikipedia.org/w/api.php';

  let params = {
    action: 'opensearch',
    search: title,
    limit: '50',
    namespace: '0',
    format: 'json',
  };

  url = url + '?origin=*';
  Object.keys(params).forEach(function (key) {
    url += '&' + key + '=' + params[key];
  });

  const conditions = ['soundtrack', 'music', 'OST', 'Music'];

  if (wikiUrls && !wikiUrl) {
    for (let url of wikiUrls) {
      if (conditions.some((el) => url.includes(el))) return setWikiUrl(url);
    }
  }

  if (wikiUrl) {
    wtf
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
        if (data.templates) {
          return data.templates[0];
        } else return undefined;
      })
      .then((data) => {
        let titles = [];
        let artists = [];
        for (let key in data) {
          if (key.includes('title')) titles.push(data[key]);
          if (key.includes('extra')) artists.push(data[key]);
        }
        if (titles[0]) {
          setSongs(titles);
        }
        if (artists[0]) {
          setArtists(artists.slice(1));
        }
      });
    setWikiUrl();
    setWikiUrls();
  }

  return <div className="wiki"></div>;
}

export default Wikipedia;
