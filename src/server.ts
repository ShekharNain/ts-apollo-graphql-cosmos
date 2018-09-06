import * as express from 'express';
import { restRouter } from './api/restRouter';
import { setupAppMiddleware } from "./api/middlewares/requestParserMiddleware";

export const app: express.Application = express(); // express app

setupAppMiddleware(app);

app.use('/api', restRouter);
app.all("*", (req, res) => {
    res.json({nothingFound: true})
});