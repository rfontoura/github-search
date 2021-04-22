const { GraphQLScalarType, Kind } = require('graphql');

export const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value: Date): string {
        if (value) {
            return value.toISOString();
        }
        return value;
    },
    parseValue(value: string): Date {
        return new Date(value);
    },
    parseLiteral(ast: { kind: any; value: string; }) {
        if (ast.kind === Kind.STRING) {
            return new Date(ast.value);
        }
        return null; // Invalid hard-coded value (not a string)
    },
});
