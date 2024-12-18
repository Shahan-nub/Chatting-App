import { Inter } from "next/font/google";
import "./globals.css";
// import Sidebar from "@/components/Sidebar/Sidebar";
import { Roboto } from 'next/font/google';

const inter = Inter({ subsets: ["latin"] });

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

export const metadata = {
  title: "Yap Joint",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {children}
        </body>
    </html>
  );
}
