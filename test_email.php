<?php
/**
 * Test script to verify email configuration
 * 
 * Visit this page in your browser to test if email sending works
 * Example: https://www.street66bar.com/test_email.php
 */

require_once 'config.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Configuration Test - Street 66 Bar</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #d4af37;
            border-bottom: 3px solid #d4af37;
            padding-bottom: 10px;
        }
        .success {
            background: #d4edda;
            color: #155724;
            padding: 15px;
            border-radius: 5px;
            border: 2px solid #c3e6cb;
            margin: 20px 0;
        }
        .error {
            background: #f8d7da;
            color: #721c24;
            padding: 15px;
            border-radius: 5px;
            border: 2px solid #f5c6cb;
            margin: 20px 0;
        }
        .info {
            background: #f9f9f9;
            padding: 15px;
            border-left: 4px solid #d4af37;
            margin: 20px 0;
        }
        pre {
            background: #2c2c2c;
            color: #f5f5f5;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
        }
        a {
            color: #d4af37;
            text-decoration: none;
            font-weight: bold;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🍸 Street 66 Bar - Email Configuration Test</h1>
        
        <div class="info">
            <p><strong>📧 Contact Email:</strong> <?php echo CONTACT_EMAIL; ?></p>
            <p><strong>🏢 Site Name:</strong> <?php echo SITE_NAME; ?></p>
            <p><strong>🌐 Site URL:</strong> <?php echo SITE_URL; ?></p>
            <p><strong>📤 From Email:</strong> <?php echo EMAIL_FROM; ?></p>
        </div>

        <?php
        // Test email sending
        $test_email = mail(
            CONTACT_EMAIL,
            EMAIL_SUBJECT_PREFIX . "Test Email from Website",
            "This is a test email to verify the contact form configuration is working correctly.\n\nSent at: " . date('d/m/Y H:i:s'),
            "From: " . EMAIL_FROM . "\r\n" .
            "Reply-To: " . EMAIL_FROM . "\r\n" .
            "X-Mailer: PHP/" . phpversion()
        );

        if ($test_email) {
            echo '<div class="success">';
            echo '<strong>✅ SUCCESS!</strong><br>';
            echo 'Test email sent successfully to <strong>' . CONTACT_EMAIL . '</strong><br>';
            echo 'Please check your inbox (and spam folder) to confirm delivery.';
            echo '</div>';
        } else {
            echo '<div class="error">';
            echo '<strong>❌ ERROR!</strong><br>';
            echo 'Failed to send test email.<br>';
            echo 'This could mean:';
            echo '<ul>';
            echo '<li>PHP mail() function is not configured on this server</li>';
            echo '<li>Your hosting provider blocks email sending</li>';
            echo '<li>SMTP settings need to be configured</li>';
            echo '</ul>';
            echo '<p><strong>Solution:</strong> Contact your hosting provider or use an SMTP service like PHPMailer with Gmail/SendGrid.</p>';
            echo '</div>';
        }
        ?>

        <h2>📊 PHP Mail Configuration:</h2>
        <pre><?php
echo "mail() function available: " . (function_exists('mail') ? 'Yes ✅' : 'No ❌') . "\n";
echo "SMTP server: " . (ini_get('SMTP') ?: 'Not configured') . "\n";
echo "SMTP port: " . (ini_get('smtp_port') ?: 'Not configured') . "\n";
echo "sendmail_path: " . (ini_get('sendmail_path') ?: 'Not configured') . "\n";
echo "PHP version: " . phpversion() . "\n";
        ?></pre>

        <h2>🔧 Next Steps:</h2>
        <div class="info">
            <ol>
                <li>If the test passed, your contact form is ready! ✅</li>
                <li>If the test failed, you need to:
                    <ul>
                        <li>Contact your hosting provider to enable PHP mail()</li>
                        <li>Or use PHPMailer with SMTP (Gmail, SendGrid, etc.)</li>
                        <li>Or use a third-party form service like FormSpree</li>
                    </ul>
                </li>
                <li>Update <code>config.php</code> with your actual domain and email</li>
                <li><strong>Delete this test file</strong> after testing for security!</li>
            </ol>
        </div>

        <p style="text-align: center; margin-top: 30px;">
            <a href="contact.html">← Back to Contact Page</a>
        </p>
    </div>
</body>
</html>
