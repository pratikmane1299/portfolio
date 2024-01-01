import { ReactElement } from "react";

export type LeetCodeProblemWidgetType = {
  id: number;
  number: number;
  title: string;
  slug: string;
};

export enum DifficultyEnum {
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard",
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
};

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

export type LeetcodeProblemDetailType = {
  id: number;
  number: number;
  title: string;
  description: string;
  code: string;
  difficulty: {
    level: string;
  };
  tags: LeetcodeTableProblemTagType[];
};

export type LeetcodeProblemsAllSlugsResType = {
  id: number;
  slug: string;
}[];

export type GithubReactionsBaseType = {
	url: string;
	total_count: number;
}

export type GithubEmojisType = {
  "+1": number;
  "-1": number;
  laugh: number;
  hooray: number;
  heart: number;
  confused: number;
  rocket: number;
  eyes: number;
};

export type GithubEmojisKeysType = keyof GithubEmojisType;

export type GithubReactionsType = GithubReactionsBaseType & GithubEmojisType;

export type GithubReactionsKeysType= keyof GithubReactionsType;

export type GithubIssueType = {
  title: string;
  body: string;
  id: number;
  user: {
    login: string;
    avatar_url: string;
    id: number;
  };
  labels: {
    name: string;
    id: number;
  }[];
  created_at: string;
  updated_at: string;
  reactions: GithubReactionsType;
	html_url: string;
	number: number;
};

export type BlogFrontMatterType = {
  title: string;
  description: string;
  tags: string;
  slug: string;
};

export type BlogReactionsType = GithubReactionsBaseType & { emojis: any };

export type BlogPostType = {
  frontmatter: BlogFrontMatterType;
  title: string;
  description?: string;
	issueNumber: number;
  content: string;
  compiledContent: ReactElement;
  slug: string;
  tags: string[];
  user: {
    login: string;
    avatarUrl: string;
    id: number;
  };
  createdAt: string;
  updatedAt: string;
  reactions: BlogReactionsType;
};
