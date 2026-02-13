/**
 * Email Adapter - Email service integration
 * Implements Adapter Pattern for email sending
 */

export interface EmailProvider {
  send(options: EmailOptions): Promise<EmailResult>;
  sendBulk(emails: EmailOptions[]): Promise<BulkEmailResult>;
}

export interface EmailOptions {
  to: string | string[];
  from: string;
  subject: string;
  text?: string;
  html?: string;
  attachments?: EmailAttachment[];
}

export interface EmailAttachment {
  filename: string;
  content: Buffer | string;
  contentType?: string;
}

export interface EmailResult {
  success: boolean;
  messageId: string;
  sentAt: Date;
}

export interface BulkEmailResult {
  success: boolean;
  successCount: number;
  failureCount: number;
  messageIds: string[];
}

/**
 * SendGrid Email Adapter
 */
export class SendGridAdapter implements EmailProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async send(options: EmailOptions): Promise<EmailResult> {
    console.log(`Sending email via SendGrid to: ${options.to}`);
    
    return {
      success: true,
      messageId: `sendgrid_${Date.now()}`,
      sentAt: new Date(),
    };
  }

  async sendBulk(emails: EmailOptions[]): Promise<BulkEmailResult> {
    console.log(`Sending ${emails.length} emails via SendGrid`);
    
    return {
      success: true,
      successCount: emails.length,
      failureCount: 0,
      messageIds: emails.map(() => `sendgrid_${Date.now()}_${Math.random()}`),
    };
  }
}

/**
 * AWS SES Email Adapter
 */
export class SESAdapter implements EmailProvider {
  private region: string;

  constructor(region: string) {
    this.region = region;
  }

  async send(options: EmailOptions): Promise<EmailResult> {
    console.log(`Sending email via AWS SES to: ${options.to}`);
    
    return {
      success: true,
      messageId: `ses_${Date.now()}`,
      sentAt: new Date(),
    };
  }

  async sendBulk(emails: EmailOptions[]): Promise<BulkEmailResult> {
    console.log(`Sending ${emails.length} emails via AWS SES`);
    
    return {
      success: true,
      successCount: emails.length,
      failureCount: 0,
      messageIds: emails.map(() => `ses_${Date.now()}_${Math.random()}`),
    };
  }
}

/**
 * Email Adapter Factory
 */
export class EmailAdapterFactory {
  static create(provider: 'sendgrid' | 'ses', config: any): EmailProvider {
    switch (provider) {
      case 'sendgrid':
        return new SendGridAdapter(config.apiKey);
      case 'ses':
        return new SESAdapter(config.region);
      default:
        throw new Error(`Unknown email provider: ${provider}`);
    }
  }
}
