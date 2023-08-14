import React from 'react'
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, doc, where, query } from 'firebase/firestore';
import ReactCountryFlag from 'react-country-flag';
import { CountryCodes } from '../miscellaneous/loaders/countryCodes';


import { db } from '../../../../firebase'; 

type Props = {
  matchId : string,
  teamAstake:string,
  teamBstake:string,
}



export default function matchCard({matchId, teamAstake='0', teamBstake='1'}: Props) {
// eslint-disable-next-line react-hooks/rules-of-hooks
const router = useRouter();


 // eslint-disable-next-line react-hooks/rules-of-hooks
 const contestsRef = collection(db, 'moralis', 'events', 'Allcontests');

 const q = query(contestsRef, where('matchId', '==', matchId));

 // eslint-disable-next-line react-hooks/rules-of-hooks
 const [contests, loading, error] = useCollection(q);

 const matchDetails = contests?.docs[0]?.data();

 let HelperVar = true;

 if (matchDetails?.status !== 'Yet_to_Start') {
   HelperVar = false;
 }



  const routeHandler = () => {
    
      router.push(`/components/Home/allMatches/${matchId}`);
    
  };

  return (
    <div
      onClick={routeHandler}
      className="relative w-full max-w-3xl p-2 min-w-max mx-5 my-6 bg-white border rounded-lg   dark:bg-gray-800 dark:border-gray-700 cursor-pointer shadow-lg hover:scale-110 transition delay-100 duration-150 ease-in-out"
    >
      <div className="text-cyan-200 text-lg font-extrabold font-mono text-center mb-5 ">
        {' '}
        ICC ODI Worldcup
      </div>
      <div
        className={`h-5 w-max px-3 ${
          HelperVar ? 'bg-green-500' : 'bg-red-800'
        } rounded-full absolute top-1.5 right-3 hover:opacity-80 cursor-pointer `}
      >
        <div className="relative">
          <p className="text-xs pt-0.5 text-blue-100 font-semibold text-center align-text-bottom">
            {HelperVar ? 'Live' : 'Closed'}
          </p>
        </div>
      </div>
      <dl className="max-w-screen-xl mx-auto flex flex-row items-center justify-between text-gray-900 dark:text-white">
        <div className="flex items-center justify-center w-40 h-20 bg-slate-500 rounded-full">
          <div className=" py-3 px-4">
            <div>
              <ReactCountryFlag
                countryCode={CountryCodes[matchDetails?.teamA]}
                svg
                style={{
                  width: '2em',
                  height: '2em',
                }}
                title={CountryCodes[matchDetails?.teamA]}
              />
            </div>
            <dd className="text-gray-500 text-xs dark:text-gray-400">
              {matchDetails?.teamA}
            </dd>
          </div>
          <div className=" py-3 px-2">
            <dt className="mb-2 text-sm font-bold">
              {ethers.utils.formatEther(teamAstake)}
            </dt>
            <dd className="text-gray-500 text-xs dark:text-gray-400">1</dd>
          </div>
        </div>

        <div className=" py-3 px-6 flex flex-col items-center justify-center">
          <dt className="mb-2 text-sm font-bold">45+</dt>
          <dd className="text-gray-500 text-xs dark:text-gray-400">X</dd>
        </div>

        <div className=" py-3 px-6 flex flex-col items-center justify-center">
          <dt className="mb-2 text-gray-500  text-xs">{matchDetails?.status}</dt>
          <dd className="text-gray-500  text-sm font-bold dark:text-gray-400">
           { matchDetails?.contestResult || '--'}
          </dd>
        </div>
        <div className="flex items-center justify-center w-40 h-20 bg-slate-500 rounded-full">
          <div className="py-3 px-4">
            <dt className="mb-2 text-sm font-bold">
              {ethers.utils.formatEther(`${teamBstake}`)}
            </dt>
            <dd className="text-gray-500 text-xs dark:text-gray-400">2</dd>
          </div>
          <div className=" py-3 px-4">
            <div>
              <ReactCountryFlag
                countryCode={CountryCodes[matchDetails?.teamB]}
                svg
                style={{
                  width: '2em',
                  height: '2em',
                }}
                title={CountryCodes[matchDetails?.teamB]}
              />
            </div>
            <dd className="text-gray-500 text-xs dark:text-gray-400">
              {matchDetails?.teamB}
            </dd>
          </div>
        </div>
      </dl>
    </div>
  );
}