export type PageInfo = {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
};

export type StarredRepositories = {
    totalCount: number;
};

export type UserInfo = {
    avatarUrl?: string;
    bio?: string;
    company?: string;
    createdAt: Date;
    name?: string;
    starredRepositories: StarredRepositories;
};

export type UserSearchResult = {
    pageInfo: PageInfo;
    userCount: number;
    nodes: UserInfo[];
};
