type LogLevel = "info" | "warn" | "error" | "debug";

interface LoggerOptions {
  group?: string;
  level?: LogLevel;
}

class Logger {
  private isDevelopment: boolean;
  private group: string;

  constructor(group: string) {
    this.isDevelopment = process.env.NODE_ENV === "development";
    this.group = group;
  }

  private getPrefix(): string {
    return `[${this.group}] -`;
  }

  private log(level: LogLevel, ...args: unknown[]) {
    if (!this.isDevelopment && level === "debug") {
      return;
    }

    switch (level) {
      case "info":
        console.info(this.getPrefix(), ...args);
        break;
      case "warn":
        console.warn(this.getPrefix(), ...args);
        break;
      case "error":
        console.error(this.getPrefix(), ...args);
        break;
      case "debug":
        console.debug(this.getPrefix(), ...args);
        break;
    }
  }

  public info(...args: unknown[]) {
    this.log("info", ...args);
  }

  public warn(...args: unknown[]) {
    this.log("warn", ...args);
  }

  public error(...args: unknown[]) {
    this.log("error", ...args);
  }

  public debug(...args: unknown[]) {
    this.log("debug", ...args);
  }
}

// Logger Registry to manage logger instances
class LoggerRegistry {
  private static instance: LoggerRegistry;
  private loggers: Map<string, Logger>;

  private constructor() {
    this.loggers = new Map();
  }

  public static getInstance(): LoggerRegistry {
    if (!LoggerRegistry.instance) {
      LoggerRegistry.instance = new LoggerRegistry();
    }
    return LoggerRegistry.instance;
  }

  public getLogger(group: string): Logger {
    if (!this.loggers.has(group)) {
      this.loggers.set(group, new Logger(group));
    }
    return this.loggers.get(group)!;
  }
}

// Factory function to create/get logger instances
export const createLogger = (group: string): Logger => {
  return LoggerRegistry.getInstance().getLogger(group);
};

// Default logger instance
export const logger = createLogger("APP");

// Export types for TypeScript support
export type { LoggerOptions, LogLevel };
