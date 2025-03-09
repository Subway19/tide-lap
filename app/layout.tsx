import './globals.css'
import type { Metadata } from 'next'
import { Montserrat, Open_Sans } from "next/font/google";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: '--font-montserrat',
});

const openSans = Open_Sans({ 
  subsets: ["latin"],
  variable: '--font-open-sans',
});

export const metadata: Metadata = {
  title: 'Tide - Business Loan Application',
  description: 'Apply for a business loan with Tide',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${openSans.variable} font-open-sans`}>
        {children}
      </body>
    </html>
  )
}
