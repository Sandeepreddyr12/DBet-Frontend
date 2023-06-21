import Image from 'next/image';
import Cards from './components/cards/cards';
import Card from './components/cards/card';
import MycontestCard from './components/myContests/mycontestCard';
import Details from './components/details/details';

export default function Home() {
  return (
    <div>
      {/* <MycontestCard/> */}
      {/* <Cards /> */}
      {/* <Card /> */}
      <Details/>
    </div>
  );
}
