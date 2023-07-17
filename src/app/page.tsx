import Image from 'next/image';
import Cards from './components/cards/cards';
import Card from './components/cards/card';
import MatchCard from './components/myMatches/matchCard';
import Details from './components/details/details';
import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/page';
import Timerlib from './components/timeCounter/timerlib';
import MyMatches from './components/myMatches/myMatches';
import Profile from './components/profile/Profile';

export default function Home() {
  return (
    <div>
      {/* <Navbar /> */}
      {/* <Hero/> */}

      {/* <MatchCard /> */}
      {/* <Cards /  >  */}
      {/* <Card /> */}
      {/* <Details/> */}
      <Profile/>
      <MyMatches/>
    </div>
  );
}
