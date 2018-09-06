import * as express from 'express';
import { restRouter } from './api/rest/rest.router';

export const app: express.Application = express(); // express app
app.use('/api/rest', restRouter);
app.all("*", (req, res) => {
    res.json({nothingFound: true})
});