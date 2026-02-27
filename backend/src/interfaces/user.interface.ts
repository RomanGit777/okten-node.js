import { RoleEnum } from "../enums/role.enums.js";
import { IBase } from "./base.interface.js";

interface IUser extends IBase {
    // represents DB document, responses to user
    _id: string;
    email: string;
    password: string;
    role: RoleEnum;
    isActive: boolean;
    isDeleted: boolean;
    isVerified: boolean;
    name: string;
    surname: string;
    age: number;
}

type IUserCreateDTO = Pick<
    IUser,
    "email" | "password" | "name" | "surname" | "age"
>; // create,update,delete

type IUserUpdateDTO = Pick<IUser, "name" | "surname" | "age">;

export type { IUser, IUserCreateDTO, IUserUpdateDTO };
