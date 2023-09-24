import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import SessionProvider from "@/libs/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Note CRUD App",
  description: "Created by JSA-Code",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="viewport" />
      <body className={`${inter.className} bg-gray-900 text-slate-50`}>
        <SessionProvider>
          <div className="mb-16 sm:mb-0">
            <Navbar />
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
