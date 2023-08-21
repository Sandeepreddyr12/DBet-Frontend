'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectWallet } from '@thirdweb-dev/react';

import './navbar.css';
import DecentBet_logo from '../../../../public/assets/DecentBet_logo.png';

function Navbar() {
  const currentRoute = usePathname();
  const [bgColor, setBgColor] = useState<boolean>(false);

  let currentClass = '';

  if (currentRoute == '/') {
    currentClass = 'home';
  } else if (currentRoute == '/components/myMatches') {
    currentClass = 'myMatches';
  }

  //navbar scroll changeBackground function
  const changeBackground = () => {
    if (window.scrollY >= 60) {
      setBgColor(true);
    } else {
      setBgColor(false);
    }
  };

  useEffect(() => {
    // changeBackground();
    // adding the event when scroll change background
    window.addEventListener('scroll', changeBackground);

    return () => {
      window.removeEventListener('scroll', changeBackground);
    };
  }, []);

  return (
    <nav
      className={`w-full fixed top-0 left-0 right-0 z-10 ${
        bgColor
          ? ' backdrop-blur-[80px] '
          : 'bg-gradient-to-b from-black to-transparent'
      } transition ease-out delay-100 duration-150`}
    >
      <div className="justify-between items-center px-4  mx-auto mt-2 lg:max-w-7xl md:items-center md:flex md:px-8">
        <div className={`min-w-max ${bgColor && 'bg-green-300 rounded-md'} `}>
          {/* LOGO */}
          <Link href="/">
            <Image src={DecentBet_logo} alt="Logo" width={180} height={120} />
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
          className="pb-4  pt-2   px-6 text-center"
        >
          <ConnectWallet className=" !bg-green-400 !font-bold " />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
