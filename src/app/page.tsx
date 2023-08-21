'use client';

import { useEffect } from 'react';
import { useNetworkMismatch, useSwitchChain } from '@thirdweb-dev/react';
import { toast } from 'react-toastify';
import { Sepolia } from '@thirdweb-dev/chains';


import MyMatches from './components/myMatches/page';

// import Image from 'next/image';
// // import Cards from './components/Home/allMatches/matches';
// // import Card from './components/Home/allMatches/card';
// import MatchCard from './components/myMatches/matchCard';
// import Details from './components/details/details';
// // import Navbar from './components/navbar/Navbar';
// // import Hero from './components/Home/page';
// import Timerlib from './components/miscellaneous/timeCounter/timerlib';
// import MyMatches from './components/myMatches/page';
// import Profile from './components/profile/Profile';
import HomePage from './components/Home/page';

export default function Home() {
  const isMismatched = useNetworkMismatch();
  const switchChain = useSwitchChain();

  if (isMismatched) {
    toast.warn('"Network Mismatch", please switch to "Sepolia" testnet', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  }

  useEffect(() => {
   if(isMismatched){
switchChain(Sepolia.chainId);
   }
  }, [isMismatched])
  

  return (
    <div>
      {/* <Navbar /> */}
      {/* <Hero /> */}

      {/* <MatchCard /> */}
      {/* <Cards /> */}
      {/* <Card /> */}
      {/* <Details /> */}
      {/* <Profile/> */}
      {/* <MyMatches/> */}
      <HomePage />
    </div>
  );
}
