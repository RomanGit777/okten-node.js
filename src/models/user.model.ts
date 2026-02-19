// Schema → Mongoose class used to define the structure of a document in a MongoDB collection.
//     model → function to create a model from a schema, which you can use to read/write to MongoDB.
//     IUser → a TypeScript interface that defines the shape of a user object, for type safety.

import {Schema, model} from "mongoose";
import {IUser} from "../interfaces/user.interface";

const userSchema = new Schema (
    {
        name:{type:String, required: true},
        surname:{type:String, required: true},
        age:{type:Number,required: true}
    },
    {timestamps: true, versionKey: false}
);

// model<IUser> → creates a Mongoose model for the User collection, typed with IUser in TypeScript.
//     "User" → the name of the MongoDB collection (Mongoose converts it to "users" by default).
// userSchema → the schema that defines the structure of the documents in the collection.
//     export const User → allows you to import this model elsewhere to query the DB.
export const User = model<IUser>("User", userSchema);