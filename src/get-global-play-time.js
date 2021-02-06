import ENDPOINT from './endpoint';

const FETCH_URL = `${ENDPOINT}/global/playtime`;
const CACHE_NAME = '@generative.fm/stats';
const IS_CACHE_SUPPORTED = Boolean(self.caches);

const getGlobalPlayTime = () => {
  if (!IS_CACHE_SUPPORTED) {
    return fetch(FETCH_URL).then((response) =>
      response.ok ? response.json() : {}
    );
  }
  return self.caches.open(CACHE_NAME).then((cache) =>
    cache
      .add(FETCH_URL)
      .catch((err) => {
        console.error(err);
      })
      .then(() => cache.match(FETCH_URL))
      .then((response) => (response ? response.json() : {}))
  );
};

export default getGlobalPlayTime;
