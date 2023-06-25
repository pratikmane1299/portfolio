import { classNames } from "@/utils";

const colorMap = {
  green: "border-green-600 text-green-600",
  yellow: "border-yellow-600 text-yellow-600",
  red: "border-red-600 text-red-600",
};

export default function DifficultyTag({
  difficulty,
  color = "green",
}: {
  difficulty: string;
  color: keyof typeof colorMap;
}) {
  return (
    <span
      className={classNames(
        "px-2 py-1 text-xs font-normal border rounded-md tracking-wide",
        colorMap[color]
      )}
    >
      {difficulty}
    </span>
  );
}
