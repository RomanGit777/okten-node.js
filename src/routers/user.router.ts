import { Router } from "express";

import { usersController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", usersController.getAll);

router.post(
    "/",
    commonMiddleware.validateBody(UserValidator.create),
    usersController.create,
);

router.get("/:id", usersController.getById);

router.put("/:id", usersController.updateById);

router.delete("/:id", usersController.deleteById);

export const userRouter = router;
