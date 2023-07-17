import Image from 'next/image';

import { contestProps } from '../../Types/types';
import Timer from '../timeCounter/timerlib';

interface contestCardProps {
  data: contestProps;
}

export default function Card({ data }: contestCardProps) {
  // console.log(data);

  const { teamA, teamB, status, result, matchId } = data;

  return (
    <div className="w-[22rem] relative mx-3 my-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
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
            <dt className="mb-2 text-sm font-bold">1.5</dt>
            <dd className="text-gray-500 text-xs dark:text-gray-400">1</dd>
          </div>
          <div className="bg-gray-600 py-2 px-4 shadow-lg rounded-lg flex flex-col items-center justify-center">
            <dt className="mb-2 text-sm font-bold">90+</dt>
            <dd className="text-gray-500 text-xs dark:text-gray-400">X</dd>
          </div>
          <div className="bg-gray-600 py-2 px-4 shadow-lg rounded-lg flex flex-col items-center justify-center">
            <dt className="mb-2 text-sm font-bold">1.2</dt>
            <dd className="text-gray-500 text-xs dark:text-gray-400">2</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
