import { createLogger, format, transports } from "winston";
import path from "path";
import fs from "fs";

const logDir = "./logs";
if (fs.existsSync(logDir)) {
  fs.rmSync(logDir, { recursive: true, force: true });
}
fs.mkdirSync(logDir, { recursive: true });

const timestamp = new Date().toISOString().replace(/:/g, "-");
const logFileName = path.join(logDir, `wdio-${timestamp}.log`);

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: logFileName }),
  ],
});

export default logger;
