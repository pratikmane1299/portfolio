import { classNames } from "@/utils";

const columns = ["Number", "Name", "Difficulty", "Tags"];

function LeetcodeProblemsTableSkeleton() {
  return (
    <div className="mt-10">
      <table className="w-full rounded-md overflow-hidden ring-1 ring-gray-500">
        <thead className="border-b border-gray-500">
          <tr className="divide-x divide-gray-500">
            {columns.map((column, idx) => (
              <th
                key={idx}
                className={classNames(
                  "py-2 px-3",
                  idx === 1 || idx === 3 ? "text-left" : "text-center"
                )}
              >
                <span className="text-base font-medium">{column}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-500 animate-pulse">
          {new Array(10).fill("").map((_, idx) => (
            <tr key={idx} className="divide-x divide-gray-500">
              <td className="w-[60px] py-4 px-3 text-center">
                <div className="h-2 bg-slate-500 rounded"></div>
              </td>
              <td className="py-4 px-3 text-center">
                <div className="h-2 bg-slate-500 rounded"></div>
              </td>
              <td className="w-[80px] py-4 px-3 text-center">
                <div className="h-2 bg-slate-500 rounded"></div>
              </td>
              <td className="py-4 px-3 text-center">
                <div className="h-2 bg-slate-500 rounded"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeetcodeProblemsTableSkeleton;
