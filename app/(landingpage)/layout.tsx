import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import '../globals.css'
import Link from "next/link"
import Image from "next/image"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'WeaveBoard',
  description: 'A Next.js 14 Social Media Application'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} landing-page-background`}>
        <nav className="topbar_landing">
          <Link href="/sign-in" className="flex items-center gap-2">
            <Image
              src="/assets/logo.svg"
              alt="Weaveboard Logo"
              width={60}
              height={60}
            />
          </Link>
          <div className="flex items-center justify-between gap-5">
            <Link href="/sign-in">
              <div className="inline-flex items-start gap-[10px] px-[18px] py-[9px] relative bg-white rounded-[40px]">
                <div className="relative w-fit mt-[-1.00px] font-bold text-black text-[14px] text-right tracking-[-0.42px] leading-[22.2px] whitespace-nowrap">
                  Sign In
                </div>
              </div>
            </Link>
            <Link href="/sign-up">
              <div className="inline-flex items-start gap-[10px] px-[18px] py-[9px] relative bg-primary-500 rounded-[40px]">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Source_Sans_Pro-Bold',Helvetica] font-bold text-white text-[14px] text-right tracking-[-0.42px] leading-[22.2px] whitespace-nowrap">
                  Log In
                </div>
              </div>
            </Link>
          </div>
        </nav>

        <div className="flex justify-center items-center h-screen">
          {children}
        </div>

        <footer className="bottombar_landing">
          <div className="flex flex-col-reverse md:flex-row px-2 md:px-10 justify-between items-center">
            <Link href="/sign-in" className="flex items-center mt-0 md:mt-2">
              <Image
                src="/assets/logo.svg"
                alt="Weaveboard Logo"
                width={70}
                height={70}
              />
            </Link>
            <div className="hidden sm:flex flex-wrap mt-4 mb-4 md:mt-0 items-start gap-[75px] relative">
              <a href="/sign-in" className="font-semibold text-white text-sm md:text-base leading-5 whitespace-nowrap">Sign In</a>
              <a href="/log-in" className="font-semibold text-white text-sm md:text-base leading-5 whitespace-nowrap">Log In</a>
              {/* Insert Hre Anchor for Team and About */}
              <a className="font-semibold text-white text-sm md:text-base leading-5 whitespace-nowrap">Team</a>
              <a className="font-semibold text-white text-sm md:text-base leading-5 whitespace-nowrap">About</a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:mt-7 px-10 justify-center md:justify-between items-center">
            <div className="font-bold text-white text-[63px] tracking-[-1.89px] leading-[74.2px] whitespace-nowrap mb-4 md:mb-0">
              WeaveBoard
            </div>
            <div className="font-medium text-white text-[16px] sm:text-[16px] tracking-[0] leading-[26px] text-center md:text-right">
              WeaveBoard
              <br />
              All Rights Reserved 2023
            </div>
          </div>
        </footer>

      </body>
    </html>
  )
}