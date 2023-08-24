'use client';

import Image from 'next/image';
import { useState, useContext, useEffect } from 'react';
import {
  useContractRead,
  useAddress,
  useContractWrite,
} from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, doc, where, query } from 'firebase/firestore';
import { toast } from 'react-toastify';
import ReactCountryFlag from 'react-country-flag';

import { contestProps } from '../../../../Types/types';
import { db } from '../../../../../../firebase';
import { Store } from '@/app/context/store';
import {
  DotLoader,
  MainSpinner,
} from '../../../miscellaneous/loaders/spinners';
import winCalculator from '../../../winningsCalculator/winCalculator';
import { CountryCodes } from '@/app/components/miscellaneous/countryCodes';

type Props = {
  params: { slug: number };
  
};

export default function Match({ params}: Props) {
  const sportsPredictorContract = useContext(Store);
  const address = useAddress();
  const router = useRouter();
  let entryFee: number = 0.01;
  const [amount, setAmount] = useState<number>(entryFee);
  const [team, setTeam] = useState<string>('');
  const [amount1, setAmount1] = useState<number>(1);
  const [amount2, setAmount2] = useState<number>(1);

  const contestsRef = collection(db, 'moralis', 'events', 'Allcontests');

  const q = query(contestsRef, where('matchId', '==', params?.slug));

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [contests, loading, error] = useCollection(q);

  const matchDetails = contests?.docs[0]?.data();

  const { data: Fee, isLoading: loadingg } = useContractRead(
    sportsPredictorContract,
    'getEntranceFee'
  );

  if (!loadingg) {
    entryFee = +ethers.utils.formatEther(Fee);
  }

  const {
    data: playerStake,
    isLoading,
    error: playerStakError,
  } = useContractRead(
    sportsPredictorContract,
    'getPlayerStake',
    [params?.slug],
    { from: address }
  );

  let stake1: any = '--';
  let stake2: any = '--';
  let playerStake_teamA: any = '--';
  let playerStake_teamB: any = '--';
  let team1_Winings: number = 1;
  let team2_Winings: number = 1;

  if (playerStakError) {
    stake1 = '--';
    stake2 = '--';
    playerStake_teamA = '--';
    playerStake_teamB = '--';
    toast.error('failed to read contract', {
      position: 'top-right',
    });
  }

  if (isLoading) {
    stake1 = <DotLoader />;
    stake2 = <DotLoader />;
    playerStake_teamA = <DotLoader />;
    playerStake_teamB = <DotLoader />;
  } else {
    const teamA_stake: number = +ethers.utils.formatEther(playerStake[0]);
    const teamB_stake: number = +ethers.utils.formatEther(playerStake[1]);
    playerStake_teamA = +ethers.utils.formatEther(playerStake[2]);
    playerStake_teamB = +ethers.utils.formatEther(playerStake[3]);

    ({ team1_Winings, team2_Winings } = winCalculator(
      amount1,
      amount2,
      teamA_stake,
      teamB_stake,
      playerStake_teamA,
      playerStake_teamB
    ));

    stake1 = teamA_stake; // gives the predicted returns when we place 1eth/sample-amount on team1
    stake2 = teamB_stake; // gives the predicted returns when we place 1eth/sample-amount on team2
  }

  let contestResult = matchDetails?.contestResult || '--';

  if (matchDetails?.contestResult === 'won_by_teamA') {
    contestResult = `won by ${matchDetails?.teamA || 'teamA'}`;
  } else if (matchDetails?.contestResult === 'won_by_teamB') {
    contestResult = `won by ${matchDetails?.teamB || 'teamB'}`;
  }

  let HelperVar = true;

  if (matchDetails?.status !== 'Yet_to_Start') {
    HelperVar = false;
  }

  const { mutateAsync: enterContest, isLoading: loadinggg } = useContractWrite(
    sportsPredictorContract,
    'enterContest'
  );

  const enterContestHandler = async (team: string, value: number) => {
    const id = toast.loading('⏳ processing your entry...');
    try {
      const data = await enterContest({
        args: [params?.slug, team],
        overrides: {
          value: ethers.utils.parseEther(`${value}`), // send 0.1 native token with the contract call
        },
      });

      toast.update(id, {
        render: '🎉 Contest Entered',
        type: 'success',
        isLoading: false,
        autoClose: 5000,
      });
    } catch (err) {
      toast.update(id, {
        render: '😢 Failed to enter the contest',
        type: 'error',
        isLoading: false,
        autoClose: 4000,
      });
    }
  };

  useEffect(() => {
    if (!address) {
      router.back();
      toast.error('wallet disconnected, please connect to sepolia Network', {
        position: 'top-right',
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <div className="bg-yellow-50">
      <div className="w-screen mb-6 border-b-lime-200 pt-32 h-screen m-auto flex justify-center items-center ">
        <div className=" w-10/12  flex justify-between items-center  space-x-10 flex-wrap sm:flex-nowrap">
          <div className="product-img w-1/2 min-w-min h-[30rem] bg-green-100 flex">
            <div className="w-full font-bold justify-items-center grid grid-cols-8 grid-rows-5 gap-1 text-center  items-center">
              <div className="col-span-4 bg-green-400 w-full h-full">
                <ReactCountryFlag
                  countryCode={CountryCodes[matchDetails?.teamA]}
                  svg
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    // objectPosition: '100% 10%',
                  }}
                  title={CountryCodes[matchDetails?.teamA]}
                />
              </div>
              <div className="col-span-4 col-start-5 bg-green-500 w-full h-full">
                {/* <Image
            className="w-full h-full object-contain"
            src={data?.category?.image}
            alt={data?.category?.name}
          />  */}
                <ReactCountryFlag
                  countryCode={CountryCodes[matchDetails?.teamB]}
                  svg
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  title={CountryCodes[matchDetails?.teamB]}
                />
              </div>
              <div className="col-span-3 row-start-2">{stake1}</div>
              <div className="col-span-3 col-start-6 row-start-2">{stake2}</div>
              <div className="col-span-3 col-start-1 row-start-3">
                {playerStake_teamA}
              </div>
              <div className="col-span-3 col-start-6 row-start-3">
                {playerStake_teamB}
              </div>
              <div className="col-span-2 col-start-4 row-start-2 w-full  bg-green-200 font-bold text-green-800 py-1 rounded-lg">
                Total Amount (Eth)
              </div>
              <div className="col-span-2 col-start-4 row-start-3 w-full bg-green-200 font-bold text-green-800 py-1 rounded-lg">
                My Stake
              </div>
              <div className="col-span-3 row-start-4">
                {team1_Winings.toFixed(2)}
              </div>
              <div className="col-span-2 text-sm col-start-4 row-start-4 w-full bg-green-200 font-bold text-green-800 py-1 rounded-lg">
                predicted winnings
              </div>
              <div className="col-span-3 col-start-6 row-start-4">
                {team2_Winings.toFixed(2)}
              </div>
              <div className="col-span-3 row-start-5 py-2  w-20 max-w-[90%] ">
                {' '}
                <input
                  type="number"
                  className=" focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                  // name="custom-input-number"
                  min={0}
                  max={999}
                  onChange={(e) => {
                    const value = +parseFloat(e.target.value).toFixed(2);
                    setAmount1(value < 0 || Number.isNaN(value) ? 0 : value);
                  }}
                  value={amount1}
                  defaultValue={amount1}
                  placeholder="enter amount"
                ></input>
              </div>
              <div className="col-span-2 col-start-4 row-start-5 w-full bg-green-200 font-bold text-green-800 py-1 rounded-lg">
                Enter Amount
              </div>
              <div className="col-span-3 col-start-6 row-start-5 py-2  w-20 max-w-[90%]">
                {' '}
                <input
                  type="number"
                  className=" focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                  // name="custom-input-number"
                  min={0}
                  max={999}
                  onChange={(e) => {
                    const value = +parseFloat(e.target.value).toFixed(2);
                    setAmount2(value < 0 || Number.isNaN(value) ? 0 : value);
                  }}
                  value={amount2}
                  defaultValue={amount2}
                  placeholder="enter amount"
                ></input>
              </div>
            </div>
          </div>
          <div className="relative product-detail w-1/2 space-y-10 justify-self-center">
            <div
              className={`h-5 w-max px-2 ${
                HelperVar ? 'bg-green-500' : 'bg-red-800'
              }  rounded-full absolute top-3.5 right-6 hover:opacity-80 cursor-pointer `}
            >
              <p className="text-xs pt-0.5 tracking-wider text-blue-100 font-semibold text-center align-text-bottom">
                {HelperVar ? 'Live' : 'Closed'}
              </p>
            </div>
            <h1 className="text-3xl tracking-wider font-serif font-bold bg-gradient-to-r from-teal-600 to-green-800 bg-clip-text text-transparent">
              {matchDetails?.teamA || '--'}{' '}
              <span className="text-lg font-mono text-gray-700">vs</span>{' '}
              {matchDetails?.teamB || '--'}
            </h1>
            <p className="font-semibold font-mono">
              Status :{' '}
              <span className="text-red-950 text-lg  font-bold">
                {' '}
                {matchDetails?.status}.
              </span>
            </p>
            <p className="font-semibold font-mono">
              Result :{' '}
              <span className="text-red-950 text-lg  font-bold">
                {contestResult}.
              </span>
            </p>
            <div className="font-semibold font-mono ">
              EntryFee :{' '}
              <span className="text-red-950 text-lg  font-bold">
                {entryFee} Eth.
              </span>
            </div>

            <div className=" w-72 flex flex-col flex-nowrap m-auto">
              <div className="w-full h-10 mb-4">
                <label htmlFor="Selecting a Team" className="sr-only">
                  Pick a Team
                </label>
                <select
                  disabled={!HelperVar}
                  id="selectTeam"
                  name="selectTeam"
                  onChange={(e) => setTeam(e.target.value)}
                  className={`${
                    !HelperVar ? 'cursor-not-allowed' : ''
                  } h-full w-full rounded-md border-0 bg-slate-200 py-0 pl-2 pr-7 text-gray-900 font-bold focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm`}
                >
                  <option
                    disabled={team !== ''}
                    // value=""
                    className="text-black text-center"
                  >
                    Pick a Team
                  </option>
                  <option value="teamA" className="text-black text-center">
                    {matchDetails?.teamA || 'teamA'}
                  </option>
                  <option value="teamB" className="text-black text-center">
                    {matchDetails?.teamB || 'teamB'}
                  </option>
                </select>
              </div>
              <div className="custom-number-input h-10 w-full mb-5 ">
                <div className="flex flex-row flex-nowrap h-10 w-full rounded-lg relative bg-transparent mt-1">
                  <button
                    onClick={() =>
                      setAmount((prev) =>
                        +(prev - 0.02).toFixed(2) > entryFee
                          ? +(prev - 0.02).toFixed(2)
                          : entryFee
                      )
                    }
                    disabled={amount <= 0.01}
                    data-action="decrement"
                    className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                  >
                    <span className="m-auto text-2xl font-thin">−</span>
                  </button>
                  <input
                    type="number"
                    className=" focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                    name="custom-input-number"
                    min={0.01}
                    onChange={(e) =>
                      setAmount(
                        +parseFloat(e.target.value).toFixed(2) > entryFee
                          ? +parseFloat(e.target.value).toFixed(2)
                          : entryFee
                      )
                    }
                    value={amount}
                    defaultValue={amount}
                    disabled={!HelperVar}
                  ></input>
                  <button
                    onClick={() =>
                      setAmount((prev) => +(prev + 0.02).toFixed(2))
                    }
                    data-action="increment"
                    disabled={!HelperVar}
                    className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                  >
                    <span className="m-auto text-2xl font-thin">+</span>
                  </button>
                  <div className="w-2/5">
                    <label htmlFor="currency" className="sr-only">
                      Currency
                    </label>
                    <select
                      id="currency"
                      name="currency"
                      className="h-full rounded-md border-0 bg-slate-200 py-0 pl-2 pr-7 text-gray-900 font-bold focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    >
                      <option className="text-black text-center">Eth</option>
                      <option disabled>Bitcoin</option>
                      <option disabled>USD</option>
                      <option disabled>INR</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="w-full ">
                <button
                  onClick={() => enterContestHandler(team, amount)}
                  disabled={!team || !HelperVar || loadinggg}
                  className={` text-white ${
                    HelperVar
                      ? 'bg-green-500'
                      : 'bg-red-800 cursor-not-allowed tracking-wider'
                  } ${
                    !team || loadinggg ? 'cursor-not-allowed' : ''
                  } font-bold hover:opacity-80  w-full px-7 py-2`}
                >
                  {loadinggg ? (
                    <div className="flex items-center justify-center opacity-70">
                      <div className="h-3 w-3 border-t-transparent border-solid animate-spin rounded-full border-white border-2"></div>
                      <div className="ml-2"> Processing... </div>
                    </div>
                  ) : HelperVar ? (
                    'Join Now'
                  ) : (
                    'Closed'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-12 w-full flex justify-center">
        <div className="max-w-[80%]">
          <h2 className="mb-2 text-lg font-bold text-gray-800">Info</h2>
          <ul className=" max-w-md space-y-1 text-gray-500 list-disc list-inside ">
            <li>
              <span className="font-bold text-gray-700">Team Amount : </span>{' '}
              The total amount/bet placed by all the players of each team.
            </li>
            <li>
              <span className="font-bold text-gray-700">My Stake : </span> At
              which shows how much I bet on each team.
            </li>
            <li>
              <span className="font-bold text-gray-700">
                Predicted Winnings:{' '}
              </span>{' '}
              With this tool, you can get the predicted winnings based on the
              inputs you give below. The default value for inputs is 1 Ethereum
            </li>
            <li>
              <span className="font-bold text-gray-700">Team Amount : </span>{' '}
              The predicted winnings will be displayed based on the amount
              entered. tap to change the defalult(1 eth) amount.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
