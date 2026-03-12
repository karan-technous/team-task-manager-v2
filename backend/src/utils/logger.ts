export const logger = {
  info: (message: string, data?: unknown) => {
    console.log(`[INFO] ${message}`, data ?? "");
  },

  warn: (message: string, data?: unknown) => {
    console.warn(`[WARN] ${message}`, data ?? "");
  },

  error: (message: string, data?: unknown) => {
    console.error(`[ERROR] ${message}`, data ?? "");
  },

  debug: (message: string, data?: unknown) => {
    if (process.env.NODE_ENV !== "production") {
      console.debug(`[DEBUG] ${message}`, data ?? "");
    }
  },
};
