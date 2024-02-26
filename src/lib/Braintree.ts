import braintree, { Environment } from 'braintree';
import { env } from 'hono/adapter'

class PaymentProcessor {
    private gateway: braintree.BraintreeGateway;
    constructor() {
        this.gateway = new braintree.BraintreeGateway({
            environment: Environment.Sandbox,
            merchantId: String(process.env.BRAINTREE_MERCHANT_ID),
            publicKey: String(process.env.BRAINTREE_PUBLIC_KEY),
            privateKey: String(process.env.BRAINTREE_PRIVATE_KEY)
        });
    }

    processPayment(amount: string, paymentMethodNonce: string): Promise<braintree.ValidatedResponse<braintree.Transaction>> {
        return this.gateway.transaction.sale({
            amount: amount,
            paymentMethodNonce: paymentMethodNonce,
            options: {
                submitForSettlement: true
            }
        }).then(res => {
            return res; // La promesa se resuelve con este valor
        }).catch(err => {
            throw err; // La promesa se rechaza con este error
        });
    }
}

export default PaymentProcessor;