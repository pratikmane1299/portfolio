import { bio, blogDomain, name } from "@/data";
import { ImageResponse } from "next/og";

const alt = "Pratik Mane ";
const size = {
  width: 1200,
  height: 630,
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url?.replaceAll("&amp;", "&"));

  const title = searchParams.get("title");
  const date = searchParams.get("date");
  const page = searchParams.get("page");

  return new ImageResponse(
    (
      <div
        tw="w-full h-full flex flex-col bg-gray-900"
        style={{ fontFamily: "Mulish" }}
      >
        {page === "blog" ? (
          <div tw="relative flex flex-col">
            <div tw="p-10 flex flex-col h-full justify-center">
              <div tw="flex flex-col">
                <h1 tw="text-white text-5xl font-medium block">{title}</h1>
                <p tw="mt-0 text-gray-400 text-xl font-medium w-[70%] tracking-normal">
                  <span>{name}</span>|{" "}
                  {date && (
                    <span>
                      {new Date(date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                        day: "2-digit",
                      })}
                    </span>
                  )}
                </p>
              </div>

              <div tw="flex absolute bottom-10 left-10 text-gray-200">{blogDomain}</div>
            </div>

            <img
              src="https://avatars.githubusercontent.com/u/30666584?s=400&u=ddd8340a1e7f924f1af643d67733f36c6e93c0e2&v=4"
              alt="Pratik Mane's portfolio"
              tw="absolute top-10 right-10 bg-gray-800 h-[50px] w-[50px] rounded-full "
            />
          </div>
        ) : (
          <div tw="h-full flex flex-col items-center justify-center">
            <img
              width={200}
              height={200}
              src="https://avatars.githubusercontent.com/u/30666584?s=400&u=ddd8340a1e7f924f1af643d67733f36c6e93c0e2&v=4"
              alt="Pratik Mane's portfolio"
              tw="bg-gray-800 h-[200px] w-[200px] rounded-full "
            />
            <div tw="mt-10 flex flex-col items-center">
              <h1
                tw="text-white text-5xl font-medium block"
                style={{ fontFamily: "Raleway" }}
              >
                {title ?? alt}
              </h1>
              {page === "blog" ? (
                <p tw="text-gray-400 text-xl font-medium w-[70%] tracking-normal">
                  <span>{name}</span> |{" "}
                  {date && (
                    <span>
                      {new Date(date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                        day: "2-digit",
                      })}
                    </span>
                  )}
                </p>
              ) : (
                <p tw="text-gray-400 text-2xl text-center font-medium w-[70%] break-words">
                  {bio}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    ),
    size
  );
}
