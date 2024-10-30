import { writeFile, appendFile, existsSync, mkdirSync, renameSync, promises as fsPromises } from 'fs';
import { dirname } from 'path';
import { colors, symbols } from './utils/colors';
import { getTimestamp } from './utils/time';
import { LogLevel, LoggerOptions, LogEntry, LogMetadata, LogSeverity } from './types';
import { formatLogLine } from './utils/formatter';
import { defaultLogLevels, defaultTypeMapping } from './utils/levels';

export class Logger {
  private options: Required<LoggerOptions>;
  private static instance: Logger;

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

  public static getInstance(options?: LoggerOptions): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(options);
    }
    return Logger.instance;
  }

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

  private shouldLog(level: LogLevel): boolean {
    const configuredLevel = defaultLogLevels[this.options.level || 'info'];
    const messageSeverity = defaultTypeMapping[level];
    const messageLevel = defaultLogLevels[messageSeverity];
    
    return messageLevel >= configuredLevel;
  }

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
  public trace(message: string, metadata?: LogMetadata): void {
    this.log('trace', message, metadata);
  }

  public debug(message: string, metadata?: LogMetadata): void {
    this.log('debug', message, metadata);
  }

  public info(message: string, metadata?: LogMetadata): void {
    this.log('info', message, metadata);
  }

  public success(message: string, metadata?: LogMetadata): void {
    this.log('success', message, metadata);
  }

  public warn(message: string, metadata?: LogMetadata): void {
    this.log('warn', message, metadata);
  }

  public error(message: string | Error, metadata?: LogMetadata): void {
    const errorMessage = message instanceof Error ? 
      `${message.message}\n${message.stack}` : 
      message;
    this.log('error', errorMessage, metadata);
  }

  public fatal(message: string | Error, metadata?: LogMetadata): void {
    const errorMessage = message instanceof Error ? 
      `${message.message}\n${message.stack}` : 
      message;
    this.log('fatal', errorMessage, metadata);
  }

  // Development & Debug
  public verbose(message: string, metadata?: LogMetadata): void {
    this.log('verbose', message, metadata);
  }

  public silly(message: string, metadata?: LogMetadata): void {
    this.log('silly', message, metadata);
  }

  public test(message: string, metadata?: LogMetadata): void {
    this.log('test', message, metadata);
  }

  public mock(message: string, metadata?: LogMetadata): void {
    this.log('mock', message, metadata);
  }

  // Web & API Related
  public http(message: string, metadata?: LogMetadata): void {
    this.log('http', message, metadata);
  }

  public request(message: string, metadata?: LogMetadata): void {
    this.log('request', message, metadata);
  }

  public response(message: string, metadata?: LogMetadata): void {
    this.log('response', message, metadata);
  }

  public graphql(message: string, metadata?: LogMetadata): void {
    this.log('graphql', message, metadata);
  }

  public websocket(message: string, metadata?: LogMetadata): void {
    this.log('websocket', message, metadata);
  }

  public api(message: string, metadata?: LogMetadata): void {
    this.log('api', message, metadata);
  }

  // Security Related
  public security(message: string, metadata?: LogMetadata): void {
    this.log('security', message, metadata);
  }

  public audit(message: string, metadata?: LogMetadata): void {
    this.log('audit', message, metadata);
  }

  public auth(message: string, metadata?: LogMetadata): void {
    this.log('auth', message, metadata);
  }

  public access(message: string, metadata?: LogMetadata): void {
    this.log('access', message, metadata);
  }

  public firewall(message: string, metadata?: LogMetadata): void {
    this.log('firewall', message, metadata);
  }

  // Database Related
  public database(message: string, metadata?: LogMetadata): void {
    this.log('database', message, metadata);
  }

  public query(message: string, metadata?: LogMetadata): void {
    this.log('query', message, metadata);
  }

  public migration(message: string, metadata?: LogMetadata): void {
    this.log('migration', message, metadata);
  }

  public cache(message: string, metadata?: LogMetadata): void {
    this.log('cache', message, metadata);
  }

  // Performance Related
  public performance(message: string, metadata?: LogMetadata): void {
    this.log('performance', message, metadata);
  }

  public metric(message: string, metadata?: LogMetadata): void {
    this.log('metric', message, metadata);
  }

  public benchmark(message: string, metadata?: LogMetadata): void {
    this.log('benchmark', message, metadata);
  }

  public memory(message: string, metadata?: LogMetadata): void {
    this.log('memory', message, metadata);
  }

  // System Related
  public system(message: string, metadata?: LogMetadata): void {
    this.log('system', message, metadata);
  }

  public process(message: string, metadata?: LogMetadata): void {
    this.log('process', message, metadata);
  }

  public cpu(message: string, metadata?: LogMetadata): void {
    this.log('cpu', message, metadata);
  }

  public disk(message: string, metadata?: LogMetadata): void {
    this.log('disk', message, metadata);
  }

  public network(message: string, metadata?: LogMetadata): void {
    this.log('network', message, metadata);
  }

  // Business Logic
  public business(message: string, metadata?: LogMetadata): void {
    this.log('business', message, metadata);
  }

  public transaction(message: string, metadata?: LogMetadata): void {
    this.log('transaction', message, metadata);
  }

  public workflow(message: string, metadata?: LogMetadata): void {
    this.log('workflow', message, metadata);
  }

  public event(message: string, metadata?: LogMetadata): void {
    this.log('event', message, metadata);
  }

  // Integration
  public integration(message: string, metadata?: LogMetadata): void {
    this.log('integration', message, metadata);
  }

  public webhook(message: string, metadata?: LogMetadata): void {
    this.log('webhook', message, metadata);
  }

  public external(message: string, metadata?: LogMetadata): void {
    this.log('external', message, metadata);
  }

  // User Interaction
  public ui(message: string, metadata?: LogMetadata): void {
    this.log('ui', message, metadata);
  }

  public interaction(message: string, metadata?: LogMetadata): void {
    this.log('interaction', message, metadata);
  }

  public analytics(message: string, metadata?: LogMetadata): void {
    this.log('analytics', message, metadata);
  }

  public tracking(message: string, metadata?: LogMetadata): void {
    this.log('tracking', message, metadata);
  }

  // Background Tasks
  public job(message: string, metadata?: LogMetadata): void {
    this.log('job', message, metadata);
  }

  public queue(message: string, metadata?: LogMetadata): void {
    this.log('queue', message, metadata);
  }

  public cron(message: string, metadata?: LogMetadata): void {
    this.log('cron', message, metadata);
  }

  public task(message: string, metadata?: LogMetadata): void {
    this.log('task', message, metadata);
  }

  // Infrastructure
  public kubernetes(message: string, metadata?: LogMetadata): void {
    this.log('kubernetes', message, metadata);
  }

  public docker(message: string, metadata?: LogMetadata): void {
    this.log('docker', message, metadata);
  }

  public cloud(message: string, metadata?: LogMetadata): void {
    this.log('cloud', message, metadata);
  }

  public serverless(message: string, metadata?: LogMetadata): void {
    this.log('serverless', message, metadata);
  }

  // Mobile Specific
  public mobile(message: string, metadata?: LogMetadata): void {
    this.log('mobile', message, metadata);
  }

  public push(message: string, metadata?: LogMetadata): void {
    this.log('push', message, metadata);
  }

  public offline(message: string, metadata?: LogMetadata): void {
    this.log('offline', message, metadata);
  }

  public sync(message: string, metadata?: LogMetadata): void {
    this.log('sync', message, metadata);
  }

  public updateOptions(newOptions: Partial<LoggerOptions>): void {
    this.options = { ...this.options, ...newOptions };
  }
}