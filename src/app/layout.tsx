'use client';

import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Sepolia } from '@thirdweb-dev/chains';

import './globals.css';
import NavBar from './components/navbar/Navbar';
import { thirdWeb_clientId } from '@/constants/ContractAdresses';
import StoreProvider from './context/store';

export const metadata = {
  title: 'Decent-Bet',
  description: 'A Decentralized Sports Predictor',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThirdwebProvider activeChain={Sepolia} clientId={thirdWeb_clientId}>
          <StoreProvider>
            <header><NavBar /></header>
            {children}
          </StoreProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
