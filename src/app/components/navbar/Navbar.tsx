'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectWallet } from '@thirdweb-dev/react';

import './navbar.css';

function Navbar() {
  const currentRoute = usePathname();

  console.log(currentRoute, 'curent route');

  let currentClass = '';

  

  

  if (currentRoute == '/') {
    currentClass = 'home';
  } else if (currentRoute == '/components/myMatches') {
    currentClass = 'myMatches';
  }
  return (
    <nav className="w-full  fixed top-0 left-0 right-0 z-10 bg-gradient-to-b from-black to-transparent">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div className="w-20 flex items-center justify-between py-3 md:py-5 md:block">
          {/* LOGO */}
          <Link href="/">
            <h2 className="text-2xl text-cyan-600 font-bold ">LOGO</h2>
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
          <Link href="#projects">
            <ConnectWallet className=" !bg-green-600" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
