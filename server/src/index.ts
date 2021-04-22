import { ApolloServer } from 'apollo-server';
import { UserSearchResult } from './types';
import { createGitHubApolloClient } from './gitHubClient';
import { searchUsers } from './services/github';
import typeDefs from './graphql/typeDefs';
import { dateScalar } from './graphql/Scalars';

require('dotenv').config();

const apolloClient = createGitHubApolloClient();

const resolvers = {
    Date: dateScalar,
    Query: {
        async searchUsers(parent: any, { query }: { query: string }): Promise<UserSearchResult> {
            return searchUsers(apolloClient, query);
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`==> Server ready at ${url}`);
});
