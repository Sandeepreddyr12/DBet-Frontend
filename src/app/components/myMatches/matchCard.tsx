import Image from 'next/image';
import React from 'react'

type Props = {}

export default function matchCard({}: Props) {
  return (
    <div className="relative w-full max-w-3xl p-2 min-w-max mx-5 my-6 bg-white border rounded-lg   dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
      {/* <div className="w-full p-4 dark:bg-gray-800"> */}
      {/* <div className="text-cyan-200 text-center "> icc odi worldcup</div> */}
      <div className="h-5 w-max px-3 bg-green-500 rounded-full absolute top-1.5 right-3 hover:opacity-80 cursor-pointer ">
        <div className="relative">
          <p className="text-xs pt-0.5 text-blue-100 font-semibold text-center align-text-bottom">
            Live
          </p>
        </div>
      </div>
      <dl className="max-w-screen-xl mx-auto flex flex-row items-center justify-between text-gray-900 dark:text-white">
        <div className="flex items-center justify-center w-40 h-20 bg-slate-500 rounded-full">
          <div className=" py-3 px-4">
            <div>
              <Image
                width="48"
                height="48"
                src="https://img.icons8.com/color/96/india.png"
                alt="india"
              />
            </div>
            <dd className="text-gray-500 text-xs dark:text-gray-400">
              country
            </dd>
          </div>
          <div className=" py-3 px-2">
            <dt className="mb-2 text-sm font-bold">1.5</dt>
            <dd className="text-gray-500 text-xs dark:text-gray-400">1</dd>
          </div>
        </div>

        <div className=" py-3 px-6 flex flex-col items-center justify-center">
          <dt className="mb-2 text-sm font-bold">90+</dt>
          <dd className="text-gray-500 text-xs dark:text-gray-400">X</dd>
        </div>

        <div className=" py-3 px-6 flex flex-col items-center justify-center">
          <dt className="mb-2  text-xs">status</dt>
          <dd className="text-gray-500  text-sm font-bold dark:text-gray-400">
            time
          </dd>
        </div>
        <div className="flex items-center justify-center w-40 h-20 bg-slate-500 rounded-full">
          <div className="py-3 px-4">
            <dt className="mb-2 text-sm font-bold">1.2</dt>
            <dd className="text-gray-500 text-xs dark:text-gray-400">2</dd>
          </div>
          <div className=" py-3 px-4">
            <div>
              <Image
                width="48"
                height="48"
                src="https://img.icons8.com/color/96/india.png"
                alt="india"
              />
            </div>
            <dd className="text-gray-500 text-xs dark:text-gray-400">
              country
            </dd>
          </div>
        </div>
      </dl>
    </div>
    // </div>
  );
}