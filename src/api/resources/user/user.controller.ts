import { Request, Response, NextFunction } from 'express';
import { User } from "./user.model";
import { UserRequest } from "./user.request";


const mockUsers: User[] = [
    {
        id: "100",
        firstName: "first1",
        lastName: "last1",
        age: 25
    },
    {
        id: "101",
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
        const result = mockUsers.findIndex(user => id === user.id);
        if(result === -1) {
            next(new Error('Not found error'));
        } else {
            req.userFromId = mockUsers[result];
        }
    },
    
    getUserById(req: UserRequest, res: Response, next: NextFunction): void {
        res.status(200).json(req.userFromId);
    }
}