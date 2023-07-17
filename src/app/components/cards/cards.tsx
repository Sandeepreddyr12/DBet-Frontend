'use client';

import { JsxElement } from 'typescript';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, doc } from 'firebase/firestore';
import Countdown from 'react-countdown';

import Card from './card';
import { db } from '../../../../firebase';
export default function cards() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [contests, loading, error] = useCollection(
    collection(db, 'moralis', 'events', 'Contests')
  );

  // console.log(contests?.docs);

  return (
    <div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {contests && (
        <div className="w-full justify-center flex flex-wrap items-center">
          {contests.docs.map((doc) => {
            //  console.log(doc.data());

            let docData = doc.data();

            let contest = {
              teamA: docData.teamA,
              teamB: docData.teamB,
              status: docData.status,
              result: docData.contestResult,
              matchId: docData.matchId,
            };

            return <Card key={doc.id} data={contest} />;
          })}
        </div>
      )}
    </div>
  );
}
