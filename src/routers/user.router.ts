import { Router } from "express";

import { usersController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validator/user.validator";

const router = Router();

router.get("/", usersController.getAll);

router.get(
    "/:id",
    commonMiddleware.IsIdValidate("id"),
    usersController.getById,
);

router.put(
    "/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.IsIdValidate("id"),
    commonMiddleware.ValidateBody(UserValidator.update),
    usersController.updateById,
);

router.delete(
    "/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.IsIdValidate("id"),
    usersController.deleteById,
);

export const userRouter = router;
