import log from "pino";
import { format } from "date-fns";

export const logger = log({
  level: "debug",
  timestamp: () => `,"time":"${format(new Date())}"`,
  prettyPrint: {
    levelFirst: true,
  },
});
