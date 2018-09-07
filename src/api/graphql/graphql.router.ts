import "reflect-metadata";
import { buildSchemaSync, useContainer } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { UserResolver } from "./resolvers/user.resolver";
import { Container } from "typedi";

useContainer(Container);

const schema = buildSchemaSync({
    resolvers: [UserResolver]
});

export const graphqlRouter = new ApolloServer({schema});
