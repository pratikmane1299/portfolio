import { DatesFilterType, DifficultyEnum } from "./types";

export function calculateExperience(fromDate: string, toDate: string) {
  const fDate = new Date(fromDate);
  const tDate = new Date(toDate);

  const fromMonth = fDate.getFullYear() * 12 + fDate.getMonth();
  const toMonth = tDate.getFullYear() * 12 + tDate.getMonth();

  const internalInMonths = toMonth - fromMonth;

  const yearsOfExperience = Math.floor(internalInMonths) / 12;
  const monthsOfExperience = internalInMonths % 12;

  return `${yearsOfExperience >= 1
      ? `${yearsOfExperience.toFixed(0)} yr ${monthsOfExperience ? "," : ""}`
      : ""
    }${monthsOfExperience ? `${monthsOfExperience} m` : ""}`;
}

export function formatExperience(date: string) {
  const d = new Date(date);

  return d.toLocaleDateString("en", { month: "short", year: "numeric" });
}

export function getCurrentYear() {
  return new Date().getFullYear();
}

export function getGithubProfileUrl() {
  return `https://github.com/pratikmane1299/`;
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case DifficultyEnum.HARD:
      return "red";

    case DifficultyEnum.MEDIUM:
      return "yellow";

    default:
      return "green";
  }
}

export function paginate({
  page = 1,
  pageSize = 25,
  total,
  maxPages = 5,
}: {
  page: number;
  total: number;
  pageSize: number;
  maxPages?: number;
}) {
  const totalPages = Math.ceil(total / pageSize);

  if (page < 1) {
    page = 1;
  } else if (page > totalPages) {
    page = totalPages;
  }

  let startPage: number, endPage: number;

  if (totalPages <= maxPages) {
    startPage = 1;
    endPage = totalPages;
  } else {
    // total pages more than max so calculate start and end pages
    let maxPagesBeforepage = Math.floor(maxPages / 2);
    let maxPagesAfterpage = Math.ceil(maxPages / 2) - 1;
    if (page <= maxPagesBeforepage) {
      // current page near the start
      startPage = 1;
      endPage = maxPages;
    } else if (page + maxPagesAfterpage >= totalPages) {
      // current page near the end
      startPage = totalPages - maxPages + 1;
      endPage = totalPages;
    } else {
      // current page somewhere in the middle
      startPage = page - maxPagesBeforepage;
      endPage = page + maxPagesAfterpage;
    }
  }

  // calculate start and end item indexes
  let startIndex = (page - 1) * pageSize;
  let endIndex = Math.min(startIndex + pageSize - 1, total - 1);

  let pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
    (i) => startPage + i
  );

  return {
    previousPage: page - 1,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    hasNextPage: page < totalPages,
    pages,
  };
}

export function findFilter(
  filters: { slug: string; key: string }[],
  filter: string
) {
  if (filters.length === 0) return undefined;

  return filters.find((f) => f.slug === filter);
}

export function splitString(str: string, seperator = ",") {
  if (!str) return [];

  return str.split(seperator);
}

export function generateQueryHashKey(params: Record<string, any>) {
  if (params) {
    let hash = "";

    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key) && params[key]) {
        hash += `${key}=${params[key]}&`;
      }
    }

    return hash.replace(/&$/, "");
  }

  return "";
}

export function slugify(str: string) {
  str = str.trim();
  str = str.toLowerCase();

  str = str.replace(/[^a-z0-9 -]/gi, '')
  str = str.replace(/\s+/gi, '-')
  str = str.replace(/-+/gi, '-');

  return str;
}

export function formatDate(date: string) {
  const parsed = new Date(date);
  return parsed.toLocaleDateString('en-us', { month: 'short', year: 'numeric', day: '2-digit' })
}

export function parseFilterDate(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function getToDateAndFromDateFromDateFilter(filter: DatesFilterType) {
  let toDate = new Date(Date.now() + 1);
  let fromDate = new Date();

  switch (filter) {
    case "yesterday":
      fromDate.setDate(toDate.getDate() - 1);
      break;

    case "last-seven-days":
      fromDate.setDate(toDate.getDate() - 7);
      break;

    case "last-thirty-days":
      fromDate.setDate(toDate.getDate() - 30);
      break;

    default:
      break;
  }

  return {
    fromDate: `${parseFilterDate(fromDate)} 00:00:00`,
    toDate: `${parseFilterDate(toDate)} 23:59:59`,
  };
}
