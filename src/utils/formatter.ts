/**
 * @fileoverview Log formatting utilities for logging
 * @module LogFormatter
 * @description
 * Provides consistent and configurable log message formatting capabilities
 * with support for timestamps, log levels, colors, and source context.
 * Handles formatting of complex data types and metadata for comprehensive logging output.
 */

import chalk from 'chalk';
import { LogLevel, LogMetadata } from '../types';

/**
 * Formats a timestamp with dimmed styling for visual distinction
 * @private
 * @param time - ISO 8601 formatted timestamp string
 * @param levelColor - Color function from the log level
 * @returns Styled timestamp string
 */
const padTime = (time: string, levelColor: (text: string) => string) => 
    levelColor(chalk.dim(time));

/**
 * Formats level and type indicators with consistent styling
 * @private
 * @param level - Log level string
 * @param logType - Optional log type string
 * @param levelColor - Color function for level
 * @param typeColor - Color function for type
 * @param showEmoji - Whether to show emoji
 * @param emoji - Optional emoji to display
 * @returns Formatted level and type string
 */
const formatLevelAndType = (
    level: LogLevel, 
    logType: string | undefined,
    levelColor: (text: string) => string,
    typeColor: (text: string) => string,
    showEmoji: boolean,
    emoji?: string
) => {
    const levelStr = levelColor(`[${level.toUpperCase()}]`);
    if (!logType) return levelStr;
    
    const typeStr = typeColor(`[${logType.toUpperCase()}]`);
    const emojiStr = showEmoji && emoji ? `${emoji} ` : '';
    
    return `${emojiStr}${levelStr}${typeStr}`;
};

const formatValue = (value: any): string => {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    
    switch (typeof value) {
        case 'object': {
            // Handle Error objects and stack traces
            if (value instanceof Error || 
                (typeof value === 'string' && value.includes('\n    at '))) {
                const stack = value instanceof Error ? 
                    (value.stack || value.message) : value;
                return stack
                    .split('\n')
                    .map(line => line.trim())
                    .join('\n      ');
            }

            // Handle special objects
            if (value instanceof Date) return value.toISOString();
            if (value instanceof RegExp) return value.toString();
            if (value instanceof URL) return value.href;
            if (value instanceof Map) {
                return formatMapOrSet([...value.entries()], 'Map');
            }
            if (value instanceof Set) {
                return formatMapOrSet([...value.values()], 'Set');
            }
            if (value instanceof WeakMap) return '[WeakMap]';
            if (value instanceof WeakSet) return '[WeakSet]';
            if (value instanceof Promise) return '[Promise]';
            if (value instanceof Int8Array || 
                value instanceof Uint8Array ||
                value instanceof Uint8ClampedArray ||
                value instanceof Int16Array ||
                value instanceof Uint16Array ||
                value instanceof Int32Array ||
                value instanceof Uint32Array ||
                value instanceof Float32Array ||
                value instanceof Float64Array ||
                value instanceof BigInt64Array ||
                value instanceof BigUint64Array) {
                return `${value.constructor.name}(${Array.prototype.slice.call(value).join(', ')})`;
            }
            if (ArrayBuffer.isView(value)) {
                return `${value.constructor.name}(${value.byteLength})`;
            }
            if (value instanceof ArrayBuffer) {
                return `ArrayBuffer(${value.byteLength})`;
            }
            if (value instanceof SharedArrayBuffer) {
                return `SharedArrayBuffer(${value.byteLength})`;
            }
            if (value instanceof DataView) {
                return `DataView(${value.byteLength})`;
            }

            // Web API checks - only run if these classes exist
            if (typeof Blob !== 'undefined' && value instanceof Blob) {
                return `Blob(${value.size} bytes, ${value.type || 'unknown type'})`;
            }
            if (typeof FormData !== 'undefined' && value instanceof FormData) {
                return formatFormData(value);
            }
            if (typeof URLSearchParams !== 'undefined' && value instanceof URLSearchParams) {
                return value.toString();
            }
            if (typeof WebSocket !== 'undefined' && value instanceof WebSocket) {
                return `WebSocket(${value.url}, ${value.readyState})`;
            }
            if (typeof EventTarget !== 'undefined' && value instanceof EventTarget) {
                return '[EventTarget]';
            }
            if (typeof Event !== 'undefined' && value instanceof Event) {
                return `Event(${value.type})`;
            }

            // Handle Arrays
            if (Array.isArray(value)) {
                return formatArray(value);
            }

            // Handle standard objects
            return formatObject(value);
        }
        case 'function':
            return formatFunction(value);
        case 'symbol':
            return value.toString();
        case 'bigint':
            return `${value.toString()}n`;
        default:
            return JSON.stringify(value);
    }
};

