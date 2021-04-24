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
    endCursor?: string;
    userCount: number;
    users: User[];
};

export type SearchUsersResultType = { searchUsers: UserSearchResult };

type SearchUserDirectionType = 'FORWARD' | 'BACKWARD';

export type SearchUsersParametersType = {
    query: string;
    direction?: SearchUserDirectionType;
    cursor?: string;
};

export const SEARCH_USERS = gql`
    query search($query: String!, $direction: String, $cursor: String) {
        searchUsers(query: $query, direction: $direction, cursor: $cursor) {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
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
