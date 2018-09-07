import * as express from 'express';
import { restRouter } from './api/rest/rest.router';
import { graphqlRouter } from "./api/graphql/graphql.router";

export const app: express.Application = express(); // express app

app.use('/api/rest', restRouter);

graphqlRouter.applyMiddleware({app, path: '/api/graphql'});

app.all("*", (req, res) => {
    res.json({nothingFound: true})
});