import chalk from 'chalk';
import { LogLevel } from '../types';

const padTime = (time: string) => chalk.dim(time);
const padLevel = (level: string, color: (text: string) => string) => 
    color(`[${level.toUpperCase()}]`);

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