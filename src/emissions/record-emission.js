import { v4 as uuidV4 } from 'uuid';
import storeUnsyncedEmission from './store-unsynced-emission';
import syncEmissions from './sync-emissions';

const recordEmission = ({ startTime, endTime, pieceId, userId }) => {
  if (!startTime || !endTime || !pieceId || !userId) {
    throw Error(
      'Emission missing one of startTime, endTime, pieceId, or userId'
    );
  }
  const emission = {
    emissionId: uuidV4(),
    startTime,
    endTime,
    pieceId,
    userId,
  };
  return storeUnsyncedEmission(emission).then(() => {
    syncEmissions();
  });
};

export default recordEmission;
