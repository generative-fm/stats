import { promisifyRequest } from '@alexbainter/indexed-db';
import UNSYNCED_EMISSIONS_OBJECT_STORE_NAME from './unsynced-emissions-object-store-name';
import openDb from './open-db';

const loadUnsyncedEmissions = () =>
  openDb().then((db) =>
    promisifyRequest(
      db
        .transaction(UNSYNCED_EMISSIONS_OBJECT_STORE_NAME)
        .objectStore(UNSYNCED_EMISSIONS_OBJECT_STORE_NAME)
        .getAll()
    ).catch((error) => {
      console.error('Unable to load emissions', error);
      return [];
    })
  );

export default loadUnsyncedEmissions;
