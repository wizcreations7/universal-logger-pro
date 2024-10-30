/**
 * Generates a timestamp string in the specified format.
 * 
 * @description
 * Timestamp generation utility that supports multiple standard formats:
 * - ISO 8601 format (default) - e.g. "2023-12-25T12:00:00.000Z"
 * - UTC format - e.g. "Mon, 25 Dec 2023 12:00:00 GMT" 
 * - UNIX timestamp - Number of seconds since Unix Epoch
 * 
 * This function ensures consistent timestamp formatting across the logging system.
 * 
 * @param format - The desired timestamp format ('ISO' | 'UTC' | 'UNIX')
 * @returns A string representation of the current timestamp in the specified format
 * 
 * @example
 * ```typescript
 * // ISO 8601 format (default)
 * getTimestamp() // "2023-12-25T12:00:00.000Z"
 * 
 * // UTC format
 * getTimestamp('UTC') // "Mon, 25 Dec 2023 12:00:00 GMT"
 * 
 * // UNIX timestamp
 * getTimestamp('UNIX') // "1703505600"
 * ```
 */
export const getTimestamp = (format: string = 'ISO'): string => {
  const date = new Date();
  
  switch (format) {
    case 'ISO':
      return date.toISOString();
    case 'UTC':
      return date.toUTCString();
    case 'UNIX':
      return Math.floor(date.getTime() / 1000).toString();
    default:
      return date.toISOString();
  }
}; 