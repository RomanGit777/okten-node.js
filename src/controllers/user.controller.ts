import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enums";
import { IUserCreateDTO, IUserUpdateDTO } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UsersController {
    public async getAll(req: Request, res: Response) {
        const data = await userService.getAll();
        res.status(StatusCodesEnum.OK).json(data);
    }
    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body as IUserCreateDTO;
            const data = await userService.create(user);
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }
    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const data = await userService.getById(id);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }
    public async updateById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body as IUserUpdateDTO;
            const id = req.params.id as string;
            const data = await userService.updateById(id, user);
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }
    public async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            await userService.deleteById(id);
            res.status(StatusCodesEnum.NO_CONTENT).end();
        } catch (e) {
            next(e);
        }
    }
}

export const usersController = new UsersController();
