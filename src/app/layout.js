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
      <body className={`${inter.className} bg-gray-900 text-gray-50`}>
        <SessionProvider>
          <div className="p-4 max-w-2xl mx-auto">
            <Navbar />
            <div className="mt-8">{children}</div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
