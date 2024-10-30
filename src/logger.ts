/**
 * @fileoverview Universal Logger Pro - A comprehensive logging solution for TypeScript applications
 * @module Logger
 * @description
 * Provides a comprehensive logging framework with support for:
 * - Multiple log levels and specialized logging categories
 * - File and console output with rotation
 * - Structured logging with metadata
 * - Color-coded console output
 * - Singleton pattern for global logging
 */

import { writeFile, appendFile, existsSync, mkdirSync, renameSync, promises as fsPromises } from 'fs';
import { dirname } from 'path';
import { colors, symbols } from './utils/colors';
import { getTimestamp } from './utils/time';
import { LogLevel, LoggerOptions, LogEntry, LogMetadata, LogSeverity } from './types';
import { formatLogLine } from './utils/formatter';
import { defaultLogLevels, defaultTypeMapping } from './utils/levels';

/**
 * Core Logger class implementing comprehensive logging capabilities
 * 
 * @class Logger
 * @description
 * Provides a robust logging implementation with support for:
 * - Multiple output formats (console, JSON, text)
 * - Log file rotation and size management
 * - Structured metadata and context
 * - Specialized logging categories for different domains
 * - Color-coded console output
 * - Global configuration
 * 
 * @example
 * ```typescript
 * const logger = Logger.getInstance({
 *   level: 'info',
 *   format: 'json',
 *   outputFile: './logs/app.log'
 * });
 * 
 * logger.info('Application started', { version: '1.0.0' });
 * ```
 */
export class Logger {
  /** @private Current logger configuration */
  private options: Required<LoggerOptions>;
  
  /** @private Singleton instance */
  private static instance: Logger;

