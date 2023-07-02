export type LeetCodeProblemWidgetType = {
  id: number;
  number: number;
  title: string;
  slug: string;
};

export enum DifficultyEnum {
  EASY = 'Easy',
	MEDIUM = 'Medium',
	HARD = 'Hard',
}

export type LeetcodeTableProblemTagType = {
  tag: {
    id: number;
    name: string;
  };
};

export type LeetcodeTableProblemType = {
	id: number;
  number: number;
  title: string;
  slug: string;
  difficulty: {
    level: string;
  };
  tags: LeetcodeTableProblemTagType[];
}

export type LeetCodeTableProblemsResType = {
  total: number;
  problems: LeetcodeTableProblemType[];
};

export type DifficultType = {
  id: number;
  level: string;
  slug: string;
};

export type TagType = {
	id: number;
	name: string;
	slug: string;
};
