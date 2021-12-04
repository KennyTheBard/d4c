import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
   level: 'debug',
   format: format.combine(
      format.splat(),
      format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
      format.colorize({
         level: true
      }),
      format.printf(
         info => `${info.level} [${info.timestamp}]: ${JSON.stringify(info.message, null, 2)}`
      )
   ),
   transports: [
      new transports.Console(),
   ],
});
