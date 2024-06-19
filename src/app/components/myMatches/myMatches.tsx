'use client';
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from 'react';

import { useCollection } from 'react-firebase-hooks/firestore';
import { ethers } from 'ethers';

import { collection, doc, where, query } from 'firebase/firestore';
import {
  useAddress,
  ConnectWallet,
} from '@thirdweb-dev/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { db } from '../../../../firebase';

import MatchCard from './matchCard';
import { MainSpinner } from '../miscellaneous/loaders/spinners';
import Balance from './fetchBalance/Balance';

type Props = {};

export default function myMatches({}: Props) {
  const address = useAddress();
  const router = useRouter();


  if (!address) {
    return (
      <div className="w-screen h-[70vh] bg-green-200 shadow-lg flex flex-col items-center justify-center">
        <div
          className="pb-6 text-xxl font-bold text-white py-4 px-8 text-center 
             border-b-2 md:border-b-0  hover:bg-transparent"
        >
          <ConnectWallet className=" !bg-green-600" />
        </div>
        <div className="capitalize font-mono font-bold mb-6 text-lg text-gray-700 lg:text-xl sm:px-16 xl:px-48 ">
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

      {!contests?.empty && contests ? (
        <div className="bg-purple-100 mb-20 ">
          <Balance />
          <div className="bg-green-100">
            <h1 className="text-4xl my-8  text-center pt-10  font-bold font-serif  italic">
              <span className="underline underline-offset-3 decoration-8 decoration-blue-400 ">
                My Matches
              </span>
            </h1>
            <div className="text-center font-mono text-gray-500 select-none font-semibold mt-4">
              The matches are displayed after blocks have been confirmed, so it
              isn't real-time.
            </div>
            <div className="w-screen flex flex-col items-center">
              {contests?.docs.map((doc) => {
                const data = doc?.data();
                return (
                  <MatchCard
                    matchId={data?.matchId}
                    teamAstake={ethers.utils.formatEther(`${data?.teamA || 0}`)}
                    teamBstake={ethers.utils.formatEther(`${data?.teamB || 0}`)}
                    key={doc.id}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className=" w-screen h-[70vh] text-red-500 bg-green-200 text-2xl capitalize font-mono font-extrabold flex flex-col items-center justify-center">
          No contests availble/entered
          <div className="text-xl text-gray-500">Take part and win rewards</div>
        </div>
      )}
    </div>
  );
}
