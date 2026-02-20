import dotenv from "dotenv";

dotenv.config();

const config = {
    PORT: process.env.Port,
    MONGO_URI: process.env.MONGO_URI,
};
export { config };
