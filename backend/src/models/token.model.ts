import { model, Schema } from "mongoose";

import { IToken } from "../interfaces/token.interface.js";
import { User } from "./user.model.js";

const tokenSchema = new Schema(
    {
        accessToken: { type: String, required: true },
        refreshToken: { type: String, required: true },
        _userId: { type: Schema.Types.ObjectId, required: true, ref: User },
    },
    { timestamps: true, versionKey: false },
);
export const Token = model<IToken>("Token", tokenSchema);
