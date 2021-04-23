import { gql } from '@apollo/client/core';

export type User = {
    id: string;
    name?: string;
    login: string;
    createdAt: string;
    email?: string;
    url?: string;
    location?: string;
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

export type SearchType = { search: UserSearchResult };
export const SEARCH_USERS = gql`
    query search($query: String!) {
        searchUsers(query: $query) {
            hasNextPage
            hasPreviousPage
            startCursor
            userCount
            users {
                id
                login
                name
                createdAt
                email
                url
                avatarUrl
                bio
                company
                isGitHubStar
                followers
                following
                repositories
                starredRepositories
            }
        }
    }
`;
