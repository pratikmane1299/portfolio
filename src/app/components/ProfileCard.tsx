import { Raleway } from "next/font/google";

import { bio, email, githubProfileURL, jobTitle, name, twitterProfileURL } from "@/data";

import Inbox from "./Inbox";
import TwitterIcon from "./Twitter";
import GithubIcon from "./Github";

const raleway = Raleway({ subsets: ["latin"], weight: ["600"] });

function ProfileCard() {
  return (
    <section id="/" className="px-4 py-32 w-full flex flex-col">
      <h1 style={raleway.style} className="block mb-4 tracking-wider">
        <span className="block mb-1 text-xs md:text-base font-medium tracking-wider">
          {`Hey there, I'm`}
        </span>
        <span className="text-xl md:text-3xl px-2 block bg-dracula-pink-400 w-fit text-white">
          {name}
        </span>
      </h1>
      <p className="block text-xs md:text-base font-medium tracking-wider leading-7">
        <span className="inline-block mr-2 border-b border-dracula-pink-400">
          {jobTitle}
        </span>
        {bio}
      </p>

      {/* social links */}
      <div className="mt-10 w-full flex items-center space-x-4">
        <a
          href={`mailto:${email}`}
          rel="noopener noreferrer"
          className="p-1 md:p-2 bg-gray-600 rounded md:rounded-md cursor-pointer hover:opacity-90"
        >
          <Inbox />
        </a>
        <a
          href={twitterProfileURL}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 md:p-2 bg-blue-400 rounded md:rounded-md cursor-pointer hover:opacity-90"
        >
          <TwitterIcon />
        </a>
        <a
          href={githubProfileURL}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 md:p-2 bg-gray-600 rounded md:rounded-md cursor-pointer hover:opacity-90"
        >
          <GithubIcon />
        </a>
      </div>
    </section>
  );
}

export default ProfileCard;
