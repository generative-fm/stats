import IS_STORAGE_SUPPORTED from '../storage/is-supported';
import loadUnsyncedEmissions from './load-unsynced-emissions';

let isLoadedFromStorage = !IS_STORAGE_SUPPORTED;
const pendingEmissions = new Map();
const getPendingEmissions = ({ ignoreCache = false } = {}) => {
  if (ignoreCache || isLoadedFromStorage) {
    return Promise.resolve(pendingEmissions);
  }
  return loadUnsyncedEmissions()
    .then((emissions) => {
      emissions.forEach((emission) => {
        pendingEmissions.set(emission.emissionId, emission);
      });
      isLoadedFromStorage = true;
      return pendingEmissions;
    })
    .catch((err) => {
      console.error('Unable to load unsynced emissions', err);
      return pendingEmissions;
    });
};

export default getPendingEmissions;
