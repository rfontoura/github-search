import { gql } from 'apollo-server';

export default gql`
    scalar Date

    type PageInfo {
        hasNextPage: Boolean!
        hasPreviousPage: Boolean!
        startCursor: String
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