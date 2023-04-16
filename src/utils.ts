export function calculateExperience(fromDate: string, toDate: string) {
	const fDate = new Date(fromDate);
	const tDate = new Date(toDate);	

	const fromMonth = fDate.getFullYear() * 12 + fDate.getMonth();
	const toMonth = tDate.getFullYear() * 12 + tDate.getMonth();

	const internalInMonths = toMonth - fromMonth;

	const yearsOfExperience = Math.floor(internalInMonths) / 12;
	const monthsOfExperience = internalInMonths % 12;

	return `${yearsOfExperience >= 1 ? `${yearsOfExperience} yr ${monthsOfExperience ? ',' : ''}` : ""}${
    monthsOfExperience ? `${monthsOfExperience} m` : ""
  }`;
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
