export type LogSeverity = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

// Keep existing LogLevel type for backwards compatibility
export type LogLevel = LogSeverity | 
    // Development & Debug
    'verbose' | 'silly' | 'test' | 'mock' |
    // API & Web
    'http' | 'request' | 'response' | 'graphql' | 'websocket' | 'api' |
    // Security
    'security' | 'audit' | 'auth' | 'access' | 'firewall' |
    // Data
    'database' | 'query' | 'migration' | 'cache' |
    // Performance
    'performance' | 'metric' | 'benchmark' | 'memory' |
    // System
    'system' | 'process' | 'cpu' | 'disk' | 'network' |
    // Infrastructure  
    'kubernetes' | 'docker' | 'cloud' | 'serverless' |
    // Business
    'business' | 'transaction' | 'workflow' | 'event' |
    // Integration
    'integration' | 'webhook' | 'external' |
    // UI
    'ui' | 'interaction' | 'analytics' | 'tracking' |
    // Background
    'job' | 'queue' | 'cron' | 'task' |
    // Mobile
    'mobile' | 'push' | 'offline' | 'sync' |
    // Additional
    'success';

export type LogFormat = 'json' | 'text' | 'console';

export interface LogMetadata {
  [key: string]: any;
  timestamp?: string;
  correlationId?: string;
  requestId?: string;
  userId?: string;
  environment?: string;
}

export interface LoggerOptions {
  level?: LogSeverity;
  format?: LogFormat;
  timestamp?: boolean;
  colors?: boolean;
  prefix?: string;
  metadata?: LogMetadata;
  outputFile?: string;
  console?: boolean;
  maxSize?: number; // In bytes
  rotate?: boolean;
  rotateCount?: number;
  silent?: boolean;
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  metadata?: LogMetadata;
}

// Add new interface for log type configuration
export interface LogTypeConfig {
    type: LogLevel;
    severity: LogSeverity;
}