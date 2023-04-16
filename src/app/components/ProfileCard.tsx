import { Raleway } from "next/font/google";

import { email, githubProfileURL, twitterProfileURL } from "@/data";

import Inbox from "./Inbox";
import TwitterIcon from "./Twitter";
import GithubIcon from "./Github";

const raleway = Raleway({ subsets: ["latin"], weight: ["600"] });

function ProfileCard() {
  return (
    <section id="/" className="px-4 py-32 w-full flex flex-col">
      <h1 style={raleway.style} className="block mb-4 tracking-wider">
        <span className="block mb-1 text-xs md:text-base font-medium tracking-wider">
          Hey there, I'm
        </span>
        <span className="text-xl md:text-3xl px-2 block bg-dracula-pink-400 w-fit text-white">
          Pratik Mane
        </span>
      </h1>
      <p className="block text-xs md:text-base font-medium tracking-wider leading-7">
        I'm a
        <span className="inline-block mx-2 border-b border-dracula-pink-400">
          Software Engineer
        </span>
        at MakeStories, Tech Enthusiast and Football fan. dkjflksdjlfsd fjds
        l;f;dsf;ds fsdjf ldjsklf klsdjflkj sklfjsjdfkl jsklfjskld jfklsdjfkljsdk
        lfsd f sdjflk sd klfsd;f j;dsfdsf kjsdklfklsd jfkljsdklfj klsdjfkljs
        dklfjsdkfj kdsjfkljsd fjlsdf s df sdlf sd f sdlf sflsf
      </p>

      {/* social links */}
      <div className="mt-10 w-full flex items-center space-x-4">
        <a
          href={`mailto:${email}`}
          rel="noopener noreferrer"
          className="p-1 bg-gray-600 rounded-md cursor-pointer hover:opacity-90"
        >
          <Inbox />
        </a>
        <a
          href={twitterProfileURL}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 bg-blue-400 rounded-md cursor-pointer hover:opacity-9"
        >
          <TwitterIcon />
        </a>
        <a
          href={githubProfileURL}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 bg-gray-600 rounded-md cursor-pointer hover:opacity-90"
        >
          <GithubIcon />
        </a>
      </div>
    </section>
  );
}

export default ProfileCard;
