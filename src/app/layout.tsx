import './globals.css'
import NavBar from './components/navbar/Navbar'



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
      <body>
        {/* <header><NavBar /></header> */}
        {children}
      </body>
    </html>
  );
}
