/**
 * @fileoverview Logging color and symbol configurations
 * @module LogColors
 * @description
 * Provides comprehensive color and symbol mappings for enhanced visual logging output.
 * Implements consistent visual styling across different log types and severity levels
 * to improve log readability and quick visual identification.
 */

import chalk from 'chalk';

/**
 * Color configuration mapping for different log types and severity levels
 * 
 * @description
 * Defines chalk color styles for each log type to provide consistent
 * visual differentiation in console output. The color scheme follows
 * common logging conventions:
 * 
 * - Error states (error, fatal): Red variants
 * - Warnings (warn, security): Yellow variants  
 * - Success/Good states (success, performance): Green variants
 * - Info/Normal states (info, debug): Blue/Cyan variants
 * - System/Infrastructure (system, kubernetes): Bold variants
 * - Specialized domains use appropriate semantic colors
 * 
 * @example
 * ```typescript
 * console.log(colors.error('Error message')); // Prints in red
 * console.log(colors.success('Success message')); // Prints in green
 * ```
 */
export const colors = {
    trace: chalk.gray,
    debug: chalk.blue,
    info: chalk.cyan,
    success: chalk.green,
    warn: chalk.yellow,
    error: chalk.red,
    fatal: chalk.bgRed.white,
    http: chalk.magenta,
    request: chalk.blue,
    response: chalk.cyan,
    graphql: chalk.magenta.bold,
    websocket: chalk.blue.bold,
    api: chalk.cyan.bold,
    security: chalk.bgYellow.black,
    audit: chalk.yellow.bold,
    auth: chalk.yellow,
    access: chalk.yellow,
    firewall: chalk.red.bold,
    database: chalk.blue.bold,
    query: chalk.blue,
    migration: chalk.blue,
    cache: chalk.cyan,
    performance: chalk.green.bold,
    metric: chalk.green,
    benchmark: chalk.green,
    memory: chalk.yellow,
    system: chalk.white.bold,
    process: chalk.white,
    cpu: chalk.yellow,
    disk: chalk.yellow,
    network: chalk.cyan,
    verbose: chalk.white,
    silly: chalk.magenta,
    test: chalk.blue,
    mock: chalk.gray,
    'debug-verbose': chalk.blue.dim,
    business: chalk.green.bold,
    transaction: chalk.green,
    workflow: chalk.blue,
    event: chalk.yellow,
    integration: chalk.magenta.bold,
    webhook: chalk.magenta,
    'third-party': chalk.blue,
    external: chalk.cyan,
    ui: chalk.cyan.bold,
    interaction: chalk.cyan,
    analytics: chalk.blue,
    tracking: chalk.yellow,
    job: chalk.blue.bold,
    queue: chalk.blue,
    cron: chalk.yellow,
    task: chalk.white,
    kubernetes: chalk.blue.bold,
    docker: chalk.blue,
    cloud: chalk.cyan,
    serverless: chalk.yellow,
    mobile: chalk.magenta.bold,
    push: chalk.magenta,
    offline: chalk.yellow,
    sync: chalk.green
};

/**
 * Symbol configuration mapping for different log types and severity levels
 * 
 * @description
 * Defines emoji symbols for each log type to provide quick visual identification
 * in console output. The symbols are carefully chosen to be:
 * 
 * - Semantically relevant to their log type
 * - Visually distinct and easily recognizable
 * - Compatible across different terminal environments
 * - Consistent with common logging conventions
 * 
 * Symbols help in:
 * - Quick visual scanning of logs
 * - Pattern recognition in log streams
 * - Improved log readability
 * - Clear status indication
 * 
 * @example
 * ```typescript
 * console.log(`${symbols.error} Error occurred`); // Prints "❌ Error occurred"
 * console.log(`${symbols.success} Operation completed`); // Prints "✅ Operation completed"
 * ```
 */
export const symbols = {
    trace: '🔍',
    debug: '🐛',
    info: 'ℹ️',
    success: '✅',
    warn: '⚠️',
    error: '❌',
    fatal: '💀',
    http: '🌐',
    request: '📤',
    response: '📥',
    graphql: '⚡',
    websocket: '🔌',
    api: '🚀',
    security: '🔒',
    audit: '📝',
    auth: '🔑',
    access: '🚪',
    firewall: '🛡️',
    database: '🗄️',
    query: '📊',
    migration: '🔄',
    cache: '💾',
    performance: '⚡',
    metric: '📊',
    benchmark: '🏃',
    memory: '🧠',
    system: '🖥️',
    process: '⚙️',
    cpu: '📈',
    disk: '💿',
    network: '🌐',
    verbose: '📝',
    silly: '🤪',
    test: '🧪',
    mock: '🎭',
    'debug-verbose': '🔬',
    business: '💼',
    transaction: '💰',
    workflow: '📑',
    event: '🎯',
    integration: '🔄',
    webhook: '🪝',
    'third-party': '🤝',
    external: '🌍',
    ui: '👤',
    interaction: '🖱️',
    analytics: '📈',
    tracking: '👀',
    job: '⚡',
    queue: '📋',
    cron: '⏰',
    task: '✔️',
    kubernetes: '☸️',
    docker: '🐳',
    cloud: '☁️',
    serverless: '⚡',
    mobile: '📱',
    push: '🔔',
    offline: '📴',
    sync: '🔄'
};