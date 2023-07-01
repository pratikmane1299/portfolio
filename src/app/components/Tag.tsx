import { classNames } from "@/utils";

type TagPropsType = {
  tag: string;
	isActive?: boolean;
};

function Tag({ tag, isActive }: TagPropsType) {
  return (
    <span
      className={classNames(
        "px-1.5 py-1 md:px-2 md:py-1.5 rounded md:rounded-md text-xs text-white tracking-wide font-normal",
        isActive
          ? "bg-dracula-darker-700"
          : "bg-dracula-dark-600 hover:bg-dracula-darker-700"
      )}
    >
      {tag}
    </span>
  );
}

export default Tag;
