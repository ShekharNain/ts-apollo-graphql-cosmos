import { ObjectType, Field, ID, InputType } from "type-graphql";

@ObjectType()
export class User {

    @Field(type => ID)
    id: string;

    @Field()
    username: string;

    @Field()
    firstName: string;

    @Field({ nullable: true })
    lastName?: string;

    @Field()
    createdAt: string;

    @Field()
    updatedAt: string;
}

@InputType()
export class UpdatedUser {

    @Field()
    username: string;
}

// @ObjectType()
// export class Query {

//     @Field()
//     getMe: User;
// }