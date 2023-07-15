import React from "react";
import NotFoundIcon from "./components/404Icon";

export default function NotFound() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col text-center">
        <NotFoundIcon />
        <span className="text-base sm:text-xl font-medium">
          {`The page you're looking doesn't exists.`}
        </span>
      </div>
    </div>
  );
}
