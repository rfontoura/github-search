const { GraphQLScalarType, Kind } = require('graphql');

export const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value: string): string {
        console.log('serialize', typeof value, value)
        return value;
    },
    parseValue(value: string): Date {
        console.log('parseValue', typeof value, value)
        return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast: { kind: any; value: string; }) {
        if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
        }
        return null; // Invalid hard-coded value (not an integer)
    },
});
