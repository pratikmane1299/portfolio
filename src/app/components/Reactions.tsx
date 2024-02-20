import { BlogReactionsType } from "@/types";

const emojiMap: Record<any, string> = {
  "+1": "👍",
  "-1": "👎",
  laugh: "😆",
  hooray: "🎉",
  confused: "😕",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

export default function Reactions({
  reactions,
  postTitle,
}: {
  reactions: BlogReactionsType;
  postTitle: string;
}) {
  return (
    <a
      href={reactions.url}
      target="_blank"
      className="text-sm md:text-base font-medium"
      data-umami-event="Leave reaction on blog"
      data-umami-event-blog={postTitle}
    >
      <span className="mr-2">Reactions:</span>
      {reactions.total_count > 0
        ? Object.keys(reactions?.emojis)?.map((reaction: any, idx: number) => {
            if (
              Object.keys(emojiMap).includes(reaction) &&
              reactions?.emojis[reaction] > 0
            ) {
              return (
                <div
                  key={idx}
                  className="mr-2 py-1 px-2 align-middle inline text-sm rounded-2xl border border-slate-400"
                >
                  <span className="mr-1">{emojiMap[reaction]}</span>
                  <span>{reactions?.emojis[reaction]}</span>
                </div>
              );
            }

            return <></>;
          })
        : "Leave a reaction"}
    </a>
  );
}
