import { Router } from 'express';
import { userRouter } from './routers/user.router';
import { songRouter } from './routers/song.router';
import { playlistRouter } from './routers/playlist.router';

export const restRouter: Router = Router();
restRouter.use('/user', userRouter);
restRouter.use('/song', songRouter);
restRouter.use('playlist', playlistRouter);