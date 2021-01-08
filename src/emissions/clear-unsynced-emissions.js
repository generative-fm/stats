import { promisifyRequest } from '@alexbainter/indexed-db';
import UNSYNCED_EMISSIONS_OBJECT_STORE_NAME from './unsynced-emissions-object-store-name';
import openDb from '../storage/open-db';

const clearUnsyncedEmissions = () =>
  openDb().then((db) =>
    promisifyRequest(
      db
        .transaction(UNSYNCED_EMISSIONS_OBJECT_STORE_NAME, 'readwrite')
        .objectStore(UNSYNCED_EMISSIONS_OBJECT_STORE_NAME)
        .clear()
    )
      .then(() => true)
      .catch((err) => {
        console.error(err);
        return false;
      })
  );

export default clearUnsyncedEmissions;
