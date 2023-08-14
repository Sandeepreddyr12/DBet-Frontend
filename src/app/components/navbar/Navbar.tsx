'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectWallet } from '@thirdweb-dev/react';

import './navbar.css';
import DecentBet_logo from '../../../../public/assets/DecentBet_logo.png';

function Navbar() {
  const currentRoute = usePathname();

  let currentClass = '';

  if (currentRoute == '/') {
    currentClass = 'home';
  } else if (currentRoute == '/components/myMatches') {
    currentClass = 'myMatches';
  }
  return (
    <nav className="w-full fixed top-0 left-0 right-0 z-10 bg-gradient-to-b from-black to-transparent">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div className="min-w-max flex items-center justify-between py-3">
          {/* LOGO */}
          <Link href="/">
            <Image src={DecentBet_logo} alt="Logo" width={120} height={150} />
          </Link>
        </div>

        <div className="navbar">
          <ul className={currentClass}>
            <li>
              <Link
                href="/"
                className={currentRoute == '/' ? 'activeClass' : ''}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/components/myMatches"
                className={
                  currentRoute == '/components/myMatches' ? 'activeClass' : ''
                }
              >
                My Matches
              </Link>
            </li>
          </ul>
        </div>

        <div
          className="pb-6 text-xl text-white py-2 px-6 text-center 
             border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent"
        >
          <ConnectWallet className=" !bg-green-600" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
