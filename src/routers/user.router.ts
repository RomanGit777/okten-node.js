import { Router } from "express";

import { usersController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validator/user.validator";

const router = Router();

router.get("/", usersController.getAll);

router.post(
    "/",
    commonMiddleware.ValidateBody(UserValidator.create),
    usersController.create,
);

router.get(
    "/:id",
    commonMiddleware.IsIdValidate("id"),
    usersController.getById,
);

router.put(
    "/:id",
    commonMiddleware.IsIdValidate("id"),
    commonMiddleware.ValidateBody(UserValidator.update),
    usersController.updateById,
);

router.delete(
    "/:id",
    commonMiddleware.IsIdValidate("id"),
    usersController.deleteById,
);

export const userRouter = router;
