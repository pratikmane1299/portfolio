import NotFoundIcon from "@/app/components/404Icon";

export default function LeetcodeProblemNotFound() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col text-center">
        <NotFoundIcon />
        <span className="text-base sm:text-xl font-medium">
          {`The problem you're looking doesn't exists.`}
        </span>
      </div>
    </div>
  );
}
