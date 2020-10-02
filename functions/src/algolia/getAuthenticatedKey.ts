
// For the default version
import algoliasearch from 'algoliasearch';
import {apiKey, applicationId} from "./keys"
export async function getAuthenticatedKey (): Promise<string> {
    // asynchrous calls below
    const client = algoliasearch(applicationId, apiKey);
    const index = client.initIndex('movies');
    const moviesJSON = require('./movies.json');

    await index.setSettings({
        attributesForFaceting: [
          'filterOnly(watch_list_of)'
        ]
      });

    await index.saveObjects(moviesJSON, {
       autoGenerateObjectIDIfNotExist: true
    })


// Only in Node.js

const currentUserID = 1;

const publicKey = client.generateSecuredApiKey(
  apiKey, // A search key that you keep private
  {
        filters: `watch_list_of:${currentUserID}`
  }
);

const currentUserID2 = 2;

const publicKey2 = client.generateSecuredApiKey(
  apiKey, // A search key that you keep private
  {
        filters: `watch_list_of:${currentUserID2}`
  }
);
console.log(publicKey);
console.log(publicKey2);
return publicKey;
}
