import Router from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { AuthValidator } from "../validator/auth.validator";
import { UserValidator } from "../validator/user.validator";

const router = Router();

router.post(
    "/sign-up",
    commonMiddleware.ValidateBody(UserValidator.create),
    authController.signUp,
);
router.post("/sign-in", authController.signIn);
router.post(
    "/refresh",
    commonMiddleware.ValidateBody(AuthValidator.refreshToken),
    authMiddleware.checkRefreshToken,
    authController.refresh,
);
router.get("/me", authMiddleware.checkAccessToken, authController.me);

export const AuthRouter = router;