const formatMapOrSet = (entries: any[], type: 'Map' | 'Set'): string => {
    if (entries.length === 0) return `${type}(0)`;
    return `${type}(\n    ${entries.map(entry => 
        type === 'Map' ? 
            `${formatValue(entry[0])} => ${formatValue(entry[1])}` : 
            formatValue(entry)
    ).join(',\n    ')}\n  )`;
};

const formatArray = (arr: any[]): string => {
    if (arr.length === 0) return '[]';
    return JSON.stringify(arr, null, 2)
        .split('\n')
        .map(line => line.trimRight())
        .join('\n    ');
};

const formatObject = (obj: object): string => {
    if (Object.keys(obj).length === 0) return '{}';
    
    // Handle objects with custom toString()
    if (obj.toString && obj.toString !== Object.prototype.toString) {
        const customStr = obj.toString();
        if (customStr !== '[object Object]') {
            return customStr;
        }
    }

    return JSON.stringify(obj, (key, value) => {
        if (value instanceof Function) return '[Function]';
        if (value instanceof RegExp) return value.toString();
        if (value instanceof Error) return value.stack || value.message;
        return value;
    }, 2)
        .split('\n')
        .map(line => line.trimRight())
        .join('\n    ');
};

const formatFunction = (fn: Function): string => {
    if (fn.name) return `[Function: ${fn.name}]`;
    return '[Function: anonymous]';
};

const formatFormData = (formData: FormData): string => {
    const entries: string[] = [];
    formData.forEach((value, key) => {
        if (value instanceof File) {
            entries.push(`${key}: File(${value.name}, ${value.type}, ${value.size} bytes)`);
        } else {
            entries.push(`${key}: ${value}`);
        }
    });
    return `FormData(\n    ${entries.join(',\n    ')}\n  )`;
};

/**
 * Formats a complete log line with consistent styling
 * 
 * @description
 * Creates a formatted log line combining:
 * - Timestamp with ISO 8601 format
 * - Color-coded level and type indicators
 * - Main message content
 * - Optional source context
 * - Optional emoji
 * - Optional metadata with rich formatting for complex types
 * 
 * @param timestamp - ISO 8601 formatted timestamp
 * @param level - Log severity level
 * @param logType - Optional specialized log type
 * @param message - Main log message content
 * @param levelColor - Color function for level indicator
 * @param typeColor - Color function for type indicator
 * @param showEmoji - Whether to show emoji
 * @param emoji - Optional emoji to display
 * @param source - Optional source context
 * @param metadata - Optional structured metadata to append
 * @returns Formatted log line string
 * 
 * @example
 * ```typescript
 * formatLogLine(
 *   '2023-12-25T12:00:00.000Z',
 *   'error',
 *   'database',
 *   'Connection failed',
 *   chalk.red,
 *   chalk.blue,
 *   true,
 *   '🗄️',
 *   'UserService',
 *   { retries: 3, lastError: new Error('Timeout') }
 * )
 * // Returns formatted string with timestamp, level, message and metadata
 * ```
 */
export const formatLogLine = (
    timestamp: string, 
    level: LogLevel, 
    logType: string | undefined,
    message: string, 
    levelColor: (text: string) => string,
    typeColor: (text: string) => string,
    showEmoji: boolean,
    emoji?: string,
    source?: string,
    metadata?: LogMetadata
) => {
    const timeStr = padTime(timestamp, levelColor);
    const levelTypeStr = formatLevelAndType(level, logType, levelColor, typeColor, showEmoji, emoji);
    const messageStr = chalk.white(message);
    const sourceStr = source ? chalk.dim(` @ ${source}`) : '';
    
    let result = `${timeStr} ${levelTypeStr} ${messageStr}${sourceStr}`;

    // Add metadata if present
    if (metadata && Object.keys(metadata).length > 0) {
        const metadataStr = Object.entries(metadata)
            .filter(([key]) => key !== 'source') // Skip source as it's already shown
            .map(([key, value]) => {
                const formattedValue = formatValue(value);
                const valueLines = formattedValue.split('\n');
                
                if (valueLines.length === 1) {
                    return `  ${chalk.cyan(key)}: ${chalk.white(formattedValue)}`;
                }
                
                return `  ${chalk.cyan(key)}:\n    ${chalk.white(valueLines.join('\n    '))}`;
            })
            .join('\n');
        
        if (metadataStr) {
            result += '\n' + metadataStr;
        }
    }

    return result;
}; 