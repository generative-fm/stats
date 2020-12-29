import ENDPOINT from '../endpoint';
import loadUnsyncedEmissions from './load-unsynced-emissions';
import deleteUnsyncedEmissions from './delete-unsynced-emissions';

const POST_URL = `${ENDPOINT}/emissions`;
const MAX_EMISSIONS_PER_REQUEST = 25;

const postingEmissionIds = new Set();
const postEmissions = (emissions) => {
  emissions.forEach(({ emissionId }) => {
    postingEmissionIds.add(emissionId);
  });
  return fetch(POST_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ emissions }),
  })
    .then((response) => {
      if (!response.ok) {
        return false;
      }
      return deleteUnsyncedEmissions(emissions);
    })
    .catch(() => false)
    .then(() => {
      emissions.forEach(({ emissionId }) => {
        postingEmissionIds.delete(emissionId);
      });
    });
};

const syncEmissions = () =>
  loadUnsyncedEmissions().then((emissions) => {
    const emissionGroups = emissions
      .filter(({ emissionId }) => !postingEmissionIds.has(emissionId))
      .reduce((groups, emission, i) => {
        const groupIndex = Math.floor(i / MAX_EMISSIONS_PER_REQUEST);
        const group = groups[groupIndex] || [];
        group[i % MAX_EMISSIONS_PER_REQUEST] = emission;
        groups[groupIndex] = group;
        return groups;
      }, []);
    return Promise.all(emissionGroups.map(postEmissions));
  });

export default syncEmissions;
