import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from './components/navbar/Navbar'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Decent-Bet',
  description: 'A Decentralized Sports Predictor',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          {/* <NavBar /> */}
        </header>
        {children}
      </body>
    </html>
  );
}
