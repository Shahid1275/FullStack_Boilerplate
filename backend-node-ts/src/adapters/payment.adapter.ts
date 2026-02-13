/**
 * Payment Adapter - External payment gateway integration
 * Implements Adapter Pattern for payment processing
 */

export interface PaymentProvider {
  charge(amount: number, currency: string, metadata?: Record<string, any>): Promise<PaymentResult>;
  refund(transactionId: string, amount?: number): Promise<RefundResult>;
  getPaymentStatus(transactionId: string): Promise<PaymentStatus>;
}

export interface PaymentResult {
  success: boolean;
  transactionId: string;
  amount: number;
  currency: string;
  chargedAt: Date;
}

export interface RefundResult {
  success: boolean;
  refundId: string;
  amount: number;
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

/**
 * Stripe Payment Adapter
 */
export class StripeAdapter implements PaymentProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async charge(amount: number, currency: string, metadata?: Record<string, any>): Promise<PaymentResult> {
    // Stripe API integration
    console.log(`Processing Stripe payment: ${amount} ${currency}`);
    
    return {
      success: true,
      transactionId: `stripe_${Date.now()}`,
      amount,
      currency,
      chargedAt: new Date(),
    };
  }

  async refund(transactionId: string, amount?: number): Promise<RefundResult> {
    console.log(`Processing Stripe refund for ${transactionId}`);
    
    return {
      success: true,
      refundId: `refund_${Date.now()}`,
      amount: amount || 0,
    };
  }

  async getPaymentStatus(transactionId: string): Promise<PaymentStatus> {
    console.log(`Checking Stripe payment status: ${transactionId}`);
    return PaymentStatus.COMPLETED;
  }
}

/**
 * PayPal Payment Adapter
 */
export class PayPalAdapter implements PaymentProvider {
  private clientId: string;
  private clientSecret: string;

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  async charge(amount: number, currency: string, metadata?: Record<string, any>): Promise<PaymentResult> {
    // PayPal API integration
    console.log(`Processing PayPal payment: ${amount} ${currency}`);
    
    return {
      success: true,
      transactionId: `paypal_${Date.now()}`,
      amount,
      currency,
      chargedAt: new Date(),
    };
  }

  async refund(transactionId: string, amount?: number): Promise<RefundResult> {
    console.log(`Processing PayPal refund for ${transactionId}`);
    
    return {
      success: true,
      refundId: `refund_${Date.now()}`,
      amount: amount || 0,
    };
  }

  async getPaymentStatus(transactionId: string): Promise<PaymentStatus> {
    console.log(`Checking PayPal payment status: ${transactionId}`);
    return PaymentStatus.COMPLETED;
  }
}

/**
 * Payment Adapter Factory
 */
export class PaymentAdapterFactory {
  static create(provider: 'stripe' | 'paypal', config: any): PaymentProvider {
    switch (provider) {
      case 'stripe':
        return new StripeAdapter(config.apiKey);
      case 'paypal':
        return new PayPalAdapter(config.clientId, config.clientSecret);
      default:
        throw new Error(`Unknown payment provider: ${provider}`);
    }
  }
}
