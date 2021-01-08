import { promisifyRequest } from '@alexbainter/indexed-db';
import UNSYNCED_EMISSIONS_OBJECT_STORE_NAME from './unsynced-emissions-object-store-name';
import openDb from '../storage/open-db';

const storeUnsyncedEmission = (emission) =>
  openDb().then((db) =>
    promisifyRequest(
      db
        .transaction(UNSYNCED_EMISSIONS_OBJECT_STORE_NAME, 'readwrite')
        .objectStore(UNSYNCED_EMISSIONS_OBJECT_STORE_NAME)
        .put(emission)
    )
      .then(() => true)
      .catch((error) => {
        console.error('Unable to store emission', error);
        return false;
      })
  );

export default storeUnsyncedEmission;
