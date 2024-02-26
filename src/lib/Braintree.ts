import braintree, { Environment } from 'braintree';

const initializeBraintreeGateway = () => {
    return new braintree.BraintreeGateway({
        environment: Environment.Sandbox,
        merchantId: String(process.env.BRAINTREE_MERCHANT_ID),
        publicKey: String(process.env.BRAINTREE_PUBLIC_KEY),
        privateKey: String(process.env.BRAINTREE_PRIVATE_KEY)
    });
};

const processPayment = async (amount: string, paymentMethodNonce: string): Promise<braintree.ValidatedResponse<braintree.Transaction>> => {
    const gateway = initializeBraintreeGateway();
    try {
        return await gateway.transaction.sale({
            amount: amount,
            paymentMethodNonce: paymentMethodNonce,
            options: {
                submitForSettlement: true
            }
        });
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const generateClientToken = async (): Promise<braintree.ValidatedResponse<braintree.ClientToken>> => {
    const gateway = initializeBraintreeGateway();
    try {
        return await gateway.clientToken.generate({});
    } catch (err) {
        throw err;
    };
};

// Exportar las funciones para su uso en otros módulos
export { processPayment, generateClientToken };