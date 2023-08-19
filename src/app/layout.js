import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Note CRUD App",
  description: "Created by JSA-Code",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-gray-50`}>
        <div className="p-4 max-w-2xl mx-auto">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
