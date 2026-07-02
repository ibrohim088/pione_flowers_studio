type LogLevel = 'info' | 'warn' | 'error' | 'debug';

function format(level: LogLevel, ...args: unknown[]) {
  const time = new Date().toISOString();
  return [`[${time}] [${level.toUpperCase()}]`, ...args];
}

export const logger = {
  info: (...args: unknown[]) => console.log(...format('info', ...args)),
  warn: (...args: unknown[]) => console.warn(...format('warn', ...args)),
  error: (...args: unknown[]) => console.error(...format('error', ...args)),
  debug: (...args: unknown[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(...format('debug', ...args));
    }
  },
};
