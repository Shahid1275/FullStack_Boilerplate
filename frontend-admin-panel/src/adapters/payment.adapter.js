// Payment Adapter Interface
export class PaymentAdapter {
  processPayment(amount, method) {
    throw new Error('Method not implemented')
  }
}

// Stripe Adapter
export class StripeAdapter extends PaymentAdapter {
  processPayment(amount, method) {
    console.log(`Processing $${amount} via Stripe`)
    return { success: true, provider: 'Stripe' }
  }
}

// PayPal Adapter
export class PayPalAdapter extends PaymentAdapter {
  processPayment(amount, method) {
    console.log(`Processing $${amount} via PayPal`)
    return { success: true, provider: 'PayPal' }
  }
}

export default { StripeAdapter, PayPalAdapter }
