const { Logger } = require('universal-logger-pro');

const logger = Logger.getInstance({
    colors: true,
    format: 'json'
});

// Basic error logging
try {
    throw new Error('Something went wrong');
} catch (error) {
    logger.error('Operation failed', { error });
}

// Custom error with metadata
class PaymentError extends Error {
    constructor(message, paymentDetails) {
        super(message);
        this.name = 'PaymentError';
        this.paymentDetails = paymentDetails;
    }
}

try {
    throw new PaymentError('Payment declined', {
        orderId: 'ord_123',
        amount: 99.99,
        currency: 'USD'
    });
} catch (error) {
    logger.error('Payment processing failed', {
        error,
        ...error.paymentDetails
    });
}

// Async error handling
async function processOrder() {
    try {
        // Simulate async operation
        await Promise.reject(new Error('Stock unavailable'));
    } catch (error) {
        await logger.error('Order processing failed', {
            error,
            orderId: 'ord_123'
        });
    }
} 