import { Logger, LoggerOptions, LogLevel } from 'universal-logger-pro';

// Define custom metadata interfaces
interface UserMetadata {
    userId: string;
    email?: string;
    role?: string;
}

interface RequestMetadata {
    requestId: string;
    path: string;
    method: string;
    duration?: number;
}

// Configure logger with TypeScript
const options: LoggerOptions = {
    colors: true,
    timestamp: true,
    format: 'json',
    metadata: {
        service: 'user-service',
        version: '1.0.0'
    }
};

const logger = Logger.getInstance(options);

// Log with typed metadata
logger.info<UserMetadata>('User logged in', {
    userId: '123',
    email: 'user@example.com',
    role: 'admin'
});

logger.http<RequestMetadata>('Request processed', {
    requestId: 'req_123',
    path: '/api/users',
    method: 'GET',
    duration: 45
});

// Error handling with TypeScript
interface ErrorMetadata {
    code: number;
    details: string;
}

try {
    throw new Error('Operation failed');
} catch (error) {
    logger.error<ErrorMetadata>('Error occurred', {
        code: 500,
        details: error.message
    });
} 