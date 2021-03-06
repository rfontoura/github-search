import { gql } from 'apollo-server';

export default gql`
    scalar Date
    
    type User {
        id: String!
        name: String
        login: String!
        createdAt: String!
        email: String
        url: String
        avatarUrl: String
        bio: String
        company: String
        location: String
        isGitHubStar: Boolean
        followers: Int!
        following: Int!
        repositories: Int!
        starredRepositories: Int!
    }

    type UserSearchResult {
        hasNextPage: Boolean!
        hasPreviousPage: Boolean!
        startCursor: String
        endCursor: String
        userCount: Int!
        users: [User]!
    }
    
    type Query {
        searchUsers(query: String!, direction: String, cursor: String): UserSearchResult!
    }
`;