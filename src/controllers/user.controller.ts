import {Request, Response} from "express"
import {userService} from "../services/user.service";
import {IUserDTO} from "../interfaces/user.interface";
import {StatusCodesEnum} from "../enums/status-codes.enums";

class UsersController {
    public async getAll(req: Request, res: Response){
        const data = await userService.getAll();
        res.status(StatusCodesEnum.OK).json(data)
    }
    public async create(req: Request, res: Response){
        const user = req.body as IUserDTO;
        const data = await userService.create(user);
        res.status(StatusCodesEnum.CREATED).json(data)
    }
    public async getById(req: Request, res: Response){
        const id = req.params.id as string;
        const data = await userService.getById(id);
        res.status(StatusCodesEnum.OK).json(data);
    }
    public async updateById(req: Request, res: Response){
        const user = req.body as IUserDTO;
        const id = req.params.id as string;
        const data = await userService.updateById(id, user);
        res.status(StatusCodesEnum.CREATED).json(data)
    }
    public async deleteById(req: Request, res: Response){
        const id = req.params.id as string;
        await userService.deleteById(id);
        res.status(StatusCodesEnum.NO_CONTENT).end()
    }
}

export const usersController = new UsersController();