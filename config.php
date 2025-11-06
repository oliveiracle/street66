<?php
/**
 * Street 66 Bar - Contact Form Configuration
 * 
 * Security settings and email configuration
 */

// Email Configuration
define('CONTACT_EMAIL', 'street1@street66.ie');
define('SITE_NAME', 'Street 66 Bar');
define('SITE_URL', 'https://www.street66bar.com'); // Update with your domain

// Security Settings
define('ENABLE_RATE_LIMIT', true);
define('MAX_SUBMISSIONS_PER_HOUR', 5);

// Form Field Validation
define('MIN_NAME_LENGTH', 2);
define('MAX_NAME_LENGTH', 100);
define('MIN_MESSAGE_LENGTH', 10);
define('MAX_MESSAGE_LENGTH', 1000);

// Email Settings
define('EMAIL_FROM', 'noreply@street66bar.com'); // Update with your domain
define('EMAIL_SUBJECT_PREFIX', '[Street 66] ');

// Allowed origins (for security)
$allowed_origins = [
    'https://www.street66bar.com',
    'http://localhost',
    'http://127.0.0.1'
];

// Session settings for rate limiting
if (ENABLE_RATE_LIMIT && session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>
