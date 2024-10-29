export type LogLevel = 
  // Standard Levels
  | 'trace' 
  | 'debug' 
  | 'info' 
  | 'success'
  | 'warn' 
  | 'error' 
  | 'fatal' 
  
  // Web & API Related
  | 'http' 
  | 'request'
  | 'response'
  | 'graphql'
  | 'websocket'
  | 'api'
  
  // Security Related
  | 'security'
  | 'audit'
  | 'auth'
  | 'access'
  | 'firewall'
  
  // Database Related
  | 'database'
  | 'query'
  | 'migration'
  | 'cache'
  
  // Performance Related
  | 'performance'
  | 'metric'
  | 'benchmark'
  | 'memory'
  
  // System Related
  | 'system'
  | 'process'
  | 'cpu'
  | 'memory'
  | 'disk'
  | 'network'
  
  // Development & Debug
  | 'verbose'
  | 'silly'
  | 'test'
  | 'mock'
  | 'debug-verbose'
  
  // Business Logic
  | 'business'
  | 'transaction'
  | 'workflow'
  | 'event'
  
  // Integration
  | 'integration'
  | 'webhook'
  | 'third-party'
  | 'external'
  
  // User Interaction
  | 'ui'
  | 'interaction'
  | 'analytics'
  | 'tracking'
  
  // Background Tasks
  | 'job'
  | 'queue'
  | 'cron'
  | 'task'
  
  // Infrastructure
  | 'kubernetes'
  | 'docker'
  | 'cloud'
  | 'serverless'
  
  // Mobile Specific
  | 'mobile'
  | 'push'
  | 'offline'
  | 'sync';

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
  level?: LogLevel;
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