<?php
/**
 * Street 66 Bar - Contact Form Processing Script
 * 
 * Handles form submissions from contact.html
 * Validates input, sends email, and provides user feedback
 */

// Load configuration
require_once 'config.php';

// Set headers for security
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

/**
 * Main form processing
 */
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Initialize response array
    $response = [
        'success' => false,
        'errors' => [],
        'message' => ''
    ];
    
    // Rate limiting check
    if (ENABLE_RATE_LIMIT && !checkRateLimit()) {
        redirectWithError('Too many submissions. Please try again later.');
        exit;
    }
    
    // Sanitize and validate input
    $name = sanitizeInput($_POST['name'] ?? '');
    $email = sanitizeInput($_POST['email'] ?? '');
    $phone = sanitizeInput($_POST['phone'] ?? '');
    $subject = sanitizeInput($_POST['subject'] ?? '');
    $message = sanitizeInput($_POST['message'] ?? '');
    
    // Validation
    $errors = validateForm($name, $email, $phone, $subject, $message);
    
    if (!empty($errors)) {
        redirectWithError(implode(' ', $errors));
        exit;
    }
    
    // Prepare email
    $emailSent = sendContactEmail($name, $email, $phone, $subject, $message);
    
    if ($emailSent) {
        // Update rate limit counter
        if (ENABLE_RATE_LIMIT) {
            updateRateLimitCounter();
        }
        
        // Redirect to success page
        header('Location: contact.html?success=true');
        exit;
    } else {
        redirectWithError('Failed to send message. Please try again or contact us directly.');
        exit;
    }
    
} else {
    // Not a POST request
    header('Location: contact.html');
    exit;
}

/**
 * Sanitize user input
 */
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

/**
 * Validate form data
 */
function validateForm($name, $email, $phone, $subject, $message) {
    $errors = [];
    
    // Name validation
    if (empty($name)) {
        $errors[] = 'Name is required.';
    } elseif (strlen($name) < MIN_NAME_LENGTH) {
        $errors[] = 'Name must be at least ' . MIN_NAME_LENGTH . ' characters.';
    } elseif (strlen($name) > MAX_NAME_LENGTH) {
        $errors[] = 'Name is too long.';
    }
    
    // Email validation
    if (empty($email)) {
        $errors[] = 'Email is required.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Invalid email format.';
    }
    
    // Phone validation (optional but if provided, must be valid)
    if (!empty($phone) && !preg_match('/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/', $phone)) {
        $errors[] = 'Invalid phone number format.';
    }
    
    // Subject validation
    if (empty($subject)) {
        $errors[] = 'Subject is required.';
    }
    
    // Message validation
    if (empty($message)) {
        $errors[] = 'Message is required.';
    } elseif (strlen($message) < MIN_MESSAGE_LENGTH) {
        $errors[] = 'Message must be at least ' . MIN_MESSAGE_LENGTH . ' characters.';
    } elseif (strlen($message) > MAX_MESSAGE_LENGTH) {
        $errors[] = 'Message is too long (max ' . MAX_MESSAGE_LENGTH . ' characters).';
    }
    
    return $errors;
}

/**
 * Send contact email
 */
function sendContactEmail($name, $email, $phone, $subject, $message) {
    $to = CONTACT_EMAIL;
    $email_subject = EMAIL_SUBJECT_PREFIX . $subject;
    
    // Email headers
    $headers = [
        'From: ' . EMAIL_FROM,
        'Reply-To: ' . $email,
        'X-Mailer: PHP/' . phpversion(),
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8'
    ];
    
    // Email body (HTML format)
    $email_body = generateEmailBody($name, $email, $phone, $subject, $message);
    
    // Send email
    return mail($to, $email_subject, $email_body, implode("\r\n", $headers));
}

/**
 * Generate HTML email body
 */
function generateEmailBody($name, $email, $phone, $subject, $message) {
    $html = '
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
            .header { background: #1a1a1a; color: #d4af37; padding: 20px; text-align: center; }
            .content { background: white; padding: 30px; margin: 20px 0; border-radius: 5px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #d4af37; }
            .value { margin-top: 5px; padding: 10px; background: #f5f5f5; border-left: 3px solid #d4af37; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🍸 Street 66 Bar</h1>
                <p>New Contact Form Submission</p>
            </div>
            
            <div class="content">
                <div class="field">
                    <div class="label">📧 Subject:</div>
                    <div class="value">' . htmlspecialchars($subject) . '</div>
                </div>
                
                <div class="field">
                    <div class="label">👤 Name:</div>
                    <div class="value">' . htmlspecialchars($name) . '</div>
                </div>
                
                <div class="field">
                    <div class="label">✉️ Email:</div>
                    <div class="value"><a href="mailto:' . htmlspecialchars($email) . '">' . htmlspecialchars($email) . '</a></div>
                </div>
                
                ' . (!empty($phone) ? '
                <div class="field">
                    <div class="label">📱 Phone:</div>
                    <div class="value"><a href="tel:' . htmlspecialchars($phone) . '">' . htmlspecialchars($phone) . '</a></div>
                </div>
                ' : '') . '
                
                <div class="field">
                    <div class="label">💬 Message:</div>
                    <div class="value">' . nl2br(htmlspecialchars($message)) . '</div>
                </div>
                
                <div class="field">
                    <div class="label">🕐 Submitted:</div>
                    <div class="value">' . date('d/m/Y H:i:s') . '</div>
                </div>
            </div>
            
            <div class="footer">
                <p>This message was sent from the contact form at ' . SITE_URL . '</p>
                <p>Street 66 Bar | 33-34 Parliament St, Temple Bar, Dublin</p>
            </div>
        </div>
    </body>
    </html>
    ';
    
    return $html;
}

/**
 * Check rate limit
 */
function checkRateLimit() {
    if (!isset($_SESSION['form_submissions'])) {
        $_SESSION['form_submissions'] = [];
    }
    
    // Clean old submissions (older than 1 hour)
    $one_hour_ago = time() - 3600;
    $_SESSION['form_submissions'] = array_filter(
        $_SESSION['form_submissions'],
        function($timestamp) use ($one_hour_ago) {
            return $timestamp > $one_hour_ago;
        }
    );
    
    // Check if limit exceeded
    return count($_SESSION['form_submissions']) < MAX_SUBMISSIONS_PER_HOUR;
}

/**
 * Update rate limit counter
 */
function updateRateLimitCounter() {
    if (!isset($_SESSION['form_submissions'])) {
        $_SESSION['form_submissions'] = [];
    }
    $_SESSION['form_submissions'][] = time();
}

/**
 * Redirect with error message
 */
function redirectWithError($error) {
    $encoded_error = urlencode($error);
    header("Location: contact.html?error=" . $encoded_error);
    exit;
}
?>
