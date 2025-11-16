// Utility functions for validation

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} Whether URL is valid
 */
export const isValidUrl = (url) => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate phone number (US format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Whether phone number is valid
 */
export const isValidPhone = (phone) => {
  if (!phone) return false;
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result with strength and messages
 */
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, strength: 'none', messages: ['Password is required'] };
  }

  const messages = [];
  let strength = 0;

  // Length check
  if (password.length < 8) {
    messages.push('Password must be at least 8 characters');
  } else {
    strength += 1;
  }

  // Uppercase check
  if (!/[A-Z]/.test(password)) {
    messages.push('Password must contain at least one uppercase letter');
  } else {
    strength += 1;
  }

  // Lowercase check
  if (!/[a-z]/.test(password)) {
    messages.push('Password must contain at least one lowercase letter');
  } else {
    strength += 1;
  }

  // Number check
  if (!/[0-9]/.test(password)) {
    messages.push('Password must contain at least one number');
  } else {
    strength += 1;
  }

  // Special character check
  if (!/[^A-Za-z0-9]/.test(password)) {
    messages.push('Password must contain at least one special character');
  } else {
    strength += 1;
  }

  const strengthLevels = ['weak', 'fair', 'good', 'strong', 'very strong'];
  const strengthLabel = strengthLevels[Math.min(strength - 1, 4)] || 'weak';

  return {
    isValid: messages.length === 0,
    strength: strengthLabel,
    score: strength,
    messages,
  };
};

/**
 * Validate file size
 * @param {File} file - File to validate
 * @param {number} maxSize - Maximum size in bytes
 * @returns {boolean} Whether file size is valid
 */
export const isValidFileSize = (file, maxSize) => {
  if (!file) return false;
  return file.size <= maxSize;
};

/**
 * Validate file type
 * @param {File} file - File to validate
 * @param {string[]} allowedTypes - Array of allowed file extensions
 * @returns {boolean} Whether file type is valid
 */
export const isValidFileType = (file, allowedTypes) => {
  if (!file) return false;
  const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
  return allowedTypes.includes(fileExtension);
};

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @returns {boolean} Whether value is present
 */
export const isRequired = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

/**
 * Validate minimum length
 * @param {string} value - Value to validate
 * @param {number} minLength - Minimum length
 * @returns {boolean} Whether value meets minimum length
 */
export const hasMinLength = (value, minLength) => {
  if (!value) return false;
  return value.length >= minLength;
};

/**
 * Validate maximum length
 * @param {string} value - Value to validate
 * @param {number} maxLength - Maximum length
 * @returns {boolean} Whether value meets maximum length
 */
export const hasMaxLength = (value, maxLength) => {
  if (!value) return true;
  return value.length <= maxLength;
};

/**
 * Validate number range
 * @param {number} value - Value to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {boolean} Whether value is in range
 */
export const isInRange = (value, min, max) => {
  const num = parseFloat(value);
  if (isNaN(num)) return false;
  return num >= min && num <= max;
};

/**
 * Validate positive number
 * @param {number} value - Value to validate
 * @returns {boolean} Whether value is positive
 */
export const isPositiveNumber = (value) => {
  const num = parseFloat(value);
  return !isNaN(num) && num > 0;
};

/**
 * Validate JSON string
 * @param {string} str - String to validate
 * @returns {boolean} Whether string is valid JSON
 */
export const isValidJSON = (str) => {
  if (!str) return false;
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate credit card number (Luhn algorithm)
 * @param {string} cardNumber - Card number to validate
 * @returns {boolean} Whether card number is valid
 */
export const isValidCreditCard = (cardNumber) => {
  if (!cardNumber) return false;

  const cleaned = cardNumber.replace(/\s/g, '');
  if (!/^\d+$/.test(cleaned)) return false;

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

/**
 * Validate date format (YYYY-MM-DD)
 * @param {string} date - Date string to validate
 * @returns {boolean} Whether date is valid
 */
export const isValidDate = (date) => {
  if (!date) return false;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;

  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
};

/**
 * Validate hex color
 * @param {string} color - Color string to validate
 * @returns {boolean} Whether color is valid hex
 */
export const isValidHexColor = (color) => {
  if (!color) return false;
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexRegex.test(color);
};
