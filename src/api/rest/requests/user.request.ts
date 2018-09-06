import { Request } from "express";
import { User } from "../../common/models/user.model";

export interface UserRequest extends Request {
    userFromId: User
}