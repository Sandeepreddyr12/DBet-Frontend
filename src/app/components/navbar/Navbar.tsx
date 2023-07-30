'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ConnectWallet } from '@thirdweb-dev/react';

function Navbar() {
  return (
    <nav className="w-full  fixed top-0 left-0 right-0 z-10">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          {/* LOGO */}
          <Link href="/">
            <h2 className="text-2xl text-cyan-600 font-bold ">LOGO</h2>
          </Link>
          {/* HAMBURGER BUTTON FOR MOBILE */}
          <div className="md:hidden">
            <button className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border">
              {true ? (
                <Image src="/close.svg" width={30} height={30} alt="logo" />
              ) : (
                <Image
                  src="/hamburger-menu.svg"
                  width={30}
                  height={30}
                  alt="logo"
                  className="focus:border-none active:border-none"
                />
              )}
            </button>
          </div>
        </div>

        <div
          className={`
           justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
             true ? 'p-12 md:p-0 block' : 'hidden'
           }`}
        >
          <ul className="h-screen md:h-auto items-center justify-center md:flex">
            <li className="pb-6 text-xl text-white py-2 md:px-6 text-center border-b-2 md:border-b-0  hover:bg-purple-900  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
              <Link href="#about">About</Link>
            </li>
            <li className="pb-6 text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
              <Link href="#blog">Blogs</Link>
            </li>
            <li className="pb-6 text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
              <Link href="#contact">Contact</Link>
            </li>
            <li
              className="pb-6 text-xl text-white py-2 px-6 text-center md:ml-40
             border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent"
            >
              <Link href="#projects">
                <ConnectWallet className=' !bg-green-600' />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
