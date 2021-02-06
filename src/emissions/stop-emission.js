import getPendingEmissions from './get-pending-emissions';
import IS_STORAGE_SUPPORTED from '../storage/is-supported';
import storeUnsyncedEmission from './store-unsynced-emission';
import syncPendingEmissions from './sync-pending-emissions';
import { untrack } from './duration-updater';

const stopEmission = ({ token, emissionId } = {}) => {
  const endTime = Date.now();
  untrack({ emissionId });
  return getPendingEmissions().then((pendingEmissions) => {
    const stoppedEmission = pendingEmissions.get(emissionId);
    if (!stoppedEmission) {
      throw new Error('Emission not found');
    }
    stoppedEmission.endTime = endTime;
    if (IS_STORAGE_SUPPORTED) {
      return storeUnsyncedEmission(stoppedEmission).then(() =>
        syncPendingEmissions({ token })
      );
    }
    return syncPendingEmissions({ token });
  });
};

export default stopEmission;
