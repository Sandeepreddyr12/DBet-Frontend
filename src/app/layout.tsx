'use client';

import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Sepolia } from '@thirdweb-dev/chains';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import './globals.css';
import NavBar from './components/navbar/Navbar';
import { thirdWeb_clientId } from '@/constants/ContractAdresses';
import StoreProvider from './context/store';
import Footer from './components/footer/Footer';

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
    <html>
      <body>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
        />
        <ThirdwebProvider activeChain={Sepolia} clientId={thirdWeb_clientId}>
          <StoreProvider>
            <header>
              <NavBar />
            </header>
            {children}
            <Footer/>
          </StoreProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
