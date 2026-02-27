import { Router } from "express";

import { AuthRouter } from "./auth.router.js";
import { userRouter } from "./user.router.js";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", AuthRouter);

export const apiRouter = router;
