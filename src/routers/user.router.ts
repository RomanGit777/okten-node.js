import {Router} from "express";
import {usersController} from "../controllers/user.controller";

const router = Router();

router.get('/', usersController.getAll);

router.post('/', usersController.create);

router.get('/:id', usersController.getById);

router.put('/:id', usersController.updateById);

router.delete('/:id', usersController.deleteById);

export const userRouter = router;