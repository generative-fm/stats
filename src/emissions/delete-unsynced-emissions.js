import { promisifyRequest } from '@alexbainter/indexed-db';
import UNSYNCED_EMISSIONS_OBJECT_STORE_NAME from './unsynced-emissions-object-store-name';
import openDb from '../storage/open-db';

const deleteUnsyncedEmissions = (emissions) =>
  openDb()
    .then((db) => {
      const objectStore = db
        .transaction(UNSYNCED_EMISSIONS_OBJECT_STORE_NAME, 'readwrite')
        .objectStore(UNSYNCED_EMISSIONS_OBJECT_STORE_NAME);
      return Promise.all(
        emissions.map((emission) =>
          promisifyRequest(objectStore.delete(emission.emissionId))
            .then(() => true)
            .catch((error) => {
              console.error('Unable to delete emission', error);
              return false;
            })
        )
      );
    })
    .catch((err) => {
      console.error('Unable to delete unsynced emissions', err);
    });

export default deleteUnsyncedEmissions;
