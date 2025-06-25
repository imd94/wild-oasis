import Header from "@/app/_components/Header";

import { Josefin_Sans } from 'next/font/google';  //font/local
const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap'
});

import "@/app/_styles/globals.css";

export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: 'The Wild Oasis'
  },
  description: "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful and dark forests.",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col`} suppressHydrationWarning>
        <Header />

        <div className="flex-1 ox-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">{children}</main>
        </div>
      </body>
    </html>
  )
}

export default RootLayout;
