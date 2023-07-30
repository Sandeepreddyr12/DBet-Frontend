export default function cardSkelton() {
  return (
    <div className="w-[22rem] relative mx-3 my-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 shadow-lg">
      <div className="h-5 w-max px-3 absolute top-1.5 right-3 ">
        <div className="relative">
          <div className="bg-gray-600 w-16 h-6 animate-pulse rounded-full"></div>
        </div>
      </div>
      <div className="w-full mt-6 bg-white rounded-lg p-4 dark:bg-gray-800">
        <dl className="grid grid-cols-2 gap-4 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
          <div className=" py-2 px-4 flex flex-col items-center justify-center">
            <div className="mb-1 bg-gray-600 w-full animate-pulse h-3"></div>
            <dd className="text-gray-500 text-xs dark:text-gray-400">
              <div className="bg-gray-600 w-20 h-8 animate-pulse rounded-full"></div>
            </dd>
          </div>
          <div className=" py-2 px-4 flex flex-col items-center justify-center">
            <div className="mb-1 bg-gray-600 w-full animate-pulse h-3"></div>{' '}
            <dd className="text-gray-500  text-sm font-bold dark:text-gray-400">
              <div className="bg-gray-600 w-20 h-8 animate-pulse rounded-full"></div>
            </dd>
          </div>
          <div className=" py-2 px-4 flex flex-col items-center justify-center">
            <div className="mb-1 bg-gray-600 w-full animate-pulse h-3"></div>{' '}
            <dd className="text-gray-500 text-xs dark:text-gray-400">
              <div className="bg-gray-600 w-20 h-8 animate-pulse rounded-full"></div>
            </dd>
          </div>
          <div className=" py-2 px-4 shadow-lg rounded-lg flex flex-col items-center justify-center">
            <div className="bg-gray-600 w-20 h-14 animate-pulse rounded-2xl"></div>
          </div>
          <div className=" py-2 px-4 shadow-lg rounded-lg flex flex-col items-center justify-center">
            <div className="bg-gray-600 w-20 h-14 animate-pulse rounded-2xl"></div>
          </div>
          <div className=" py-2 px-4 shadow-lg rounded-lg flex flex-col items-center justify-center">
            <div className="bg-gray-600 w-20 h-14 animate-pulse rounded-2xl"></div>
          </div>
        </dl>
      </div>
    </div>
  );
}
