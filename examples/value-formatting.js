const { Logger } = require('universal-logger-pro');

const logger = Logger.getInstance({
    colors: true,
    prettyPrint: true
});

// Demonstrate TypedArray formatting
const buffer = new Uint8Array([1, 2, 3, 4]);
logger.debug('Binary data', { buffer });

// Demonstrate Map/Set formatting
const userMap = new Map([
    ['id', '123'],
    ['name', 'John']
]);
const roleSet = new Set(['admin', 'user']);
logger.debug('Collections', { userMap, roleSet });

// Demonstrate Error formatting
try {
    throw new Error('Test error');
} catch (error) {
    logger.error('Error occurred', { error });
}

// Demonstrate custom object formatting
class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    toString() {
        return `User(${this.id}: ${this.name})`;
    }
}
logger.info('User created', { user: new User(1, 'John') });
