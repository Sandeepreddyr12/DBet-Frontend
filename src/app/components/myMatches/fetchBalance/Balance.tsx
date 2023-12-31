import { useContext } from 'react';
import {
  useAddress,
  useContractRead,
  useContractWrite,
} from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

import { Store } from '@/app/context/store';

type Props = {};

export default function Balance({}: Props) {
  const sportsPredictorContract = useContext(Store);

  
  const address = useAddress();

  const { data, isLoading } = useContractRead(
    sportsPredictorContract,
    'getBalance',
    [],
    { from: address }
  );

  const { mutateAsync: fetchBalance, isLoading: isFetching } = useContractWrite(
    sportsPredictorContract,
    'fetchBalance'
  );

  const FetchBalanceHandler = async () => {
    const id = toast.loading('⏳ Fetching your Winnings...');

    try {
      const data = await fetchBalance({
        args: [],
        // overrides: {
        //   gasLimit: 1000000, // override default gas limit
        // },
      });
      // console.info('contract call successs', data);

      toast.update(id, {
        render: '🎉 winnings fetched',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err) {
      toast.update(id, {
        render: '😢 Failed to Fetch the balance,please try again later',
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const { mutateAsync: withDrawWinnigs, isLoading: isWithDrawing } =
    useContractWrite(sportsPredictorContract, 'withDrawWinnigs');

  const withDrawHandler = async () => {
    const id = toast.loading('⏳ processing your Withdrawal request...');

    try {
      const data = await withDrawWinnigs({ args: [] });

      toast.update(id, {
        render: '🎉 Withdrawal success',
        type: 'success',
        isLoading: false,
        autoClose: 4000,
      });
    } catch (err) {
      // console.error('contract call failure', err);

      toast.update(id, {
        render: '😢 Failed to withdraw balance',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="w-screen flex items-center justify-center">
      <div className=" w-[80%] mt-6  shadow-[0_3px_10px_rgb(0,0,0,0.2)] pb-8 rounded-lg">
        <div className="text-3xl text-red-700 mb-4 font-bold font-mono text-center pt-8 pb-4 ">
          My Balance
        </div>

        <div className="space-x-8 mt-7 flex justify-between  md:justify-center">
          <button
            onClick={FetchBalanceHandler}
            disabled={isFetching || isWithDrawing || isLoading}
            className={`text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5  ${
              isFetching || isWithDrawing || isLoading
                ? 'cursor-not-allowed'
                : ''
            }`}
          >
            {' '}
            {isFetching ? (
              <div className="flex items-center justify-center opacity-70">
                <div className="h-3 w-3 border-t-transparent border-solid animate-spin rounded-full border-white border-2"></div>
                <div className="ml-2"> Processing... </div>
              </div>
            ) : (
              'Fetch-winnings'
            )}
          </button>{' '}
          <div className="text-white py-2 px-4 w-max rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium">
            {isLoading ? (
              <div className="h-3 w-3 border-t-transparent border-solid animate-spin rounded-full border-white border-2"></div>
            ) : (
              <div>
                {' '}
                Winnings : {ethers.utils.formatEther(`${data || 0}`)} Eth{' '}
              </div>
            )}
          </div>
          <button
            onClick={withDrawHandler}
            disabled={
              !ethers.utils.formatEther(`${data || 0}`) ||
              isFetching ||
              isWithDrawing ||
              isLoading
            }
            className={`text-white py-2 px-4 rounded bg-green-700 hover:bg-green-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 ${
              (+ethers.utils.formatEther(`${data || 0}`) <= 0 ||
                isFetching ||
                isWithDrawing ||
                isLoading) &&
              'cursor-not-allowed'
            } `}
          >
            {' '}
            {isWithDrawing ? (
              <div className="flex items-center justify-center opacity-70">
                <div className="h-3 w-3 border-t-transparent border-solid animate-spin rounded-full border-white border-2"></div>
                <div className="ml-2"> Processing... </div>
              </div>
            ) : (
              'WithDraw-winnings'
            )}
          </button>{' '}
        </div>
        <div className="text-center font-mono text-gray-500 select-none font-semibold mt-4">
          To get the most up-to-date winnings, please fetch before withdrawing.
        </div>
      </div>
    </div>
  );
}
