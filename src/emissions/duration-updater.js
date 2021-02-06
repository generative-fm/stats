import getPendingEmissions from './get-pending-emissions';
import storeUnsyncedEmission from './store-unsynced-emission';

const NEXT_UPDATE_TIMEOUT = 1000 * 10;

const updatingEmissionIds = new Set();
let nextUpdateTimeoutId;

const updateEmissions = () => {
  if (updatingEmissionIds.size === 0) {
    return;
  }
  getPendingEmissions().then((pendingEmissions) => {
    Promise.all(
      Array.from(updatingEmissionIds).map((emissionId) => {
        const emission = pendingEmissions.get(emissionId);
        if (!emission) {
          updatingEmissionIds.delete(emissionId);
          return;
        }
        emission.endTime = Date.now();
        // TODO pass all emissions to storage in one go
        return storeUnsyncedEmission(emission);
      })
    ).then(() => {
      if (updatingEmissionIds.size === 0) {
        return;
      }
      nextUpdateTimeoutId = setTimeout(updateEmissions, NEXT_UPDATE_TIMEOUT);
    });
  });
};

const track = ({ emissionId }) => {
  clearTimeout(nextUpdateTimeoutId);
  updatingEmissionIds.clear();
  updatingEmissionIds.add(emissionId);
  nextUpdateTimeoutId = setTimeout(updateEmissions, NEXT_UPDATE_TIMEOUT);
};

const untrack = ({ emissionId }) => {
  clearTimeout(nextUpdateTimeoutId);
  updatingEmissionIds.delete(emissionId);
  if (updatingEmissionIds.size === 0) {
    clearTimeout(nextUpdateTimeoutId);
  }
};

export { track, untrack };
