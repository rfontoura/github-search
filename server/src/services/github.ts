import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import gql from 'graphql-tag';
import { SearchQueryParams, UserSearchResult } from '../types';

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
    location?: string;
    isGitHubStar: boolean;
    followers?: CountableEntity;
    following?: CountableEntity;
    repositories?: CountableEntity;
    starredRepositories?: CountableEntity;
};

type SearchResult = {
    pageInfo: PageInfo;
    userCount: number;
    nodes: UserNode[];
};

export const SEARCH_USERS_GQL = gql`
    query search($query: String!, $after: String, $before: String, $first: Int, $last: Int) {
        search(query: $query, type: USER, after: $after, before: $before, first: $first, last: $last) {
            pageInfo {
                endCursor
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
                    location
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

const getCountableTotalValue = (countable?: CountableEntity) => {
    return countable && countable.totalCount || 0;
};

const PAGE_SIZE = 48;

export const searchUsers = async (client: ApolloClient<NormalizedCacheObject>, params: SearchQueryParams): Promise<UserSearchResult> => {
    const { query, direction, cursor } = params;
    const options = {
        query: SEARCH_USERS_GQL,
        variables: {
            query,
            type: 'USER',
            after: undefined as undefined | string,
            before: undefined as undefined | string,
            first: (!direction || direction === 'FORWARD') && PAGE_SIZE || undefined,
            last: direction === 'BACKWARD' && PAGE_SIZE || undefined,
        },
    };

    if (direction && cursor) {
        if (direction === 'FORWARD') {
            options.variables.after = cursor;
        } else {
            options.variables.before = cursor;
        }
    }

    console.log('variables')

    const queryResult = await client.query<{ search: SearchResult }>(options);

    const data = queryResult.data.search;
    return {
        ...data.pageInfo,
        userCount: data.userCount,
        users: data.nodes
            .filter(user => !!user.id)
            .map((userInfo) => {
            const {
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
                location,
                followers,
                following,
                repositories,
                starredRepositories,
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
                location,
                isGitHubStar,
                followers: getCountableTotalValue(followers),
                following: getCountableTotalValue(following),
                repositories: getCountableTotalValue(repositories),
                starredRepositories: getCountableTotalValue(starredRepositories),
            };
        }),
    }
};