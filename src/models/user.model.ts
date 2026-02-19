import {Schema, model} from "mongoose"
import {IUser} from "../interfaces/user.interface";

const userSchema = new Schema(
    {
        name: {type: String, required: true},
        surname: {type: String, required: true},
        age: {type: Number, required: true}
    },
    {timestamps: true, versionKey: false}
)

export const User = model<IUser>("User", userSchema);

// Schema (userSchema) → describes fields, types, and rules for a user (name, surname, age)
// Options → timestamps adds createdAt and updatedAt; versionKey: false removes __v
// Model (User) → the object used in code to create, find, update, and delete users in the users collection
// Schema = blueprint/validation, Model = tool to talk to DB