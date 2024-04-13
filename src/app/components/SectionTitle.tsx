import { classNames } from "@/utils";

type SectionTitlePropsType = { title: string; className?: string; marginBottom?: boolean };

function SectionTitle({
  title,
  className = "",
  marginBottom = true,
}: SectionTitlePropsType) {
  return (
    <h3
      className={classNames(
        "text-lg md:text-xl font-medium md:tracking-wide text-secondary-foreground",
        marginBottom ? "mb-4 md:mb-6 " : "",
        className
      )}
    >
      {title}
    </h3>
  );
}

export default SectionTitle;
