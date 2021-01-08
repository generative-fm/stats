import { makeOpenDb } from '@alexbainter/indexed-db';
import UNSYNCED_EMISSIONS_OBJECT_STORE_NAME from '../emissions/unsynced-emissions-object-store-name';

const DB_NAME = '@generative.fm/stats';
const DB_VERSION = 1;

const onUpgradeNeeded = (event) => {
  const db = event.target.result;
  db.createObjectStore(UNSYNCED_EMISSIONS_OBJECT_STORE_NAME, {
    keyPath: 'emissionId',
  });
};

const openDb = makeOpenDb({
  dbName: DB_NAME,
  dbVersion: DB_VERSION,
  onUpgradeNeeded,
});

export default openDb;
