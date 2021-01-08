import getPendingEmissions from './get-pending-emissions';
import IS_STORAGE_SUPPORTED from '../storage/is-supported';
import storeUnsyncedEmission from './store-unsynced-emission';
import syncPendingEmissions from './sync-pending-emissions';

const stopEmission = ({ token } = {}) =>
  getPendingEmissions().then((pendingEmissions) => {
    const inProgressEmissionItem = Array.from(pendingEmissions).find(
      ([, emission]) => !emission.endTime
    );
    if (!inProgressEmissionItem) {
      throw Error('No in-progress emissions to end');
    }
    const [, emission] = inProgressEmissionItem;
    emission.endTime = Date.now();
    if (IS_STORAGE_SUPPORTED) {
      return storeUnsyncedEmission(emission).then(() =>
        syncPendingEmissions({ token })
      );
    }
    return syncPendingEmissions({ token });
  });

export default stopEmission;
