import chalk from "chalk";
import { createLogger, format, transports } from "winston";

const ConsoleTransport = () => {
  const consoleFormat = format.printf(({ level, message }) => {
    let levelFormat = level.toUpperCase().charAt(0);
    levelFormat =
      level === "error"
        ? chalk.redBright(levelFormat)
        : level === "warn"
          ? chalk.yellowBright(levelFormat)
          : chalk.greenBright(levelFormat);
    return `[${levelFormat}] ${message}`;
  });

  const errorStackFormat = format((info) => {
    if (info.stack !== undefined) {
      info.message = `${info.message}\n${info.stack}`;
    }
    return info;
  });

  const Transport = new transports.Console({
    format: format.combine(
      format.prettyPrint(),
      errorStackFormat(),
      consoleFormat,
    ),
  });

  return Transport;
};

// TODO: Implement DiscordTransport

export const logger = createLogger({
  level: "info",
  transports: [ConsoleTransport()],
});
