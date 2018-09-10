import { User } from "../schema/user.schema";
import { Resolver, Query, Arg } from "type-graphql";
import { DataContext } from "../../common/db/dataContext";

@Resolver(User)
export class UserResolver {

    constructor(protected dataContext: DataContext) {
    }

    @Query(returns => User)
    async getUser(@Arg("username") id: string) {
        const user = await this.dataContext.getUserById(id);
        return user;
    }

    @Query(returns => [User])
    async getAllUsers() {
        const users = await this.dataContext.getAllUsers();
        console.log(users);
        return users;
    }

}