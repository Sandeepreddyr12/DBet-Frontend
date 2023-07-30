'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import { useContractRead, useAddress } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

import { contestProps } from '../../Types/types';
import Timer from '../miscellaneous/timeCounter/timerlib';
import { DotLoader } from '../miscellaneous/loaders/spinners';
import { Store } from '@/app/globalStore/store';

interface contestCardProps {
  data: contestProps;
}

export default function Card({ data }: contestCardProps) {
  const sportsPredictorContract = useContext(Store);
  const address = useAddress();
  const router = useRouter();

  const { teamA, teamB, status, result, matchId } = data;

  const {
    data: TeamStake,
    isLoading,
    error,
  } = useContractRead(sportsPredictorContract, 'getTeamStake', [matchId]);

  let stake1: any = '--';
  let stake2: any = '--';

  if (error) {
    stake1 = '--';
    stake2 = '--';
    console.error('failed to read contract', error);
  }

  if (isLoading) {
    stake1 = <DotLoader />;
    stake2 = <DotLoader />;
  } else {
    const teamA_stake: number = +ethers.utils.formatEther(TeamStake[0]);
    const teamB_stake: number = +ethers.utils.formatEther(TeamStake[1]);

    const sampleAmount = 1; // 1 ether/buck

    //below formula gives the predicted winnings/returns for every buck/sample-amount you placed on each team.
    const team1 =
      (sampleAmount * teamB_stake) / (teamA_stake + sampleAmount) +
      sampleAmount;

    const team2 =
      (sampleAmount * teamA_stake) / (teamB_stake + sampleAmount) +
      sampleAmount;

    stake1 = team1; // gives the predicted returns when we place 1eth/sample-amount on team1
    stake2 = team2; // gives the predicted returns when we place 1eth/sample-amount on team2
  }

  const routeHandler = () => {
    console.log(address);
    if (address) {
      router.push(`/components/allMatches/${matchId}`);
    }
  };

  return (
    <div
      onClick={routeHandler}
      className="w-[22rem] relative mx-3 my-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 shadow-lg"
    >
      <div className="h-5 w-max px-3 bg-green-500 rounded-full absolute top-1.5 right-3 hover:opacity-80 cursor-pointer ">
        <div className="relative">
          <p className="text-xs pt-0.5 text-blue-100 font-semibold text-center align-text-bottom">
            Live
          </p>
        </div>
      </div>
      <div className="w-full  bg-white rounded-lg p-4 dark:bg-gray-800">
        <div className="text-cyan-200 text-center "> icc odi worldcup</div>
        <dl className="grid grid-cols-2 gap-4 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
          <div className=" py-2 px-4 flex flex-col items-center justify-center">
            <div>
              <Image
                width="30"
                height="30"
                src="https://img.icons8.com/color/96/india.png"
                alt="india"
              />
            </div>
            <dd className="text-gray-500 text-xs dark:text-gray-400">
              {teamA}
            </dd>
          </div>
          <div className=" py-2 px-4 flex flex-col items-center justify-center">
            <dt className="mb-2  text-xs">Today</dt>
            <dd className="text-gray-500  text-sm font-bold dark:text-gray-400">
              <Timer />
            </dd>
          </div>
          <div className=" py-2 px-4 flex flex-col items-center justify-center">
            <dt className="mb-2 text-sm font-bold">flag</dt>
            <dd className="text-gray-500 text-xs dark:text-gray-400">
              {teamB}
            </dd>
          </div>
          <div className="bg-gray-600 py-2 px-4 shadow-lg rounded-lg flex flex-col items-center justify-center">
            <dt className="mb-2 text-sm font-bold">{stake1}</dt>
            <dd className="text-gray-500 text-xs dark:text-gray-400">1</dd>
          </div>
          <div className="bg-gray-600 py-2 px-4 shadow-lg rounded-lg flex flex-col items-center justify-center">
            <dt className="mb-2 text-sm font-bold">90+</dt>
            <dd className="text-gray-500 text-xs dark:text-gray-400">X</dd>
          </div>
          <div className="bg-gray-600 py-2 px-4 shadow-lg rounded-lg flex flex-col items-center justify-center">
            <dt className="mb-2 text-sm font-bold">{stake2}</dt>
            <dd className="text-gray-500 text-xs dark:text-gray-400">2</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
