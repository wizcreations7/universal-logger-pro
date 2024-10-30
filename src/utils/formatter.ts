/**
 * @fileoverview Log formatting utilities for logging
 * @module LogFormatter
 * @description
 * Provides consistent and configurable log message formatting capabilities
 * with support for timestamps, log levels, colors, and source context.
 */

import chalk from 'chalk';
import { LogLevel } from '../types';

/**
 * Formats a timestamp with dimmed styling for visual distinction
 * @private
 * @param time - ISO 8601 formatted timestamp string
 * @returns Styled timestamp string
 */
const padTime = (time: string) => chalk.dim(time);

/**
 * Formats a log level indicator with consistent styling and casing
 * @private
 * @param level - Log level string
 * @param color - Color formatting function to apply
 * @returns Styled log level indicator string
 */
const padLevel = (level: string, color: (text: string) => string) => 
    color(`[${level.toUpperCase()}]`);

/**
 * Formats a complete log line with consistent styling
 * 
 * @description
 * Creates a formatted log line combining:
 * - Timestamp with ISO 8601 format
 * - Color-coded log level indicator
 * - Main message content
 * - Optional source context
 * 
 * The format follows common logging conventions for readability
 * and consistency across different log aggregation systems.
 * 
 * @param timestamp - ISO 8601 formatted timestamp
 * @param level - Log severity level or specialized type
 * @param message - Main log message content
 * @param color - Color formatting function for the level indicator
 * @param source - Optional source context (e.g. class name, file path)
 * @returns Formatted log line string
 * 
 * @example
 * ```typescript
 * formatLogLine(
 *   '2023-12-25T12:00:00.000Z',
 *   'error',
 *   'Database connection failed',
 *   chalk.red,
 *   'UserService'
 * )
 * // Returns: "2023-12-25 12:00:00 [ERROR] Database connection failed @ UserService"
 * ```
 */
export const formatLogLine = (
    timestamp: string, 
    level: LogLevel, 
    message: string, 
    color: (text: string) => string,
    source?: string
) => {
    const timeStr = padTime(timestamp);
    const levelStr = padLevel(level, color);
    const sourceStr = source ? chalk.dim(` @ ${source}`) : '';
    
    return `${timeStr} ${levelStr} ${message}${sourceStr}`;
}; 