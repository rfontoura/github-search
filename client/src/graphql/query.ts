import { gql } from '@apollo/client/core';

type PageInfo = {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
};

type StarredRepository = {
    totalCount: number;
};

type SearchResultNode = {
    avatarUrl: string;
    bio: string;
    company: string;
    createdAt: string;
    name: string;
    starredRepositories: StarredRepository[];
};

export type SearchResult = {
    pageInfo: PageInfo;
    userCount: number;
    wikiCount: number;
    nodes: SearchResultNode[];
};

export type SearchType = { search: SearchResult };
export const SEARCH_USERS = gql`
    query search($query: String!) {
        searchUsers(query: $query) {
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
            }
            userCount
            wikiCount
            nodes {
                avatarUrl
                bio
                company
                createdAt
                name
                starredRepositories {
                    totalCount
                }
            }
        }
    }
`;
