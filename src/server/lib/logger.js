const { createLogger, format, transports } = require("winston");
const { combine, timestamp, prettyPrint } = format;

const logger = createLogger({
  level: "debug",
  format: combine(timestamp(), prettyPrint()),
  transports: [new transports.Console()],
});

module.exports = logger;
