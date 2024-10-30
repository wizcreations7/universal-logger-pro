/**
 * @fileoverview Logging level configurations and severity mappings
 * @module LogLevels
 * @description
 * Provides comprehensive logging level definitions and mappings for applications.
 * Implements industry standard severity levels while supporting specialized logging categories
 * across different domains of systems.
 */

import { LogLevel, LogSeverity, LogTypeConfig } from '../types';

/**
 * Standard severity level definitions with numeric priority values.
 * Follows widely adopted logging conventions from logging frameworks.
 * 
 * @remarks
 * Lower numbers indicate higher verbosity/lower severity:
 * - trace (0): Most granular logging level for detailed troubleshooting
 * - debug (1): Development-time debugging information
 * - info (2): General operational messages
 * - warn (3): Warning conditions that should be reviewed
 * - error (4): Error conditions that require attention
 * - fatal (5): Critical failures requiring immediate action
 */
export const defaultLogLevels: Record<LogSeverity, number> = {
    trace: 0,
    debug: 1,
    info: 2,
    warn: 3,
    error: 4,
    fatal: 5
};

/**
 * Comprehensive mapping of specialized log types to standard severity levels.
 * Enables granular logging categories while maintaining consistent severity classification.
 * 
 * @remarks
 * Organized by functional domains including:
 * - Development & Debugging
 * - API & Web Services
 * - Security & Access Control
 * - Data & Storage
 * - Performance & Metrics
 * - System & Infrastructure
 * - Business Logic & Workflows
 * - Integration & External Systems
 * - User Interface & Analytics
 * - Background Processing
 * - Mobile & Offline Capabilities
 * 
 * @example
 * ```typescript
 * // Using specialized log types
 * logger.database('Query executed', { queryId: '123' }); // Maps to 'info' severity
 * logger.security('Invalid access attempt', { ip: '1.2.3.4' }); // Maps to 'warn' severity
 * logger.performance('Slow operation detected', { duration: 1500 }); // Maps to 'info' severity
 * ```
 */
export const defaultTypeMapping: Record<LogLevel, LogSeverity> = {
    // Standard levels map to themselves
    trace: 'trace',
    debug: 'debug',
    info: 'info',
    warn: 'warn',
    error: 'error',
    fatal: 'fatal',

    // Development & Debug
    verbose: 'debug',
    silly: 'trace',
    test: 'debug',
    mock: 'debug',

    // API & Web Services
    http: 'info',
    request: 'info',
    response: 'info',
    graphql: 'info',
    websocket: 'info',
    api: 'info',

    // Security & Access Control
    security: 'warn',
    audit: 'info',
    auth: 'info',
    access: 'info',
    firewall: 'warn',

    // Data & Storage
    database: 'info',
    query: 'debug',
    migration: 'info',
    cache: 'debug',

    // Performance & Metrics
    performance: 'info',
    metric: 'info',
    benchmark: 'debug',
    memory: 'warn',

    // System & Infrastructure
    system: 'info',
    process: 'info',
    cpu: 'info',
    disk: 'info',
    network: 'info',

    // Cloud & Containers
    kubernetes: 'info',
    docker: 'info',
    cloud: 'info',
    serverless: 'info',

    // Business Logic & Workflows
    business: 'info',
    transaction: 'info',
    workflow: 'info',
    event: 'info',

    // Integration & External Systems
    integration: 'info',
    webhook: 'info',
    external: 'info',

    // User Interface & Analytics
    ui: 'info',
    interaction: 'info',
    analytics: 'info',
    tracking: 'info',

    // Background Processing
    job: 'info',
    queue: 'info',
    cron: 'info',
    task: 'info',

    // Mobile & Offline Capabilities
    mobile: 'info',
    push: 'info',
    offline: 'info',
    sync: 'info',

    // Additional Types
    success: 'info'
};
