import { User } from "../schema/user.schema";
import { Resolver, Query, Arg } from "type-graphql";

@Resolver(User)
export class UserResolver {

    @Query(returns => User)
    getUser() {
        return {
            id: "102",
            username: "dummyuser",
            firstname: "dummy",
            lastname: "user",
            createdAt: "xyz",
            updatedAt: "xyz"
        };
    }

}