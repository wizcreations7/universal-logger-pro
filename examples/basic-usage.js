const { Logger } = require('universal-logger-pro');

// Basic setup
const logger = Logger.getInstance({ colors: true });

// Standard log levels
logger.info('Application started');
logger.debug('Configuration loaded', { config: 'dev.json' });
logger.warn('Rate limit approaching', { current: 980, limit: 1000 });
logger.error('Failed to connect to database', { host: 'localhost' });

// With metadata
logger.info('User action', {
    userId: '123',
    action: 'login',
    timestamp: new Date()
}); 