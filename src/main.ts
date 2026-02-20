import express from "express";
import mongoose from "mongoose";
import {config} from "./configs/config";
import {apiRouter} from "./routers/api.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

const dbConnection = async () => {
    let dbCon = false;
    while (!dbCon) {
        try {
            console.log('Connecting to DB...');
            await mongoose.connect(config.MONGO_URI)
            dbCon = true
            console.log('Database available');
        } catch (err) {
            console.log('Data base unavailable, wait 3 seconds');
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }
}

const start = async () => {
    try {
        await dbConnection();
        app.listen(config.PORT, () => {
            console.log(`Server listening on port ${config.PORT}`);
        })
    } catch (e) {
        console.log('Error',e.message);
    }
}
start();