import winston from "winston";
import {format} from "morgan";
import {json} from "express";

const logger = winston.createLogger({
    level: 'http',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({level, message, timestamp}) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: './error.log'}),
    ]
});
export default logger;