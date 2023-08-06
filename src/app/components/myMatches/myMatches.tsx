/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from 'react';

import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, doc, where, query } from 'firebase/firestore';
import { useContractRead, useAddress } from '@thirdweb-dev/react';

 import { db } from '../../../../firebase';

import MatchCard from './matchCard';
import { Store } from '@/app/context/store';
import { useRouter } from 'next/navigation';

type Props = {};

export default function myMatches({}: Props) {
  const sportsPredictorContract = useContext(Store);
  const address = useAddress();
  const router = useRouter();

  //  const contestsRef = collection(db, 'moralis', 'events', 'Allcontests');

  //  const q = query(contestsRef, where('teamA', '==', 'SouthAfrica'));

  //  // eslint-disable-next-line react-hooks/rules-of-hooks
  //  const [contests, loading, error] = useCollection(q);

  let arr = [1, 2, 3, 1, 2, 2, 3, 5, 3, 6];

  // const routeHandler = () => {
  //   console.log(address);
  //   if (address) {
  //     router.push(`/components/Home/allMatches/${matchId}`);
  //   }
  // };

  return (
    <div className="w-screen flex flex-col bg-purple-100 items-center">
      {arr.map((a, i) => (
        <MatchCard key={a + i} />
      ))}
    </div>
  );
}
