import { Router } from "express";

import { AuthRouter } from "./auth.router";
import { userRouter } from "./user.router";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", AuthRouter);

export const apiRouter = router;
