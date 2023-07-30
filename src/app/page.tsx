'use client';

import Image from 'next/image';
import Cards from './components/allMatches/page';
import Card from './components/allMatches/card';
import MatchCard from './components/myMatches/matchCard';
import Details from './components/details/details';
import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/page';
import Timerlib from './components/miscellaneous/timeCounter/timerlib';
import MyMatches from './components/myMatches/page';
import Profile from './components/profile/Profile';


export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero/>

      {/* <MatchCard /> */}
      <Cards />
      {/* <Card /> */}
      {/* <Details /> */}
      {/* <Profile/> */}
      {/* <MyMatches/> */}
    </div>
  );
}
