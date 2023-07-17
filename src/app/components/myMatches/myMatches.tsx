import React from 'react';

import MatchCard from './matchCard';

type Props = {};

export default function myMatches({}: Props) {
  let arr = [1, 2, 3, 1, 2, 2, 3, 5, 3, 6];

  return (
    <div className='w-screen flex flex-col items-center'>
      {arr.map((a,i) => 
        <MatchCard key={a+i} />
      )}
    </div>
  );
}
