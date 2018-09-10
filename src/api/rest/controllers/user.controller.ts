import { Response, NextFunction } from 'express';
import { User } from "../../common/models/user.model";
import { UserRequest } from "../requests/user.request";


const mockUsers: User[] = [
    {
        username: "dummyuser1",
        firstName: "first1",
        lastName: "last1",
        age: 25
    },
    {
        username: "dummyuser2",
        firstName: "first2",
        lastName: "last2",
        age: 20
    }
]

export const userController = {
    getAllUsers(req: UserRequest, res: Response, next: NextFunction): void {
        res.status(200).json(mockUsers);
    },

    findUserByParam(req: UserRequest, res: Response, next: NextFunction, id: string): void {
        const result = mockUsers.findIndex(user => id === user.username);
        if(result === -1) {
            next(new Error('Not found error'));
        } else {
            req.userFromId = mockUsers[result];
            next();
        }
    },
    
    getUserById(req: UserRequest, res: Response, next: NextFunction): void {
        res.status(200).json(req.userFromId);
    }
}