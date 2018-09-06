import { Router } from 'express';
import { userController } from '../controllers/user.controller';

export const userRouter: Router = Router();

// This act as a middleware and inject the userById inside request and pass the request down 
userRouter.param('id', userController.findUserByParam);

userRouter.route('/')
    .get(userController.getAllUsers);

userRouter.route('/:id')
    .get(userController.getUserById);

userRouter.all('*', (req, res) => {
    res.json({noUser: true});
})
