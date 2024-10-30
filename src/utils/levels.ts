import { LogLevel, LogSeverity, LogTypeConfig } from '../types';

export const defaultLogLevels: Record<LogSeverity, number> = {
    trace: 0,
    debug: 1,
    info: 2,
    warn: 3,
    error: 4,
    fatal: 5
};

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

    // Map specialized types to appropriate severity levels
    http: 'info',
    request: 'info',
    response: 'info',
    graphql: 'info',
    websocket: 'info',
    api: 'info',

    security: 'warn',
    audit: 'info',
    auth: 'info',
    access: 'info',
    firewall: 'warn',

    database: 'info',
    query: 'debug',
    migration: 'info',
    cache: 'debug',

    performance: 'info',
    metric: 'info',
    benchmark: 'debug',
    memory: 'warn',

    system: 'info',
    process: 'info',
    cpu: 'info',
    disk: 'info',
    network: 'info',

    kubernetes: 'info',
    docker: 'info',
    cloud: 'info',
    serverless: 'info',

    // Business Logic
    business: 'info',
    transaction: 'info',
    workflow: 'info',
    event: 'info',

    // Integration
    integration: 'info',
    webhook: 'info',
    external: 'info',

    // User Interaction
    ui: 'info',
    interaction: 'info',
    analytics: 'info',
    tracking: 'info',

    // Background Tasks
    job: 'info',
    queue: 'info',
    cron: 'info',
    task: 'info',

    // Mobile Specific
    mobile: 'info',
    push: 'info',
    offline: 'info',
    sync: 'info',

    // Additional Standard Level
    success: 'info'
};
