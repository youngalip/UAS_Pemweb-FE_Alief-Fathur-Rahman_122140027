// src/utils/formatters.js

/**
 * Format date to a readable string in Indonesian locale.
 * @param {string|Date} date - Date to format
 * @param {'full'|'short'|'relative'} format - Format type (default: 'full')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'full') => {
  if (!date) return '';

  const dateObj = date instanceof Date ? date : new Date(date);

  if (isNaN(dateObj.getTime())) {
    return '';
  }

  switch (format) {
    case 'full':
      return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(dateObj);

    case 'short':
      return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(dateObj);

    case 'relative':
      return getRelativeTimeString(dateObj);

    default:
      return new Intl.DateTimeFormat('id-ID').format(dateObj);
  }
};

/**
 * Get relative time string (e.g., "2 jam yang lalu")
 * @param {Date} date - Date to compare
 * @returns {string} Relative time string
 */
const getRelativeTimeString = (date) => {
  const now = new Date();
  const diffInMs = now - date;
  const diffInSecs = Math.floor(diffInMs / 1000);
  const diffInMins = Math.floor(diffInSecs / 60);
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSecs < 60) {
    return 'Baru saja';
  } else if (diffInMins < 60) {
    return `${diffInMins} menit yang lalu`;
  } else if (diffInHours < 24) {
    return `${diffInHours} jam yang lalu`;
  } else if (diffInDays < 7) {
    return `${diffInDays} hari yang lalu`;
  } else {
    return formatDate(date, 'short');
  }
};

/**
 * Format number with thousand separator in Indonesian locale
 * @param {number} number - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (number) => {
  if (number === undefined || number === null) return '';

  return new Intl.NumberFormat('id-ID').format(number);
};

/**
 * Truncate text to a specific length with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length (default 100)
 * @returns {string} Truncated text
 */
export const truncateText = (text, length = 100) => {
  if (!text) return '';

  if (text.length <= length) {
    return text;
  }

  return text.substring(0, length) + '...';
};

/**
 * Format file size to human readable format
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Format URL to a readable hostname
 * @param {string} url - URL to format
 * @returns {string} Hostname or original string if invalid URL
 */
export const formatUrl = (url) => {
  if (!url) return '';

  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return url;
  }
};
