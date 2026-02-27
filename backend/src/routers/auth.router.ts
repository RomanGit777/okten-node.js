import Router from "express";

import { authController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { commonMiddleware } from "../middlewares/common.middleware.js";
import { AuthValidator } from "../validator/auth.validator.js";
import { RecoveryValidator } from "../validator/recovery.validator.js";
import { UserValidator } from "../validator/user.validator.js";

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
router.patch("/activate/:token", authController.activate);
router.post(
    "/recovery",
    commonMiddleware.ValidateBody(RecoveryValidator.emailSchema),
    authController.passwordRecoveryRequest,
);
router.post(
    "/recovery/:token",
    commonMiddleware.ValidateBody(AuthValidator.validatePassword),
    authController.recoveryPassword,
);

export const AuthRouter = router;
