const { Logger } = require('universal-logger-pro');

const logger = Logger.getInstance({
    // Basic options
    colors: true,
    timestamp: true,
    prefix: 'API',
    
    // File logging
    outputFile: 'logs/app.log',
    maxSize: 5 * 1024 * 1024,
    rotate: true,
    rotateCount: 5,
    
    // Formatting
    format: 'json',
    
    // Global metadata
    metadata: {
        service: 'user-api',
        version: '1.0.0',
        environment: process.env.NODE_ENV
    }
});

// Different log types
logger.http('GET /api/users', { 
    duration: '120ms',
    status: 200 
});

logger.database('Query executed', {
    query: 'SELECT * FROM users',
    duration: '50ms',
    rows: 10
});

logger.security('Authentication attempt', {
    userId: '123',
    method: '2FA',
    success: true
}); 