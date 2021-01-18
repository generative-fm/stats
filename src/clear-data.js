import clearUnsyncedEmissions from './emissions/clear-unsynced-emissions';
import IS_SUPPORTED from './storage/is-supported';

const clearData = () =>
  IS_SUPPORTED ? clearUnsyncedEmissions() : Promise.resolve(true);

export default clearData;
