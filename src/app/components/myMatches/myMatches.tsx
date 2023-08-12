'use client';
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from 'react';

import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, doc, where, query } from 'firebase/firestore';
import { useContractRead, useAddress } from '@thirdweb-dev/react';
import { toast } from 'react-toastify';

import { db } from '../../../../firebase';

import MatchCard from './matchCard';
import { Store } from '@/app/context/store';
import { useRouter } from 'next/navigation';
import { MainSpinner } from '../miscellaneous/loaders/spinners';

type Props = {};

export default function myMatches({}: Props) {
  const sportsPredictorContract = useContext(Store);
  const address = useAddress();
  const router = useRouter();

  // console.log(address);

  // if (!address) return <div>No wallet connected</div>;

  const contestsRef = collection(db, 'moralis', 'events', 'Entercontests');

  const q = query(
    contestsRef,
    where('player', '==', (address || '').toLowerCase())
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [contests, loading, error] = useCollection(q);

  // console.log(contests);

  if (error) {
    toast.error('error occured, while fetching matches ', {
      position: 'bottom-center',
    });
  }

  return (
    <div>
      {loading ? (
        <div className="w-screen h-[60vh] flex items-center justify-center">
          <MainSpinner />{' '}
        </div>
      ) : null}

      {contests ? (
        <div className="w-screen flex flex-col bg-purple-100 items-center">
          {contests.docs.map((doc) => {
            return <MatchCard matchId={doc?.data()?.matchId} key={doc.id} />;
          })}
        </div>
      ) : null}
    </div>
  );
}
