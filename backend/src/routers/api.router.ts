import { Router } from "express";

import { AuthRouter } from "./auth.router.js";
import { pizzaRouter } from "./pizza.router.js";
import { userRouter } from "./user.router.js";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", AuthRouter);
router.use("/pizzas", pizzaRouter);
export const apiRouter = router;
