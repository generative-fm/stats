import { v4 as uuidV4 } from 'uuid';
import getPendingEmissions from './get-pending-emissions';
import storeUnsyncedEmission from './store-unsynced-emission';
import { track } from './duration-updater';
import IS_STORAGE_SUPPORTED from '../storage/is-supported';

const startEmission = ({ pieceId, userId }) => {
  if (!pieceId) {
    return Promise.reject(new Error('Missing pieceId'));
  }
  const startTime = Date.now();
  return getPendingEmissions({ ignoreCache: true }).then((pendingEmissions) => {
    const emissionId = uuidV4();
    const emission = {
      startTime,
      emissionId,
      pieceId,
      userId,
    };
    pendingEmissions.set(emissionId, emission);
    if (!IS_STORAGE_SUPPORTED) {
      return emissionId;
    }
    return storeUnsyncedEmission(emission).then(() => {
      track({ emissionId });
      return emissionId;
    });
  });
};

export default startEmission;
