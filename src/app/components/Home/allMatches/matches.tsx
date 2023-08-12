'use client';

import { useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, doc, where, query } from 'firebase/firestore';
import { toast } from 'react-toastify';

import Card from './card';
import CardSkelton from '../../miscellaneous/skeletons/cardSkeleton';
import { db } from '../../../../../firebase';

export default function Matches() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [contests, loading, error] = useCollection(
    collection(db, 'moralis', 'events', 'Allcontests')
  );

  if (error) {
    toast.error('error occured, while fetching matches ', {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  }

  return (
    <div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading ? (
        <div className="w-full flex justify-center  flex-wrap items-center">
          {' '}
          {[...Array(12)].map((a) => (
            // eslint-disable-next-line react/jsx-key
            <CardSkelton />
          ))}
        </div>
      ) : null}
      {contests ? (
        <div className="w-full justify-center flex flex-wrap items-center">
          {contests.docs.map((doc) => {
            //  console.log(doc.data());

            let docData = doc.data();

            const contest = {
              teamA: docData.teamA,
              teamB: docData.teamB,
              status: docData.status,
              result: docData.contestResult,
              matchId: docData.matchId,
            };

            return <Card key={doc.id} data={contest} />;
          })}
        </div>
      ) : null}
    </div>
  );
}
