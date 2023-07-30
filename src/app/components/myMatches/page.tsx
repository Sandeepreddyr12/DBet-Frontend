import React from 'react';

import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, doc, where, query } from 'firebase/firestore';

 import { db } from '../../../../firebase';

import MatchCard from './matchCard';

type Props = {};

export default function myMatches({}: Props) {

//  const contestsRef = collection(db, 'moralis', 'events', 'Contests');

//  const q = query(contestsRef, where('teamA', '==', 'SouthAfrica'));

//  // eslint-disable-next-line react-hooks/rules-of-hooks
//  const [contests, loading, error] = useCollection(q);

  
  let arr = [1, 2, 3, 1, 2, 2, 3, 5, 3, 6];

  return (
    <div className='w-screen flex flex-col bg-purple-100 items-center'>
      {arr.map((a,i) => 
        <MatchCard key={a+i} />
      )}
    </div>
  );
}
