/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with isValid and message
 */
export const validatePassword = (password) => {
  if (!password) {
    return {
      isValid: false,
      message: 'Password wajib diisi'
    };
  }
  
  if (password.length < 8) {
    return {
      isValid: false,
      message: 'Password minimal 8 karakter'
    };
  }
  
  // Check for at least one number
  if (!/\d/.test(password)) {
    return {
      isValid: false,
      message: 'Password harus mengandung minimal 1 angka'
    };
  }
  
  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password harus mengandung minimal 1 huruf kapital'
    };
  }
  
  return {
    isValid: true,
    message: 'Password valid'
  };
};

/**
 * Validate username format
 * @param {string} username - Username to validate
 * @returns {Object} Validation result with isValid and message
 */
export const validateUsername = (username) => {
  if (!username) {
    return {
      isValid: false,
      message: 'Username wajib diisi'
    };
  }
  
  if (username.length < 3) {
    return {
      isValid: false,
      message: 'Username minimal 3 karakter'
    };
  }
  
  if (username.length > 20) {
    return {
      isValid: false,
      message: 'Username maksimal 20 karakter'
    };
  }
  
  // Check if username contains only alphanumeric and underscore
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return {
      isValid: false,
      message: 'Username hanya boleh berisi huruf, angka, dan underscore'
    };
  }
  
  return {
    isValid: true,
    message: 'Username valid'
  };
};

/**
 * Validate form fields
 * @param {Object} fields - Object containing form fields
 * @param {Object} rules - Validation rules for each field
 * @returns {Object} Validation errors
 */
export const validateForm = (fields, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(fieldName => {
    const fieldRules = rules[fieldName];
    const fieldValue = fields[fieldName];
    
    // Required validation
    if (fieldRules.required && (!fieldValue || fieldValue.trim() === '')) {
      errors[fieldName] = fieldRules.requiredMessage || `${fieldName} wajib diisi`;
      return;
    }
    
    // Minimum length validation
    if (fieldRules.minLength && fieldValue && fieldValue.length < fieldRules.minLength) {
      errors[fieldName] = fieldRules.minLengthMessage || `${fieldName} minimal ${fieldRules.minLength} karakter`;
      return;
    }
    
    // Maximum length validation
    if (fieldRules.maxLength && fieldValue && fieldValue.length > fieldRules.maxLength) {
      errors[fieldName] = fieldRules.maxLengthMessage || `${fieldName} maksimal ${fieldRules.maxLength} karakter`;
      return;
    }
    
    // Pattern validation
    if (fieldRules.pattern && fieldValue && !fieldRules.pattern.test(fieldValue)) {
      errors[fieldName] = fieldRules.patternMessage || `${fieldName} tidak valid`;
      return;
    }
    
    // Custom validation
    if (fieldRules.validate && fieldValue) {
      const customValidation = fieldRules.validate(fieldValue, fields);
      if (customValidation !== true) {
        errors[fieldName] = customValidation;
        return;
      }
    }
  });
  
  return errors;
};

/**
 * Check if an object is empty
 * @param {Object} obj - Object to check
 * @returns {boolean} True if empty
 */
export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid
 */
export const isValidUrl = (url) => {
  if (!url) return false;
  
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};
