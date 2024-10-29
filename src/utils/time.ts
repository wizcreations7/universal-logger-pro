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