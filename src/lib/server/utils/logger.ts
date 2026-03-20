export function createLogger(service: string) {
  return {
    info: (message: string, ...args: unknown[]) =>
      console.log(`[${service}] INFO: ${message}`, ...args),
    error: (message: string, ...args: unknown[]) =>
      console.error(`[${service}] ERROR: ${message}`, ...args),
    warn: (message: string, ...args: unknown[]) =>
      console.warn(`[${service}] WARN: ${message}`, ...args),
  };
}
