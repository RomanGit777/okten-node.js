import Router from "express";

import { authController } from "../controllers/auth.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validator/user.validator";

const router = Router();

router.post(
    "/sign-up",
    commonMiddleware.ValidateBody(UserValidator.create),
    authController.signUp,
);
router.post("/sign-in", authController.signIn);

export const AuthRouter = router;
