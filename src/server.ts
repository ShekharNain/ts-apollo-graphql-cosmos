import * as express from 'express';
import { restRouter } from './api/restRouter';

export const app: express.Application = express(); // express app
app.use('/api', restRouter);
app.all("*", (req, res) => {
    res.json({nothingFound: true})
});