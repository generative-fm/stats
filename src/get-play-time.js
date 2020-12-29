import ENDPOINT from './endpoint';

const FETCH_URL = `${location.protocol}//${ENDPOINT}/global/playtime`;
const CACHE_NAME = '@generative.fm/stats';
const IS_CACHE_SUPPORTED = Boolean(caches);

const getPlayTime = () => {
  if (!IS_CACHE_SUPPORTED) {
    return fetch(FETCH_URL).then((response) =>
      response.ok ? response.json() : {}
    );
  }
  return caches.open(CACHE_NAME).then((cache) =>
    cache
      .add(FETCH_URL)
      .then(() => cache.match(FETCH_URL))
      .then((response) => response.json())
      .catch((err) => console.log(err))
  );
};

export default getPlayTime;
