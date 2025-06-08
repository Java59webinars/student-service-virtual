import dotenv from "dotenv";
import express from 'express';
import mongoose from "mongoose";
import studentRoutes from "./routes/studentRoutes.js";
import morgan from "morgan";
import logger from "./logger/logger.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
const port = 8080;
const stream = {
    write: (message) => logger.http(message)
}
app.use(morgan('combined', {stream}));
app.use(express.json());
app.use(studentRoutes);
app.use((req, res) => {
    res.status(404).type('text/plain; charset=utf-8').send('Not Found');
})

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'java59'
        });
        logger.info("Connected to MongoDB");
        app.listen(port, () => {
            logger.info(`Server started on port ${port}. Press Ctrl-C to finish`);
        })
    } catch (err) {
        logger.error('Failed to connect to MongoDB', err);
    }
}

startServer();

