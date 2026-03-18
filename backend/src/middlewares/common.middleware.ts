import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { StatusCodesEnum } from "../enums/status-codes.enums.js";
import { ApiError } from "../errors/api.error.js";

class CommonMiddleware {
    public IsIdValidate(key: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const id = req.params.id;
                if (!isObjectIdOrHexString(id)) {
                    throw new ApiError(`${key} ${id} invalid`, 400);
                }
                next();
            } catch (e) {
                next(e);
            }
        };
    }

    public ValidateBody(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                req.body = await validator.validateAsync(req.body);
                next();
            } catch (e) {
                next(new ApiError(e.details[0].message, 400));
            }
        };
    }

    public IsFileExists() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                if (!req.file) {
                    throw new ApiError(
                        "No file uploaded",
                        StatusCodesEnum.BED_REQUEST,
                    );
                }
                next();
            } catch (e) {
                next(e);
            }
        };
    }

    public query(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                req.query = await validator.validateAsync(req.query);
                next();
            } catch (e) {
                next(new ApiError(e.details[0].message, 400));
            }
        };
    }
}
export const commonMiddleware = new CommonMiddleware();
