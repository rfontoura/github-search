import { ApolloServer, gql } from 'apollo-server';
import { UserSearchResult } from './types';
import { createGitHubApolloClient } from './gitHubClient';
import { searchUsers } from './services/github';
import { dateScalar } from './Scalars';

require('dotenv').config();

const typeDefs = gql`
    scalar Date

    type PageInfo {
        hasNextPage: Boolean!
        hasPreviousPage: Boolean!
        startCursor: String!
    }
    
    type StarredRepositories {
        totalCount: Int!
    }
    
    type UserInfo {
        avatarUrl: String
        bio: String
        company: String
        createdAt: Date!
        name: String
        starredRepositories: StarredRepositories!
    }

    type UserSearchResult {
        pageInfo: PageInfo!
        userCount: Int!
        wikiCount: Int!
        nodes: [UserInfo]!
    }
    
    type Query {
        searchUsers(query: String!): UserSearchResult!
    }
`;

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
