import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import gql from 'graphql-tag';
import { UserSearchResult } from '../types';

type PageInfo = {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
};

type CountableEntity = {
    totalCount: number;
}

type UserNode = {
    id: string;
    login: string;
    url: string;
    createdAt: string;
    name?: string;
    email?: string;
    avatarUrl?: string;
    bio?: string;
    company?: string;
    isGitHubStar: boolean;
    followers: CountableEntity;
    following: CountableEntity;
    repositories: CountableEntity;
    starredRepositories: CountableEntity;
};

type SearchResult = {
    pageInfo: PageInfo;
    userCount: number;
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
            nodes {
                ... on User {
                    id
                    login
                    url
                    avatarUrl
                    bio
                    company
                    createdAt
                    name
                    email
                    isGitHubStar
                    followers {
                      totalCount
                    }
                    following {
                      totalCount
                    }
                    repositories {
                      totalCount
                    }
                    starredRepositories {
                      totalCount
                    }
                }
            }
        }
    }
`;


export const searchUsers = async (client: ApolloClient<NormalizedCacheObject>, query: String): Promise<UserSearchResult> => {
    const queryResult = await client.query<{ search: SearchResult }>({
        query: SEARCH_USERS_GQL,
        variables: {
            query,
            type: 'USER',
            first: 20,
        },
    });

    const data = queryResult.data.search;
    return {
        ...data.pageInfo,
        userCount: data.userCount,
        users: data.nodes.map((userInfo) => {
            const {
                id, login, url, avatarUrl, bio, company, createdAt, name, email, isGitHubStar,
                followers: {
                    totalCount: followers,
                },
                following: {
                    totalCount: following,
                },
                repositories: {
                    totalCount: repositories,
                },
                starredRepositories: {
                    totalCount: starredRepositories,
                },
            } = userInfo;
            return {
                id,
                login,
                url,
                avatarUrl,
                bio,
                company,
                createdAt,
                name,
                email,
                isGitHubStar,
                followers,
                following,
                repositories,
                starredRepositories,
            };
        }),
    }
};