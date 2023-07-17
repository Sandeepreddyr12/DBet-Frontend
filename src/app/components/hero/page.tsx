import Image from 'next/image';
import { Lobster } from 'next/font/google';

import { Discount, ether } from '../../../../public/assets';

const lobster = Lobster({
  subsets: ['latin'],
  variable: '--font-lobster',
  weight: '400',
});

export default function page() {
  return (
    <div>
      <div className=" bg-black flex justify-center items-center bg-LpageImage bg-fixed bg-no-repeat bg-cover select-none">
        <div className="flex md:flex-row flex-col sm:py-16 py-6">
          <div className="mt-32 flex justify-center items-start flex-col w-full xl:px-0 sm:px-16 px-6">
            <div className="flex flex-row items-center  px-4 bg-discount-gradient rounded-[10px] mb-2">
              <Image
                src={Discount}
                alt="discount"
                className="w-[20px] h-[20px] inline"
              />
              <p className="text-gray-300 font-poppins font-normal text-[12px] leading-[30.8px] ml-2">
                start with as low as{' '}
                <span className="text-white font-bold">
                  0.01
                  <Image
                    src={ether}
                    alt="discount"
                    className="w-[12px] h-[12px] inline"
                  />
                  /~$20
                </span>
              </p>
            </div>

            <div className=" backdrop-blur-[8px]  bg-gradient-to-r from-emerald-700 to-gray-800 bg-clip-text text-transparent capitalize px-6 rounded-3xl font-poppins font-bold ss:text-[42px] text-3xl ss:leading-[60px] leading-[50px] mb-12 ">
              <p className="text-xl">A True betting platform with</p>
              <span>Untempered </span>
              <span className="">logic</span>
              {'  '}
              <br className="sm:block hidden" />
              and <span className="">Foolproof</span>
              {'  '}
              <span className="">Algorithm!</span>
              {/* <br className="sm:block hidden" /> */}
            </div>
            <p
              className="backdrop-blur-[8px] max-w-3xl bg-green-300 
                 bg-opacity-10 w- px-8 py-4 rounded-2xl capitalize font-bold font-poppins text-dimWhite text-[12px] mt-10"
            >
              Experience the future of sports betting with our decentralized web
              app. Harnessing the power of blockchain technology, we provide a
              secure and transparent platform for instant, fair, and borderless
              wagering on your favorite sports events. Say goodbye to
              intermediaries and embrace a new era of trustless and
              decentralized sports betting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
