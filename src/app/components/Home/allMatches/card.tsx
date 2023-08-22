'use client';

import { useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContractRead, useAddress } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import ReactCountryFlag from 'react-country-flag';

import { contestProps } from '../../../Types/types';
import Timer from '../../miscellaneous/timeCounter/timerlib';
import { DotLoader } from '../../miscellaneous/loaders/spinners';
import { Store } from '@/app/context/store';
import winCalculator from '../../winningsCalculator/winCalculator';
import { CountryCodes } from '../../miscellaneous/countryCodes';

interface contestCardProps {
  data: contestProps;
}

export default function Card({ data }: contestCardProps) {
  const sportsPredictorContract = useContext(Store);
  const address = useAddress();
  const router = useRouter();

  const { teamA, teamB, status, result, matchId,timeStamp } = data;

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
    toast.error('failed to read contract', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  }

  if (isLoading) {
    stake1 = <DotLoader />;
    stake2 = <DotLoader />;
  } else {
    const teamA_stake: number = +ethers.utils.formatEther(TeamStake[0]);
    const teamB_stake: number = +ethers.utils.formatEther(TeamStake[1]);

    const sampleAmount = 1; // 1 ether/buck

    //below formula gives the predicted winnings/returns for every buck/sample-amount you placed on each team.
    const { team1_Winings, team2_Winings } = winCalculator(
      sampleAmount,
      sampleAmount,
      teamA_stake,
      teamB_stake
    );

    stake1 = team1_Winings.toFixed(2); // gives the predicted returns when we place 1eth/sample-amount on team1
    stake2 = team2_Winings.toFixed(2); // gives the predicted returns when we place 1eth/sample-amount on team2
  }

  let HelperVar = true;

  if (status !== 'Yet_to_Start') {
    HelperVar = false;
  }

  const routeHandler = () => {
    if (address) {
      router.push(`/components/Home/allMatches/${matchId}`);
    } else {
      toast.info('Connect the wallet to the Sepolia network', {
        position: 'top-right',
      });
    }
  };

  return (
    <div
      onClick={routeHandler}
      className="w-[22rem] relative mx-3 my-4  border  rounded-lg border-gray-700 shadow-lg hover:scale-110 cursor-pointer transition delay-100 duration-200 ease-in-out"
    >
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
      <div className="w-full   rounded-lg p-4 bg-gray-800">
        <div className="text-cyan-200 text-center mb-4 uppercase font-mono">
          {' '}
          icc odi worldcup
        </div>
        <dl className="grid grid-cols-2 gap-4 mx-auto  sm:grid-cols-3 text-white">
          <div className=" py-2 px-4 flex flex-col items-center justify-center">
            <div>
              <ReactCountryFlag
                countryCode={CountryCodes[teamA]}
                svg
                style={{
                  width: '2em',
                  height: '2em',
                }}
                title={CountryCodes[teamA]}
              />
            </div>
            <dd className=" text-xs text-gray-400">
              {teamA}
            </dd>
          </div>
          <div className=" py-2 px-4 flex flex-col items-center justify-center">
            <dt className="mb-2  text-xs">Ends in</dt>
            <dd className=" text-sm font-bold text-gray-400">
              {HelperVar ? (
                <Timer timeStamp = {timeStamp} />
              ) : (
                <span className="text-red-400">{result}</span>
              )}
            </dd>
          </div>
          <div className=" py-2 px-4 flex flex-col items-center justify-center">
            <div>
              <ReactCountryFlag
                countryCode={CountryCodes[teamB]}
                svg
                style={{
                  width: '2em',
                  height: '2em',
                }}
                title={CountryCodes[teamB]}
              />
            </div>
            <dd className=" text-xs text-gray-400">
              {teamB}
            </dd>
          </div>
          <div className="bg-gray-600 py-2 px-4 shadow-lg rounded-lg flex flex-col items-center justify-center">
            <dt className="mb-2 text-sm font-bold">{stake1}</dt>
        <dd className=" text-xs text-gray-400">A</dd>
          </div>
          <div className="bg-gray-600 py-2 px-4 shadow-lg rounded-lg flex flex-col items-center justify-center">
            <dt className="mb-2 text-sm font-bold">90+</dt>
        <dd className=" text-xs text-gray-400">X</dd>
          </div>
          <div className="bg-gray-600 py-2 px-4 shadow-lg rounded-lg flex flex-col items-center justify-center">
            <dt className="mb-2 text-sm font-bold">{stake2}</dt>
        <dd className=" text-xs text-gray-400">B</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
