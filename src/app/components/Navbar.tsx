'use client';
import { useState } from "react";
import { Raleway } from "next/font/google";
import Link from "next/link";

import { navLinks } from "@/data";

const raleway = Raleway({ subsets: ["latin"], weight: ["600"] });

function Navbar() {
	const [isVisible, toggleNav] = useState(false);
	const [activePage, setActivePage] = useState("");

  return (
    <div className="relative w-full">
      <nav className="sticky top-4 z-10 px-4 py-4 w-full flex items-center justify-between">
        <Link
          href={"/"}
          style={raleway.style}
          className="text-xl md:text-2xl font-medium tracking-wider leading-4"
        >
          {"<Pratik />"}
        </Link>

        <ul className="hidden md:flex items-center justify-between space-x-3">
          {navLinks.map(({ href, label }, idx) => (
            <li
              key={idx}
              className={`p-2 text-sm tracking-wide font-medium rounded-md cursor-pointer transition-colors duration-500 ease-in-out ${
                activePage === href
                  ? "text-dracula-dark-50 bg-dracula-darker-800 underline"
                  : "text-dracula-darker-100 hover:text-dracula-dark-50 hover:underline hover:bg-dracula-darker-800"
              }`}
            >
              <Link href={href} onClick={() => setActivePage(href)}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="md:hidden p-1 md:p-2 rounded lg:rounded-md bg-dracula-darker-800 outline-none hover:opacity-90 focus:ring-1 focus:ring-offset-1 focus:ring-dracula-darker-800"
          onClick={() => toggleNav((prev) => !prev)}
        >
          {isVisible ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>
      {isVisible && (
        <>
          <div className="md:hidden fixed bg-gray-500 bg-opacity-75 transition-opacity z-10"></div>
          <div className="md:hidden absolute w-full flex justify-center px-4 z-30">
            <ul className="w-full flex flex-col bg-dracula-darker-800 rounded-md shadow-2xl">
              {navLinks.map(({ label, href }, idx) => (
                <li className="w-full px-4 py-3">
                  <Link
                    key={idx}
                    href={href}
                    className={`text-xs font-medium tracking-wide leading-6 ${
                      activePage === href
                        ? "text-dracula-dark-50"
                        : "text-dracula-darker-100 hover:text-dracula-dark-50"
                    }`}
                    onClick={() => toggleNav(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
