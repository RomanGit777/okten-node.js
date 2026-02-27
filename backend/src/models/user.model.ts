import { model, Schema } from "mongoose";

import { RoleEnum } from "../enums/role.enums.js";
import { IUser } from "../interfaces/user.interface.js";

const userSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            role: RoleEnum,
            type: String,
            required: true,
            default: RoleEnum.USER,
        },
        name: { type: String, required: true },
        surname: { type: String, required: true },
        age: { type: Number, required: true },
        isActive: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
        isVerified: { type: Boolean, default: false },
    },
    { timestamps: true, versionKey: false },
);

export const User = model<IUser>("User", userSchema);

// Schema (userSchema) → describes fields, types, and rules for a user (name, surname, age)
// Options → timestamps adds createdAt and updatedAt; versionKey: false removes __v
// Model (User) → the object used in code to create, find, update, and delete users in the users collection
// Schema = blueprint/validation, Model = tool to talk to DB
