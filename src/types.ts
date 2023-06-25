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

export type LeetCodePageProblemType = {
  id: number;
  number: number;
  title: string;
  slug: string;
  difficulty: {
    level: DifficultyEnum;
  };
  tags: {
    tag: {
      id: number;
      name: string;
    };
  }[];
};
