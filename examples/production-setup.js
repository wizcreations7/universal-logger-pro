const { Logger } = require('universal-logger-pro');

const logger = Logger.getInstance({
    // Disable colors in production
    colors: process.stdout.isTTY,
    
    // Use JSON format for structured logging
    format: 'json',
    timestamp: true,
    
    // File logging configuration
    outputFile: 'logs/app.log',
    rotate: true,
    maxSize: 100 * 1024 * 1024, // 100MB
    rotateCount: 7,             // Keep week's worth of logs
    compress: true,             // Compress old logs
    
    // Rich metadata for production context
    metadata: {
        app: process.env.APP_NAME,
        version: process.env.APP_VERSION,
        environment: process.env.NODE_ENV,
        region: process.env.AWS_REGION,
        instanceId: process.env.EC2_INSTANCE_ID
    }
});

// Example production logging
logger.info('Application started', {
    nodeVersion: process.version,
    memory: process.memoryUsage()
});

logger.metric('System health', {
    cpu: process.cpuUsage(),
    memory: process.memoryUsage(),
    uptime: process.uptime()
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    logger.fatal('Uncaught exception', { error });
    process.exit(1);
});

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
    logger.fatal('Unhandled rejection', { reason });
    process.exit(1);
}); 