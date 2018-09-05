import { Router } from 'express';
import { userRouter } from './resources/user/user.restRouter';
import { songRouter } from './resources/song/song.restRouter';
import { playlistRouter } from './resources/playlist/playlist.restRouter';

export const restRouter: Router = Router();
restRouter.use('/user', userRouter);
restRouter.use('/song', songRouter);
restRouter.use('playlist', playlistRouter);