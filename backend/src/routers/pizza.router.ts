import { Router } from "express";

import { pizzaController } from "../controllers/pizza.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { commonMiddleware } from "../middlewares/common.middleware.js";
import { PizzaValidator } from "../validator/pizza.validator.js";

const router = Router();

router.get("/", authMiddleware.checkAccessToken, pizzaController.getAll);

router.post(
    "/",
    authMiddleware.checkAccessToken,
    commonMiddleware.ValidateBody(PizzaValidator.create),
    pizzaController.create,
);

export const pizzaRouter = router;
