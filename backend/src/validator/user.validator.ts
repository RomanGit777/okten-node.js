import joi from "joi";

import { RegexEnum } from "../enums/regex.enum.js";

export class UserValidator {
    private static email = joi.string().email().trim();
    private static password = joi.string().regex(RegexEnum.PASSWORD);
    private static nameSchema = joi.string().regex(RegexEnum.NAME);
    private static surname = joi.string().regex(RegexEnum.NAME);
    private static age = joi.number().min(2).max(100);

    public static create = joi.object({
        email: this.email.required(),
        password: this.password.required(),
        name: this.nameSchema.required(),
        surname: this.surname.required(),
        age: this.age.required(),
    });

    public static update = joi.object({
        name: this.nameSchema.required(),
        surname: this.surname.required(),
        age: this.age.required(),
    });
}
