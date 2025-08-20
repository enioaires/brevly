/**
 * Email Configuration Service
 * Loads and validates email configuration from environment variables
 */

export interface EmailConfig {
  gmailUser: string;
  gmailPassword: string;
  adminEmail: string;
  fromEmail: string;
  enabled: boolean;
}

/**
 * Loads email configuration from environment variables
 * Provides default values for brevlydigital.com domain
 */
export function loadEmailConfig(): EmailConfig {
  const config: EmailConfig = {
    gmailUser: process.env.GMAIL_USER || '',
    gmailPassword: process.env.GMAIL_APP_PASSWORD || '',
    adminEmail: process.env.ADMIN_EMAIL || 'admin@brevlydigital.com',
    fromEmail: process.env.FROM_EMAIL || 'noreply@brevlydigital.com',
    enabled: process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true'
  };

  return config;
}

/**
 * Validates if the email configuration is complete and valid
 * Returns validation result with details about missing or invalid fields
 */
export function validateEmailConfig(config: EmailConfig): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check required fields for Gmail configuration
  if (!config.gmailUser) {
    errors.push('GMAIL_USER environment variable is required');
  } else if (!isValidEmail(config.gmailUser)) {
    errors.push('GMAIL_USER must be a valid email address');
  }

  if (!config.gmailPassword) {
    errors.push('GMAIL_APP_PASSWORD environment variable is required');
  }

  // Validate email addresses
  if (!isValidEmail(config.adminEmail)) {
    errors.push('ADMIN_EMAIL must be a valid email address');
  }

  if (!isValidEmail(config.fromEmail)) {
    errors.push('FROM_EMAIL must be a valid email address');
  }

  // Add warnings for default values
  if (config.adminEmail === 'admin@brevlydigital.com') {
    warnings.push('Using default admin email: admin@brevlydigital.com');
  }

  if (config.fromEmail === 'noreply@brevlydigital.com') {
    warnings.push('Using default from email: noreply@brevlydigital.com');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Checks if the email service is properly configured and enabled
 * Returns true if all required configuration is present and service is enabled
 */
export function isEmailServiceEnabled(): boolean {
  const config = loadEmailConfig();
  
  if (!config.enabled) {
    return false;
  }

  const validation = validateEmailConfig(config);
  return validation.isValid;
}

/**
 * Gets the current email configuration with validation status
 * Useful for debugging and monitoring
 */
export function getEmailConfigStatus(): {
  config: EmailConfig;
  validation: ReturnType<typeof validateEmailConfig>;
  serviceEnabled: boolean;
} {
  const config = loadEmailConfig();
  const validation = validateEmailConfig(config);
  const serviceEnabled = isEmailServiceEnabled();

  return {
    config,
    validation,
    serviceEnabled
  };
}

/**
 * Simple email validation helper
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Logs configuration status for debugging
 * Safe logging that doesn't expose sensitive information
 */
export function logEmailConfigStatus(): void {
  const status = getEmailConfigStatus();
  
  console.log('Email Service Configuration Status:');
  console.log(`- Service Enabled: ${status.serviceEnabled}`);
  console.log(`- Gmail User Configured: ${!!status.config.gmailUser}`);
  console.log(`- Gmail Password Configured: ${!!status.config.gmailPassword}`);
  console.log(`- Admin Email: ${status.config.adminEmail}`);
  console.log(`- From Email: ${status.config.fromEmail}`);
  
  if (status.validation.warnings.length > 0) {
    console.warn('Configuration Warnings:');
    status.validation.warnings.forEach(warning => console.warn(`- ${warning}`));
  }
  
  if (status.validation.errors.length > 0) {
    console.error('Configuration Errors:');
    status.validation.errors.forEach(error => console.error(`- ${error}`));
  }
}