import { Router } from "express";

import { usersController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { commonMiddleware } from "../middlewares/common.middleware.js";
import { UserValidator } from "../validator/user.validator.js";

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

router.patch(
    "/:id/block",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    usersController.blockUser,
);

router.patch(
    "/:id/unblock",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    usersController.unBlockUser,
);
export const userRouter = router;
