import express, {Express} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from "./router";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// resolve cors
app.use(cors({
    origin: process.env.CLIENT_APP_URL,
    credentials: true
}))

// to parse body
app.use(express.json())

// to parse cookies
app.use(cookieParser())

app.use('/api', router)


const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL!)

        app.listen(port,  () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
        });
    } catch (e) {
        console.log(e)
    }
}

start()

