import ENDPOINT from '../endpoint';
import deleteUnsyncedEmissions from './delete-unsynced-emissions';
import getPendingEmissions from './get-pending-emissions';
import IS_STORAGE_SUPPORTED from '../storage/is-supported';

const POST_URL = `${ENDPOINT}/emissions`;

const postEmissions = ({ emissions, token }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return fetch(POST_URL, {
    headers,
    method: 'POST',
    body: JSON.stringify({ emissions }),
  })
    .then((response) => response.ok)
    .catch(() => false);
};

const postingEmissionIds = new Set();
const syncPendingEmissions = async ({ token } = {}) => {
  const pendingEmissions = await getPendingEmissions();
  const emissions = Array.from(pendingEmissions)
    .filter(([emissionId]) => !postingEmissionIds.has(emissionId))
    .map(([, emission]) => emission);
  emissions.forEach(({ emissionId }) => {
    postingEmissionIds.add(emissionId);
  });
  const arePostedSuccessfully = await postEmissions({ emissions, token });
  if (arePostedSuccessfully) {
    emissions.forEach(({ emissionId }) => {
      pendingEmissions.delete(emissionId);
    });
    if (IS_STORAGE_SUPPORTED) {
      await deleteUnsyncedEmissions(emissions);
    }
  }
  emissions.forEach(({ emissionId }) => {
    postingEmissionIds.delete(emissionId);
  });
  return arePostedSuccessfully;
};

export default syncPendingEmissions;
