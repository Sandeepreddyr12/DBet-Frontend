import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
// Configure dotenv before other imports
import { Redis } from '@upstash/redis';

import { getEmbeddingsCollection, getVectorStore } from '../src/lib/astradb';


import data from './DBdata.json';
import data1 from './DBwebData.json';

const fs = require('fs');

 async function generateEmbeddings() {
  await Redis.fromEnv().flushdb();

  const vectorStore = await getVectorStore();

  (await getEmbeddingsCollection()).deleteAll();

  

  let allDocs: any = [];

   for  (const { teamA, teamB, matchId, status} of data) {

  let matchStatus = 'match status unknown';

    if (status === "Yet_to_Start"){
      matchStatus = 'Yet_to_Start or bet ongoing or match about to start and available to bet';
    }else if (status === 'in_Progress') {
      matchStatus = 'in_Progress or closed for bet or this match not-available for bet';
    }else if (status === 'Finished') {
      matchStatus = 'Finished or this match not-available for bet';
    }
      allDocs.push({
        pageContent: `cricket match between ${teamA} and ${teamB}`,
        Content: { teamA, teamB },
        metadata: {
          matchId,
          matchStatus,
        },
      });
  }

  

   for  (const i in data1) {

   allDocs.push({
        pageContent: JSON.stringify((data1 as any)[i]),
       
        metadata: {
         title : i
        },
      });
  }

  fs.writeFile(
    `${__dirname}/DBdata1.json`,
    JSON.stringify(allDocs, null, 2),
    (err: any) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Data written to file successfully');
    }
  );

  // Load the docs into the vector store

  await vectorStore.addDocuments(allDocs);
}

generateEmbeddings();
