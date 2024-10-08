import type { Metadata } from "next";
import bg from "@/app/assets/imgs/bg.jpg";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./Navbar";
import Image from "next/image";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`relative ${poppins.className} gap-4x flex min-h-[100vh] flex-col`}
      >
        <SessionProvider>
          <Image
            src={bg}
            className="absolute left-0 top-0 -z-10 h-full w-full object-cover brightness-75"
            alt=""
          ></Image>
          <Navbar />
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
