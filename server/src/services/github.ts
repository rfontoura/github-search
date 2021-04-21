import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import gql from 'graphql-tag';

type PageInfo = {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
};

type StarredRepositories = {
    totalCount: number;
};

type UserNode = {
    avatarUrl?: string;
    bio?: string;
    company?: string;
    createdAt: Date;
    name: string;
    starredRepositories: StarredRepositories;
};

type SearchResult = {
    pageInfo: PageInfo;
    userCount: number;
    wikiCount: number;
    nodes: UserNode[];
};

export const SEARCH_USERS_GQL = gql`
    query search($query: String!) {
        search(query: $query, type: USER, first: 50) {
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
            }
            userCount
            wikiCount
            nodes {
                ... on User {
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
    }
`;


export const searchUsers = async (client: ApolloClient<NormalizedCacheObject>, query: String): Promise<SearchResult> => {
    const result = await client.query<{ search: SearchResult }>({
        query: SEARCH_USERS_GQL,
        variables: {
            query,
            type: 'USER',
            first: 20,
        },
    });

    return result?.data?.search;
};