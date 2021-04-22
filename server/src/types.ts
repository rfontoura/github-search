export type User = {
    id: string;
    name?: string;
    login: string;
    createdAt: string;
    email?: string;
    url?: string;
    avatarUrl?: string;
    bio?: string;
    company?: string;
    isGitHubStar: boolean;
    followers: number;
    following: number;
    repositories: number;
    starredRepositories: number;
};

export type UserSearchResult = {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    userCount: number;
    users: User[];
};
