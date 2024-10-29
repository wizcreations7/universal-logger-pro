



# Universal Logger Pro

A comprehensive logging solution for JavaScript/TypeScript projects with 40+ specialized log types, file rotation, and structured logging support. Perfect for web services, microservices, and enterprise applications.

## Features

- 🎨 Color-coded log levels
- 📝 File logging with rotation
- 🔄 Async file operations
- ⚙️ 40+ specialized log types
- 🏷️ Structured metadata
- 🔧 Runtime configuration
- 📦 TypeScript support
- 🚀 High performance
- 🌐 Works in any JavaScript environment

## Quick Start

````javascript
const { Logger } = require('universal-logger-pro');

// Basic setup
const logger = Logger.getInstance({ colors: true });
logger.info('Application started');

// Advanced setup with file logging
const logger = Logger.getInstance({
    colors: true,
    outputFile: 'app.log',
    maxSize: 5 * 1024 * 1024,  // 5MB
    rotate: true,
    rotateCount: 5,
    metadata: {
        app: 'api-service',
        env: 'production'
    }
});

// Console logs (sync)
logger.info('Server started on port 3000');
logger.warn('High memory usage detected');
logger.error('Database connection failed');

// File logs (async)
await logger.info('User login', { userId: '123' });
await logger.error(new Error('Connection failed'));
````


## Installation

````bash
npm install universal-logger-pro
# or
yarn add universal-logger-pro
````


## Configuration

### Basic Setup
````javascript
const logger = Logger.getInstance({
    // Essential options
    colors: true,                    // Enable colored output
    timestamp: true,                 // Include timestamps
    outputFile: 'app.log',          // Enable file logging
    rotate: true,                    // Enable log rotation
    maxSize: 5 * 1024 * 1024,       // 5MB rotation size
    
    // Optional features
    prefix: 'API',                   // Add prefix to logs
    silent: false,                   // Suppress all output
    format: 'json',                  // 'console' | 'json' | 'text'
    
    // Global context
    metadata: {
        service: 'auth-api',
        version: '1.2.0',
        node_env: process.env.NODE_ENV
    }
});
````


### Runtime Updates
````javascript
// Disable logging in tests
logger.updateOptions({ silent: process.env.NODE_ENV === 'test' });

// Change log format
logger.updateOptions({ format: 'json', timestamp: true });

// Update metadata
logger.updateOptions({
    metadata: {
        ...logger.options.metadata,
        deployed_at: new Date()
    }
});
````


## Log Types

### Standard Levels
````javascript
// Basic debugging and information
logger.trace('Detailed trace information');
logger.debug('Debugging information');
logger.info('General information');
logger.success('Operation successful');
logger.warn('Warning message');
logger.error('Error occurred');
logger.fatal('Fatal error');

// With metadata
logger.info('User logged in', { 
    userId: '123',
    ip: '192.168.1.1'
});
````


### Web & API
````javascript
logger.http('HTTP request received');
logger.request('Incoming request', { method: 'POST', path: '/api/users' });
logger.response('Response sent', { status: 200, duration: '123ms' });
logger.graphql('Query executed', { operation: 'GetUsers' });
logger.websocket('Client connected', { clientId: 'ws_123' });
logger.api('API call made', { endpoint: '/users', method: 'GET' });
````


### Security
````javascript
logger.security('Security check', { rule: 'rate-limit' });
logger.audit('User action', { user: 'admin', action: 'delete' });
logger.auth('Authentication', { userId: '123', method: '2FA' });
logger.access('Access granted', { resource: 'admin-panel' });
logger.firewall('Blocked request', { ip: '10.0.0.1', reason: 'rate-limit' });
````


### Database
````javascript
logger.database('DB connected', { host: 'localhost', port: 5432 });
logger.query('Query executed', { sql: 'SELECT *', duration: '50ms' });
logger.migration('Migration complete', { version: '1.2.0' });
logger.cache('Cache updated', { key: 'users', ttl: '5m' });
logger.transaction('Transaction committed', { id: 'tx_123' });
````


### Performance
````javascript
logger.performance('API latency', { endpoint: '/users', duration: '100ms' });
logger.metric('System metric', { cpu: '80%', memory: '60%' });
logger.benchmark('Test result', { operation: 'bulk-insert', rps: 1000 });
logger.memory('Memory usage', { heap: '80%', rss: '120MB' });
````


### System
````javascript
logger.system('System status', { uptime: '5d' });
logger.process('Process info', { pid: 123, memory: '500MB' });
logger.cpu('CPU usage', { load: '45%', cores: 8 });
logger.disk('Disk space', { free: '50GB', total: '500GB' });
logger.network('Network status', { in: '1MB/s', out: '500KB/s' });
````


### Business Logic
````javascript
logger.business('Order processed', { orderId: 'ord_123', amount: 99.99 });
logger.transaction('Payment received', { txId: 'tx_123', status: 'success' });
logger.workflow('Order fulfilled', { steps: ['payment', 'shipping'] });
logger.event('User registered', { userId: '123', plan: 'pro' });
````


### Infrastructure
````javascript
logger.kubernetes('Pod scaled', { replicas: 3, namespace: 'prod' });
logger.docker('Container started', { containerId: 'abc123', image: 'node:16' });
logger.cloud('AWS service', { service: 'S3', operation: 'upload' });
logger.serverless('Lambda executed', { function: 'processQueue', duration: '2s' });
````


### Mobile
````javascript
logger.mobile('App launched', { version: '2.0.0', platform: 'iOS' });
logger.push('Notification sent', { userId: '123', type: 'order_update' });
logger.offline('Offline mode', { queued_operations: 5 });
logger.sync('Data synchronized', { records: 100, duration: '5s' });
````


## Advanced Usage

### Error Handling
````javascript
try {
    throw new Error('Payment failed');
} catch (error) {
    logger.error('Payment processing failed', {
        error,
        orderId: 'ord_123',
        amount: 99.99,
        currency: 'USD'
    });
}
````


### TypeScript Support
````typescript
import { Logger, LoggerOptions, LogLevel } from 'universal-logger-pro';

interface CustomMetadata {
    requestId?: string;
    userId?: string;
    duration?: number;
}

const options: LoggerOptions = {
    colors: true,
    outputFile: 'app.log'
};

const logger = Logger.getInstance(options);
logger.info<CustomMetadata>('Request processed', {
    requestId: 'req_123',
    duration: 45
});
````


### Log Rotation
````javascript
const logger = Logger.getInstance({
    outputFile: 'app.log',
    maxSize: 1024 * 1024,  // 1MB
    rotate: true,
    rotateCount: 3,        // Keep 3 backup files
    compress: true         // Compress rotated files
});
````


### Production Best Practices
````javascript
const logger = Logger.getInstance({
    // Basic configuration
    colors: process.stdout.isTTY,    // Colors in dev, plain in prod
    format: 'json',                  // Structured logging in prod
    timestamp: true,
    
    // File handling
    outputFile: 'logs/app.log',
    rotate: true,
    maxSize: 100 * 1024 * 1024,     // 100MB
    
    // Production context
    metadata: {
        app: process.env.APP_NAME,
        version: process.env.APP_VERSION,
        environment: process.env.NODE_ENV,
        instance: process.env.INSTANCE_ID
    }
});
````


## Links

- [NPM Package](https://www.npmjs.com/package/universal-logger-pro)
- [Issues](https://github.com/wizcreations7/universal-logger-pro/issues)
- [Examples](https://github.com/wizcreations7/universal-logger-pro/tree/main/examples)

## License

MIT Licensed | Created by [@wizcreations7](https://github.com/wizcreations7)
