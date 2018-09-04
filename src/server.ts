import * as express from 'express';

export const app: express.Application = express(); // express app

app.get("/", (req, res) => {
    res.json({ok: true})
});