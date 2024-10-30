/**
 * Represents the core severity levels for logging, following standard logging conventions.
 * These are the fundamental categories that determine the importance and urgency of log messages.
 */
export type LogSeverity = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

/**
 * Comprehensive logging level type that extends beyond basic severity levels to support
 * specialized logging categories across different domains of applications.
 * 
 * @remarks
 * This type maintains backwards compatibility while providing granular logging categories
 * organized by functional areas.
 */
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

/**
 * Defines the available output formats for log entries.
 * 
 * @property json - Structured JSON format suitable for log aggregation systems
 * @property text - Plain text format for basic logging needs
 * @property console - Enhanced console output with colors and formatting
 */
export type LogFormat = 'json' | 'text' | 'console';

/**
 * Standard metadata interface for enriching log entries with contextual information.
 * Implements a flexible key-value structure while defining commonly used fields.
 * 
 * @property timestamp - ISO 8601 formatted timestamp
 * @property correlationId - Identifier for tracing requests across services
 * @property requestId - Unique identifier for HTTP requests
 * @property userId - Identifier for the user associated with the log entry
 * @property environment - Deployment environment (e.g., 'production', 'staging')
 */
export interface LogMetadata {
  [key: string]: any;
  timestamp?: string;
  correlationId?: string;
  requestId?: string;
  userId?: string;
  environment?: string;
}

/**
 * Configuration options for initializing the logger instance.
 * 
 * @property level - Minimum severity level for log entries to be processed
 * @property minLevel - Minimum severity level for log entries to be processed
 * @property format - Output format for log entries
 * @property timestamp - Whether to include timestamps in log entries
 * @property colors - Enable/disable colored output in console logs
 * @property prefix - Custom prefix for all log messages
 * @property metadata - Global metadata to be included in all log entries
 * @property outputFile - File path for log file output
 * @property console - Enable/disable console output
 * @property maxSize - Maximum size of log files before rotation (in bytes)
 * @property rotate - Enable/disable log file rotation
 * @property rotateCount - Number of rotated log files to maintain
 * @property silent - Suppress all log output when true
 */
export interface LoggerOptions {
  level?: LogSeverity;
  minLevel?: LogSeverity;
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

/**
 * Represents a structured log entry in the system.
 * 
 * @property level - The log level/type of the entry
 * @property message - The main log message
 * @property timestamp - ISO 8601 formatted timestamp of when the log was created
 * @property metadata - Optional additional contextual information
 */
export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  metadata?: LogMetadata;
}

/**
 * Configuration interface for mapping custom log types to severity levels.
 * Enables customization of how specialized log types are treated in terms of severity.
 * 
 * @property type - The custom log type to be configured
 * @property severity - The severity level to associate with the custom type
 */
export interface LogTypeConfig {
    type: LogLevel;
    severity: LogSeverity;
}