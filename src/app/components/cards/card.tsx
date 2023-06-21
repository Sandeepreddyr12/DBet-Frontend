import Image from 'next/image';

export default function Card() {
  return (
    <div className="max-w-md min-w-max w-1/5 mx-3 my-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
      <div className="w-full  bg-white rounded-lg p-4 dark:bg-gray-800">
        <div className="text-cyan-200 text-center "> icc odi worldcup</div>
        <dl className="grid max-w-screen-xl grid-cols-2 gap-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white">
          <div className=" py-3 px-6 flex flex-col items-center justify-center">
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
          <div className=" py-3 px-6 flex flex-col items-center justify-center">
            <dt className="mb-2  text-xs">Today</dt>
            <dd className="text-gray-500  text-sm font-bold dark:text-gray-400">
              time
            </dd>
          </div>
          <div className=" py-3 px-6 flex flex-col items-center justify-center">
            <dt className="mb-2 text-sm font-bold">flag</dt>
            <dd className="text-gray-500 text-xs dark:text-gray-400">
              country
            </dd>
          </div>
          <div className="bg-gray-600 py-3 px-6 shadow-lg rounded-lg flex flex-col items-center justify-center">
            <dt className="mb-2 text-sm font-bold">1.5</dt>
            <dd className="text-gray-500 text-xs dark:text-gray-400">1</dd>
          </div>
          <div className="bg-gray-600 py-3 shadow-lg rounded-lg flex flex-col items-center justify-center">
            <dt className="mb-2 text-sm font-bold">90+</dt>
            <dd className="text-gray-500 text-xs dark:text-gray-400">X</dd>
          </div>
          <div className="bg-gray-600 py-3 shadow-lg rounded-lg flex flex-col items-center justify-center">
            <dt className="mb-2 text-sm font-bold">1.2</dt>
            <dd className="text-gray-500 text-xs dark:text-gray-400">2</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
