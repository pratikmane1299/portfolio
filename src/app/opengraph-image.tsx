import { ImageResponse } from "next/server";

export const alt = "Pratik Mane's portfolio ";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function og() {
  return new ImageResponse(
    (
      <div
        tw="w-full h-full flex flex-col items-center justify-center bg-gray-900"
        style={{ fontFamily: "Mulish" }}
      >
        <img
          width="200px"
          height="200px"
          src="https://avatars.githubusercontent.com/u/30666584?s=400&u=ddd8340a1e7f924f1af643d67733f36c6e93c0e2&v=4"
          alt="Pratik Mane's portfolio"
          tw="bg-gray-800 h-[200px] w-[200px] rounded-full "
        />
        <div tw="mt-10 flex flex-col items-center">
          <h1
            tw="text-white text-4xl font-medium block"
            style={{ fontFamily: "Raleway" }}
          >
            Pratik Mane
          </h1>
          <p tw="text-gray-400 text-2xl font-medium w-[70%] break-words">
            Software Engineer at MakeStories | Football fan | Tech enthusiast |
            Building innovative software solutions | Committed to excellence &
            continuous learning.
          </p>

          <div tw="mt-5 flex items-center gap-3">
            <a
              href=""
              tw="p-1 md:p-2 bg-blue-400 rounded md:rounded-md cursor-pointer hover:opacity-90 text-white"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                tw="h-5 w-5 md:h-6 md:w-6"
              >
                <path
                  d="M20.055 7.983c.011.174.011.347.011.523 0 5.338-3.92 11.494-11.09 11.494v-.003A10.755 10.755 0 0 1 3 18.186c.308.038.618.057.928.058a7.655 7.655 0 0 0 4.841-1.733c-1.668-.032-3.13-1.16-3.642-2.805a3.753 3.753 0 0 0 1.76-.07C5.07 13.256 3.76 11.6 3.76 9.676v-.05a3.77 3.77 0 0 0 1.77.505C3.816 8.945 3.288 6.583 4.322 4.737c1.98 2.524 4.9 4.058 8.034 4.22a4.137 4.137 0 0 1 1.128-3.86A3.807 3.807 0 0 1 19 5.274a7.657 7.657 0 0 0 2.475-.98c-.29.934-.9 1.729-1.713 2.233A7.54 7.54 0 0 0 22 5.89a8.084 8.084 0 0 1-1.945 2.093Z"
                  fill="currentColor"
                ></path>
              </svg>
            </a>

            <a
              href="#"
              tw="ml-3 p-1 md:p-2 bg-gray-600 rounded md:rounded-md cursor-pointer hover:opacity-90 text-white"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                tw="h-5 w-5 md:h-6 md:w-6"
              >
                <path
                  clip-rule="evenodd"
                  d="M12 2C6.475 2 2 6.588 2 12.253c0 4.537 2.862 8.369 6.838 9.727.5.09.687-.218.687-.487 0-.243-.013-1.05-.013-1.91C7 20.059 6.35 18.957 6.15 18.38c-.113-.295-.6-1.205-1.025-1.448-.35-.192-.85-.667-.013-.68.788-.012 1.35.744 1.538 1.051.9 1.551 2.338 1.116 2.912.846.088-.666.35-1.115.638-1.371-2.225-.256-4.55-1.14-4.55-5.062 0-1.115.387-2.038 1.025-2.756-.1-.256-.45-1.307.1-2.717 0 0 .837-.269 2.75 1.051.8-.23 1.65-.346 2.5-.346.85 0 1.7.115 2.5.346 1.912-1.333 2.75-1.05 2.75-1.05.55 1.409.2 2.46.1 2.716.637.718 1.025 1.628 1.025 2.756 0 3.934-2.337 4.806-4.562 5.062.362.32.675.936.675 1.897 0 1.371-.013 2.473-.013 2.82 0 .268.188.589.688.486a10.039 10.039 0 0 0 4.932-3.74A10.447 10.447 0 0 0 22 12.253C22 6.588 17.525 2 12 2Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    ),
    size
  );
}
