/**
 * Safe number formatting utility
 * Prevents "Cannot read properties of undefined (reading 'toLocaleString')" errors
 */

/**
 * Safely formats a number with locale string formatting
 * @param {*} value - Any value to format as a number
 * @param {number} fallback - Fallback value if formatting fails (default: 0)
 * @returns {string} Formatted number string
 */
export const safeFormatNumber = (value, fallback = 0) => {
  try {
    // Handle null/undefined
    if (value === null || value === undefined) {
      return String(fallback);
    }

    // Convert to number
    const num = Number(value);

    // Handle NaN
    if (isNaN(num)) {
      return String(fallback);
    }

    // Format with locale
    return num.toLocaleString();
  } catch (error) {
    console.warn('Error formatting number:', error);
    return String(fallback);
  }
};

/**
 * Safely formats currency
 * @param {*} value - Value in cents
 * @param {string} currency - Currency symbol (default: '$')
 * @returns {string} Formatted currency string
 */
export const safeFormatCurrency = (value, currency = '$') => {
  const formatted = safeFormatNumber(value);
  return `${currency}${formatted}`;
};

/**
 * Safely formats percentage
 * @param {*} value - Percentage value (0-100)
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted percentage string
 */
export const safeFormatPercentage = (value, decimals = 1) => {
  try {
    const num = Number(value);
    if (isNaN(num)) {
      return '0%';
    }
    return `${num.toFixed(decimals)}%`;
  } catch {
    return '0%';
  }
};

export default {
  safeFormatNumber,
  safeFormatCurrency,
  safeFormatPercentage,
};
