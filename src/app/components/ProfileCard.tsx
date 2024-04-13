import { Raleway, Poppins } from "next/font/google";

import {
  bio,
  bioWithoutJobTitle,
  email,
  githubProfileURL,
  jobTitle,
  name,
  peerlistProfileURL,
  twitterProfileURL,
} from "@/data";

import Inbox from "./Inbox";
import TwitterIcon from "./Twitter";
import GithubIcon from "./Github";
import Peerlist from "./Peerlist";

const raleway = Raleway({ subsets: ["latin"], weight: ["600"] });
const poppins = Raleway({ subsets: ["latin"], weight: ["600"] });

function ProfileCard() {
  return (
    <section
      id="/"
      className="mb-0 px-4 py-32 w-full flex flex-col translate-y-4 opacity-0 animate-fadein"
    >
      <h1
        // style={raleway.style}
        style={poppins.style}
        className="flex items-center space-x-3 mb-4 tracking-normal sm:tracking-wider"
      >
        <span className="mb-1 text-xs md:text-base font-medium tracking-wider text-primary">
          {`Hey there, I'm`}
        </span>
        <span className="text-xl md:text-3xl px-2 w-fit text-primary-foreground bg-primary">
          {name}
        </span>
      </h1>
      <p className="block text-xs md:text-base font-medium tracking-normal sm:tracking-wider leading-7 text-foreground">
        <span className="inline-block mr-2 border-b-2 border-primary-foreground">
          {jobTitle}
        </span>
        {bioWithoutJobTitle}
      </p>

      {/* social links */}
      <div className="mt-10 w-full flex items-center space-x-4">
        <a
          href={`mailto:${email}`}
          rel="noopener noreferrer"
          className="p-1 md:p-2 bg-secondary rounded md:rounded-md cursor-pointer hover:opacity-90"
          id="connect-via-mail"
          data-umami-event="Connnect via Mail"
        >
          <Inbox />
        </a>
        <a
          href={twitterProfileURL}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 md:p-2 bg-secondary rounded md:rounded-md cursor-pointer hover:opacity-90"
          id="twitter-profile"
          data-umami-event="View Twitter Profile"
        >
          <TwitterIcon />
        </a>
        <a
          href={githubProfileURL}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 md:p-2 bg-secondary rounded md:rounded-md cursor-pointer hover:opacity-90"
          id="github-profile"
          data-umami-event="View Github Profile"
        >
          <GithubIcon />
        </a>
        <a href={peerlistProfileURL} target="_blank" rel="noepener noreferrer" id="peerlist-profile" data-umami-event="View Peerlist Profile" className="p-1 md:p-2 bg-secondary rounded md:rounded-md cursor-pointer hover:opacity-90">
          <Peerlist />
        </a>
      </div>
    </section>
  );
}

export default ProfileCard;
