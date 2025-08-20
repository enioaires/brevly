/**
 * Email Service using Nodemailer with Gmail
 * Handles sending waitlist notification emails to administrators
 */

import nodemailer from 'nodemailer';
import { loadEmailConfig, isEmailServiceEnabled, logEmailConfigStatus } from './email-config';
import { createWaitlistNotificationTemplate, type WaitlistNotificationData } from './email-templates';

// Types for waitlist data (matching the Prisma model structure)
interface WaitlistEntry {
  id: string;
  email: string;
  projectDetails: string;
  phoneNumber: string | null;
  companyName: string | null;
  createdAt: Date;
}

interface EmailService {
  sendWaitlistNotification(entry: WaitlistEntry): Promise<void>;
}

/**
 * Email service implementation using Nodemailer with Gmail
 */
class NodemailerEmailService implements EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private config = loadEmailConfig();

  /**
   * Creates and configures the Gmail transporter
   * Returns null if configuration is invalid
   */
  private createTransporter(): nodemailer.Transporter | null {
    try {
      if (!isEmailServiceEnabled()) {
        console.warn('Email service is not enabled or properly configured');
        return null;
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: this.config.gmailUser,
          pass: this.config.gmailPassword,
        },
      });

      return transporter;
    } catch (error) {
      console.error('Failed to create email transporter:', error);
      return null;
    }
  }

  /**
   * Gets or creates the transporter instance
   */
  private getTransporter(): nodemailer.Transporter | null {
    if (!this.transporter) {
      this.transporter = this.createTransporter();
    }
    return this.transporter;
  }

  /**
   * Creates the email content for waitlist notifications using the template system
   */
  private createEmailContent(entry: WaitlistEntry): { subject: string; html: string; text: string } {
    // Convert WaitlistEntry to WaitlistNotificationData format
    const templateData: WaitlistNotificationData = {
      email: entry.email,
      projectDetails: entry.projectDetails,
      phoneNumber: entry.phoneNumber || undefined,
      companyName: entry.companyName || undefined,
      createdAt: entry.createdAt,
    };

    // Use the template system to generate the email content
    return createWaitlistNotificationTemplate(templateData);
  }

  /**
   * Sends a waitlist notification email to the administrator
   * Handles errors gracefully without throwing exceptions
   */
  async sendWaitlistNotification(entry: WaitlistEntry): Promise<void> {
    try {
      // Check if service is enabled
      if (!isEmailServiceEnabled()) {
        console.info('Email service is disabled or not configured, skipping notification');
        return;
      }

      const transporter = this.getTransporter();
      if (!transporter) {
        console.warn('Email transporter not available, skipping notification');
        return;
      }

      const emailContent = this.createEmailContent(entry);

      const mailOptions = {
        from: this.config.fromEmail,
        to: this.config.adminEmail,
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
      };

      console.log(`Sending waitlist notification email for entry: ${entry.id}`);
      
      const result = await transporter.sendMail(mailOptions);
      
      console.log(`Waitlist notification email sent successfully:`, {
        messageId: result.messageId,
        entryId: entry.id,
        recipientEmail: this.config.adminEmail,
      });

    } catch (error) {
      // Log error but don't throw - this should not affect the main flow
      console.error('Failed to send waitlist notification email:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        entryId: entry.id,
        entryEmail: entry.email,
        timestamp: new Date().toISOString(),
      });
    }
  }
}

// Singleton instance
let emailServiceInstance: EmailService | null = null;

/**
 * Gets the email service instance
 * Creates a new instance if one doesn't exist
 */
export function getEmailService(): EmailService {
  if (!emailServiceInstance) {
    emailServiceInstance = new NodemailerEmailService();
  }
  return emailServiceInstance;
}

/**
 * Convenience function to send waitlist notification
 * This is the main function that should be called from the API
 */
export async function sendWaitlistNotification(entry: WaitlistEntry): Promise<void> {
  const emailService = getEmailService();
  await emailService.sendWaitlistNotification(entry);
}

/**
 * Test function to verify email service configuration
 * Useful for debugging and health checks
 */
export async function testEmailService(): Promise<{ success: boolean; message: string }> {
  try {
    if (!isEmailServiceEnabled()) {
      logEmailConfigStatus();
      return {
        success: false,
        message: 'Email service is not enabled or properly configured'
      };
    }

    const testEntry: WaitlistEntry = {
      id: 'test-' + Date.now(),
      email: 'test@example.com',
      projectDetails: 'Test project for email service verification',
      phoneNumber: '+55 11 99999-9999',
      companyName: 'Test Company',
      createdAt: new Date(),
    };

    await sendWaitlistNotification(testEntry);
    
    return {
      success: true,
      message: 'Test email sent successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: `Email service test failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

// Export types for use in other modules
export type { WaitlistEntry, EmailService };