import { Raleway } from "next/font/google";
import Link from "next/link";

import { navLinks } from "@/data";

const raleway = Raleway({ subsets: ["latin"], weight: ["600"] });

function Navbar() {
  return (
    <nav className="px-4 py-4 w-full flex items-center justify-between">
      <Link
        href={"/"}
        style={raleway.style}
        className="text-2xl font-medium tracking-wider leading-4"
      >
        {"<Pratik />"}
      </Link>

      <ul className="flex items-center justify-between space-x-3">
        {navLinks.map(({ href, label }, idx) => (
          <li
            key={idx}
            className="p-2 text-base tracking-wide font-medium text-dracula-darker-100 rounded-md cursor-pointer hover:underline hover:bg-dracula-darker-800 transition-colors duration-500 ease-in-out"
          >
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
