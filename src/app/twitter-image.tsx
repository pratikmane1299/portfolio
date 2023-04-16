import { ImageResponse } from "next/server";

export const alt = "Pratik Mane's portfolio ";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function twitter() {
  return new ImageResponse(<div
		tw="w-full h-full flex flex-col items-center justify-center bg-gray-900"
		style={{ fontFamily: "Mulish" }}
	>
		<img
			width={200}
			height={200}
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
		</div>
	</div>, size);
}
