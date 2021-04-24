import { ApolloServer } from 'apollo-server';
import { SearchQueryParams, UserSearchResult } from './types';
import { createGitHubApolloClient } from './gitHubClient';
import { searchUsers } from './services/github';
import typeDefs from './graphql/typeDefs';
import { dateScalar } from './graphql/Scalars';

require('dotenv').config();

const apolloClient = createGitHubApolloClient();

const resolvers = {
    Date: dateScalar,
    Query: {
        async searchUsers(parent: any, params: SearchQueryParams): Promise<UserSearchResult> {
            return searchUsers(apolloClient, params);
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`==> Server ready at ${url}`);
});
