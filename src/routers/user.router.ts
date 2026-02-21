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

router.get(
    "/:id",
    commonMiddleware.isIdValidate("id"),
    usersController.getById,
);

router.put(
    "/:id",
    commonMiddleware.isIdValidate("id"),
    commonMiddleware.validateBody(UserValidator.update),
    usersController.updateById,
);

router.delete(
    "/:id",
    commonMiddleware.isIdValidate("id"),
    usersController.deleteById,
);

export const userRouter = router;
