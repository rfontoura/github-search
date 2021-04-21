import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, createHttpLink, NormalizedCacheObject } from '@apollo/client/core';
import gql from 'graphql-tag';
import fetch from 'cross-fetch';

export const createGitHubApolloClient = (): ApolloClient<NormalizedCacheObject> => {
    const httpLink = createHttpLink({
        uri: 'https://api.github.com/graphql',
        fetch,
    });

    const token = process.env.GH_TOKEN;
    if (!token) {
        throw Error('GitHub access not configured. Define the environment variable to provide authentication to the API.')
    }

    const authLink = setContext((_, { headers }) => {
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${token}`,
            }
        }
    });

    return new ApolloClient({
        name: 'Node',
        link: authLink.concat(httpLink), // Chain it with the HttpLink
        cache: new InMemoryCache(),
    });
}
