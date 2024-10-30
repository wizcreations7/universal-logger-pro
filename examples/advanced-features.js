const { Logger } = require('universal-logger-pro');

const logger = Logger.getInstance({
    // Advanced formatting
    timeFormat: 'locale',
    timeZone: 'America/New_York',
    indentation: 4,
    maskSecrets: true,
    maskFields: ['password', 'token'],
    
    // Performance options
    bufferSize: 1000,
    flushInterval: 5000,
    asyncLogging: true,
    
    // Development helpers
    debugMode: true,
    stackTraceLimit: 3,
    
    // Context provider
    contextProvider: () => ({
        requestId: Math.random().toString(36).substring(7),
        timestamp: new Date()
    })
});

// Demonstrate masked fields
logger.security('User login', {
    username: 'john',
    password: 'secret123',
    token: 'abc123'
});

// Demonstrate buffered logging
for (let i = 0; i < 100; i++) {
    logger.debug(`Message ${i}`);
}

// Demonstrate context provider
logger.info('Operation completed');
