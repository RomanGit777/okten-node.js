/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import path from "node:path";

import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { config } from "./configs/config.js";
import { swaggerDocument, swaggerUI } from "./configs/swagger.config";
import { cronRunner } from "./crons";
import { ApiError } from "./errors/api.error.js";
import { apiRouter } from "./routers/api.router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Or for dev, allow all:
// app.use(cors());

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "http://localhost:3001",
            "http://127.0.0.1:3000",
        ],
    }),
);
app.use("/media", express.static(path.join(process.cwd(), "upload")));

app.use("/", apiRouter);
// Error handling middleware - MUST come after route handlers
app.use(
    "*",
    (err: ApiError, req: Request, res: Response, next: NextFunction) => {
        const status = err.status || 500;
        const message = err.message ?? "Something went wrong";
        res.status(status).json({ status, message });
    },
);

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception", err);
    process.exit(1);
});

const dbConnection = async () => {
    let dbCon = false;
    while (!dbCon) {
        try {
            console.log("Connecting to DB...");
            await mongoose.connect(config.MONGO_URI);
            dbCon = true;
            console.log("Database available");
        } catch (e) {
            console.log("Data base unavailable, wait 3 seconds");
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }
};

const start = async () => {
    try {
        await dbConnection();
        app.listen(config.PORT, async () => {
            console.log(`Server listening on port ${config.PORT}`);
            await cronRunner();
        });
    } catch (e) {
        console.log("Error", e.message);
    }
};
start();
