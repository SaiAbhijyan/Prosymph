// Conditional Fastify logger config: pretty in dev, JSON in prod.
const isProd =
  process.env.NODE_ENV === 'production' ||
  !!process.env.RENDER ||               // Render sets this
  process.env.CI === 'true';

export const fastifyLogger = isProd
  ? { level: 'info' } // plain JSON (no transport) so it works without pino-pretty
  : {
      level: 'debug',
      transport: {
        target: 'pino-pretty',
        options: { colorize: true, singleLine: true }
      }
    };