  /**
   * Private constructor to enforce singleton pattern
   * @private
   * @param options - Logger configuration options
   */
  private constructor(options: LoggerOptions = {}) {
    this.options = {
      level: 'info',
      format: 'console',
      timestamp: true,
      colors: true,
      prefix: '',
      metadata: {},
      outputFile: '',
      console: true,
      maxSize: 10 * 1024 * 1024, // 10MB
      rotate: true,
      rotateCount: 5,
      silent: false,
      ...options
    };

    if (this.options.outputFile) {
      const dir = dirname(this.options.outputFile);
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }
    }
  }

  /**
   * Gets the singleton instance of the logger
   * @param options - Optional configuration to initialize or update the logger
   * @returns The singleton Logger instance
   */
  public static getInstance(options?: LoggerOptions): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(options);
    }
    return Logger.instance;
  }

  /**
   * Formats a log message according to configured format
   * @private
   * @param level - Log level of the message
   * @param message - The message to format
   * @param metadata - Optional metadata to include
   * @returns Formatted log message string
   */
  private formatMessage(level: LogLevel, message: string, metadata?: LogMetadata): string {
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, -5);
    
    if (this.options.format === 'json') {
        return JSON.stringify({
            timestamp,
            level,
            message,
            ...metadata,
            ...this.options.metadata
        });
    }

    return formatLogLine(
        timestamp,
        level,
        message,
        this.options.colors ? colors[defaultTypeMapping[level] as LogSeverity] : (text: string) => text,
        metadata?.source
    );
  }

  /**
   * Rotates log files when size limit is reached
   * @private
   */
  private rotateLogs() {
    const { outputFile, rotateCount } = this.options;
    for (let i = rotateCount - 1; i > 0; i--) {
      const oldFile = `${outputFile}.${i}`;
      const newFile = `${outputFile}.${i + 1}`;
      if (existsSync(oldFile)) {
        renameSync(oldFile, newFile);
      }
    }
    renameSync(outputFile, `${outputFile}.1`);
  }

  /**
   * Writes a log entry to the configured output file
   * @private
   * @param entry - Log entry to write
   */
  private async logToFile(entry: LogEntry) {
    const { outputFile, maxSize, rotate } = this.options;
    try {
      if (existsSync(outputFile) && rotate) {
        const { size } = await fsPromises.stat(outputFile);
        if (size >= maxSize) {
          this.rotateLogs();
        }
      }
      await fsPromises.appendFile(outputFile, JSON.stringify(entry) + '\n', 'utf8');
    } catch (error) {
      console.error('Failed to write log to file:', error);
    }
  }

  /**
   * Determines if a message should be logged based on configured level
   * @private
   * @param level - Level of the message to check
   * @returns Whether the message should be logged
   */
  private shouldLog(level: LogLevel): boolean {
    const configuredLevel = defaultLogLevels[this.options.level || 'info'];
    const messageSeverity = defaultTypeMapping[level];
    const messageLevel = defaultLogLevels[messageSeverity];
    
    return messageLevel >= configuredLevel;
  }

  /**
   * Core logging method that handles all log operations
   * @private
   * @param level - Log level for the message
   * @param message - Message to log
   * @param metadata - Optional metadata to include
   */
  private log(level: LogLevel, message: string, metadata?: LogMetadata): void {
    if (this.options.silent || !this.shouldLog(level)) return;

    const formattedMessage = this.formatMessage(level, message, metadata);

    if (this.options.console) {
      switch (level) {
        case 'error':
        case 'fatal':
          console.error(formattedMessage);
          break;
        case 'warn':
          console.warn(formattedMessage);
          break;
        default:
          console.log(formattedMessage);
      }
    }

    if (this.options.outputFile) {
      const entry: LogEntry = {
        level,
        message,
        timestamp: getTimestamp(),
        metadata: { ...this.options.metadata, ...metadata }
      };

      this.logToFile(entry);
    }
  }

  // Standard Levels

  /**
   * Logs a trace level message
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public trace(message: string, metadata?: LogMetadata): void {
    this.log('trace', message, metadata);
  }

  /**
   * Logs a debug level message
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public debug(message: string, metadata?: LogMetadata): void {
    this.log('debug', message, metadata);
  }

  /**
   * Logs an info level message
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public info(message: string, metadata?: LogMetadata): void {
    this.log('info', message, metadata);
  }

  /**
   * Logs a success message at info level
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public success(message: string, metadata?: LogMetadata): void {
    this.log('success', message, metadata);
  }

  /**
   * Logs a warning message
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public warn(message: string, metadata?: LogMetadata): void {
    this.log('warn', message, metadata);
  }

  /**
   * Logs an error message with optional stack trace
   * @param message - Error object or message to log
   * @param metadata - Optional metadata
   */
  public error(message: string | Error, metadata?: LogMetadata): void {
    const errorMessage = message instanceof Error ? 
      `${message.message}\n${message.stack}` : 
      message;
    this.log('error', errorMessage, metadata);
  }

  /**
   * Logs a fatal error message with optional stack trace
   * @param message - Error object or message to log
   * @param metadata - Optional metadata
   */
  public fatal(message: string | Error, metadata?: LogMetadata): void {
    const errorMessage = message instanceof Error ? 
      `${message.message}\n${message.stack}` : 
      message;
    this.log('fatal', errorMessage, metadata);
  }

  // Development & Debug

  /**
   * Logs verbose debug information
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public verbose(message: string, metadata?: LogMetadata): void {
    this.log('verbose', message, metadata);
  }

  /**
   * Logs very detailed debug information
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public silly(message: string, metadata?: LogMetadata): void {
    this.log('silly', message, metadata);
  }

  /**
   * Logs test-related information
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public test(message: string, metadata?: LogMetadata): void {
    this.log('test', message, metadata);
  }

  /**
   * Logs mock/stub related information
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public mock(message: string, metadata?: LogMetadata): void {
    this.log('mock', message, metadata);
  }

  // Web & API Related

  /**
   * Logs HTTP request/response information
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public http(message: string, metadata?: LogMetadata): void {
    this.log('http', message, metadata);
  }

  /**
   * Logs incoming request details
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public request(message: string, metadata?: LogMetadata): void {
    this.log('request', message, metadata);
  }

  /**
   * Logs outgoing response details
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public response(message: string, metadata?: LogMetadata): void {
    this.log('response', message, metadata);
  }

  /**
   * Logs GraphQL operation information
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public graphql(message: string, metadata?: LogMetadata): void {
    this.log('graphql', message, metadata);
  }

  /**
   * Logs WebSocket related information
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public websocket(message: string, metadata?: LogMetadata): void {
    this.log('websocket', message, metadata);
  }

  /**
   * Logs general API related information
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public api(message: string, metadata?: LogMetadata): void {
    this.log('api', message, metadata);
  }

  // Security Related

  /**
   * Logs security related events
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public security(message: string, metadata?: LogMetadata): void {
    this.log('security', message, metadata);
  }

  /**
   * Logs audit trail information
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public audit(message: string, metadata?: LogMetadata): void {
    this.log('audit', message, metadata);
  }

  /**
   * Logs authentication related events
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public auth(message: string, metadata?: LogMetadata): void {
    this.log('auth', message, metadata);
  }

  /**
   * Logs access control events
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public access(message: string, metadata?: LogMetadata): void {
    this.log('access', message, metadata);
  }

  /**
   * Logs firewall related events
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public firewall(message: string, metadata?: LogMetadata): void {
    this.log('firewall', message, metadata);
  }

  // Database Related

  /**
   * Logs database operations
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public database(message: string, metadata?: LogMetadata): void {
    this.log('database', message, metadata);
  }

  /**
   * Logs database query information
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public query(message: string, metadata?: LogMetadata): void {
    this.log('query', message, metadata);
  }

  /**
   * Logs database migration events
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public migration(message: string, metadata?: LogMetadata): void {
    this.log('migration', message, metadata);
  }

  /**
   * Logs cache operations
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public cache(message: string, metadata?: LogMetadata): void {
    this.log('cache', message, metadata);
  }

  // Performance Related

  /**
   * Logs performance related information
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public performance(message: string, metadata?: LogMetadata): void {
    this.log('performance', message, metadata);
  }

  /**
   * Logs metric data
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public metric(message: string, metadata?: LogMetadata): void {
    this.log('metric', message, metadata);
  }

  /**
   * Logs benchmark results
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public benchmark(message: string, metadata?: LogMetadata): void {
    this.log('benchmark', message, metadata);
  }

  /**
   * Logs memory usage information
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public memory(message: string, metadata?: LogMetadata): void {
    this.log('memory', message, metadata);
  }

  // System Related

  /**
   * Logs system level events
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public system(message: string, metadata?: LogMetadata): void {
    this.log('system', message, metadata);
  }

  /**
   * Logs process related information
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public process(message: string, metadata?: LogMetadata): void {
    this.log('process', message, metadata);
  }

  /**
   * Logs CPU usage information
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public cpu(message: string, metadata?: LogMetadata): void {
    this.log('cpu', message, metadata);
  }

  /**
   * Logs disk operations and usage
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public disk(message: string, metadata?: LogMetadata): void {
    this.log('disk', message, metadata);
  }

  /**
   * Logs network related events
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public network(message: string, metadata?: LogMetadata): void {
    this.log('network', message, metadata);
  }

  // Business Logic

  /**
   * Logs business logic events
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public business(message: string, metadata?: LogMetadata): void {
    this.log('business', message, metadata);
  }

  /**
   * Logs transaction related events
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public transaction(message: string, metadata?: LogMetadata): void {
    this.log('transaction', message, metadata);
  }

  /**
   * Logs workflow events
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public workflow(message: string, metadata?: LogMetadata): void {
    this.log('workflow', message, metadata);
  }

  /**
   * Logs business events
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public event(message: string, metadata?: LogMetadata): void {
    this.log('event', message, metadata);
  }

  // Integration

  /**
   * Logs integration events
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public integration(message: string, metadata?: LogMetadata): void {
    this.log('integration', message, metadata);
  }

  /**
   * Logs webhook events
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public webhook(message: string, metadata?: LogMetadata): void {
    this.log('webhook', message, metadata);
  }

  /**
   * Logs external service interactions
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public external(message: string, metadata?: LogMetadata): void {
    this.log('external', message, metadata);
  }

  // User Interaction

  /**
   * Logs UI related events
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public ui(message: string, metadata?: LogMetadata): void {
    this.log('ui', message, metadata);
  }

  /**
   * Logs user interaction events
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public interaction(message: string, metadata?: LogMetadata): void {
    this.log('interaction', message, metadata);
  }

  /**
   * Logs analytics events
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public analytics(message: string, metadata?: LogMetadata): void {
    this.log('analytics', message, metadata);
  }

  /**
   * Logs user tracking events
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public tracking(message: string, metadata?: LogMetadata): void {
    this.log('tracking', message, metadata);
  }

  // Background Tasks

  /**
   * Logs background job information
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public job(message: string, metadata?: LogMetadata): void {
    this.log('job', message, metadata);
  }

  /**
   * Logs queue processing events
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public queue(message: string, metadata?: LogMetadata): void {
    this.log('queue', message, metadata);
  }

  /**
   * Logs scheduled task events
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public cron(message: string, metadata?: LogMetadata): void {
    this.log('cron', message, metadata);
  }

  /**
   * Logs task execution events
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public task(message: string, metadata?: LogMetadata): void {
    this.log('task', message, metadata);
  }

  // Infrastructure

  /**
   * Logs Kubernetes related events
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public kubernetes(message: string, metadata?: LogMetadata): void {
    this.log('kubernetes', message, metadata);
  }

  /**
   * Logs Docker related events
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public docker(message: string, metadata?: LogMetadata): void {
    this.log('docker', message, metadata);
  }

  /**
   * Logs cloud infrastructure events
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public cloud(message: string, metadata?: LogMetadata): void {
    this.log('cloud', message, metadata);
  }

  /**
   * Logs serverless function events
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public serverless(message: string, metadata?: LogMetadata): void {
    this.log('serverless', message, metadata);
  }

  // Mobile Specific

  /**
   * Logs mobile app events
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public mobile(message: string, metadata?: LogMetadata): void {
    this.log('mobile', message, metadata);
  }

  /**
   * Logs push notification events
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public push(message: string, metadata?: LogMetadata): void {
    this.log('push', message, metadata);
  }

  /**
   * Logs offline mode events
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public offline(message: string, metadata?: LogMetadata): void {
    this.log('offline', message, metadata);
  }

  /**
   * Logs data synchronization events
   * @param message - Message to log
   * @param metadata - Optional metadata
   */
  public sync(message: string, metadata?: LogMetadata): void {
    this.log('sync', message, metadata);
  }

  /**
   * Updates logger configuration options
   * @param newOptions - Partial options to update
   */
  public updateOptions(newOptions: Partial<LoggerOptions>): void {
    this.options = { ...this.options, ...newOptions };
  }
}