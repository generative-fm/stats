import getPendingEmissions from './emissions/get-pending-emissions';

const getPendingPlayTime = async () => {
  const pendingEmissions = await getPendingEmissions();
  const now = Date.now();
  return Array.from(pendingEmissions).reduce(
    (playTime, [, { pieceId, startTime, endTime = now }]) => {
      playTime[pieceId] = (playTime[pieceId] || 0) + (endTime - startTime);
      return playTime;
    },
    {}
  );
};

export default getPendingPlayTime;
