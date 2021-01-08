import { v4 as uuidV4 } from 'uuid';
import getPendingEmissions from './get-pending-emissions';

const startEmission = ({ pieceId, userId }) => {
  if (!pieceId) {
    return Promise.reject(Error('Missing pieceId'));
  }
  return getPendingEmissions({ ignoreCache: true }).then((pendingEmissions) => {
    if (
      Array.from(pendingEmissions).some(([, emission]) => !emission.endTime)
    ) {
      throw Error('Simultaneous emissions not supported');
    }
    const startTime = Date.now();
    const emissionId = uuidV4();
    const emission = {
      startTime,
      emissionId,
      pieceId,
      userId,
    };
    pendingEmissions.set(emissionId, emission);
    return emissionId;
  });
};

export default startEmission;
