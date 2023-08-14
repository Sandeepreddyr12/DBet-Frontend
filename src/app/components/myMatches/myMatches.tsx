'use client';
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from 'react';

import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, doc, where, query } from 'firebase/firestore';
import { useContractRead, useAddress, ConnectWallet } from '@thirdweb-dev/react';
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

  if (!address){
return (
  <div className="w-screen h-[70vh] bg-green-200 shadow-lg flex flex-col items-center justify-center">
    <div
      className="pb-6 text-xxl font-bold text-white py-4 px-8 text-center 
             border-b-2 md:border-b-0  hover:bg-transparent"
    >
      <ConnectWallet className=" !bg-green-600" />
    </div>
    <div className="capitalize font-bold mb-6 text-lg text-gray-700 lg:text-xl sm:px-16 xl:px-48 ">
      please connect the wallet, to fetch your-matches
    </div>
  </div>
);
  } 

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
        <div className="bg-purple-100 mb-20 ">
          <h2 className="text-4xl  text-end mb-8 pr-12 pt-10  font-bold font-serif text-blue-600">
            My Matches
          </h2>

          <div className="w-screen flex flex-col items-center">
            {contests.docs.map((doc) => {
              const data = doc?.data();
              return (
                <MatchCard
                  matchId={data?.matchId}
                  teamAstake={data?.teamA}
                  teamBstake={data?.teamB}
                  key={doc.id}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
