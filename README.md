# Universal Logger Pro

A comprehensive, feature-rich logging solution for any JavaScript/TypeScript project. Designed to provide detailed, color-coded logging capabilities across various development contexts including web, mobile, infrastructure, security, and more.

## Features

- 🎨 Color-coded log levels for better visibility
- ⚙️ 40+ specialized log types
- 🗂️ Metadata support for structured logging
- ⚡ High performance
- 🔷 TypeScript support
- 🛠️ Highly configurable
- 🌐 Support for any JavaScript environment

## Installation```bash
npm install universal-logger-pro
```

```bash
yarn add universal-logger-pro
```

## Quick Start

```javascript
const { Logger } = require('universal-logger-pro');

const logger = Logger.getInstance({
    colors: true
});

logger.info('Application started');
logger.error('Something went wrong');
logger.success('Operation completed');
```

## Configuration Options

```javascript
const logger = Logger.getInstance({
    colors: true,          // Enable/disable colors
    timestamp: true,       // Show timestamps
    prefix: 'APP',         // Add a prefix to all logs
    format: 'console',     // 'console' | 'json' | 'text'
    metadata: {            // Global metadata
        environment: 'production',
        version: '1.0.0'
    }
});
```

## Log Types

### Standard Levels

```javascript
logger.trace('Detailed trace information');
logger.debug('Debugging information');
logger.info('General information');
logger.success('Operation successful');
logger.warn('Warning message');
logger.error('Error occurred');
logger.fatal('Fatal error');
```

### Web & API

```javascript
logger.http('HTTP request received');
logger.request('Incoming request');
logger.response('Response sent');
logger.graphql('Query executed');
logger.websocket('Client connected');
logger.api('API call made');
```

### Security

```javascript
logger.security('Security check');
logger.audit('User action');
logger.auth('Authentication');
logger.access('Access granted');
logger.firewall('Blocked request');
```

### Database

```javascript
logger.database('DB connected');
logger.query('Query executed');
logger.migration('Migration complete');
logger.cache('Cache updated');
```

### Performance

```javascript
logger.performance('Response time');
logger.metric('System metric');
logger.benchmark('Test result');
logger.memory('Memory usage');
```

### System

```javascript
logger.system('System status');
logger.process('Process info');
logger.cpu('CPU usage');
logger.disk('Disk space');
logger.network('Network status');
```

### Business Logic

```javascript
logger.business('Business event');
logger.transaction('Transaction processed');
logger.workflow('Workflow step');
logger.event('Event occurred');
```

### Infrastructure

```javascript
logger.kubernetes('K8s status');
logger.docker('Container info');
logger.cloud('Cloud service');
logger.serverless('Function executed');
```

### Mobile

```javascript
logger.mobile('App event');
logger.push('Notification sent');
logger.offline('Offline mode');
logger.sync('Data synced');
```

## Using Metadata

Add context to your logs with metadata:

```javascript
logger.info('User logged in', {
    userId: '123',
    ip: '192.168.1.1',
    browser: 'Chrome'
});
```

## Error Logging
Automatically handles Error objects:

```javascript
try {
    throw new Error('Something went wrong');
} catch (error) {
    logger.error(error);
}
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

For issues and feature requests, please create an issue on [GitHub](https://github.com/wizcreations7/universal-logger-pro/issues).

---

Created with ❤️ by [@wizcreations7](https://github.com/wizcreations7)

