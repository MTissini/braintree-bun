import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { processPayment, generateClientToken } from './lib/Braintree'

const app = new Hono()
app.use('*', cors());

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/checkout', async (c) => {
  const { paymentMethodNonce, amount } = await c.req.json();
  const paymentProcessor = await processPayment(amount, paymentMethodNonce);
  return c.json(paymentProcessor);

});

app.get('/checkout/generate-token', async (c) => {
  const clientToken = await generateClientToken();
  return c.json(clientToken);
});

export default {
  port: 8081,
  fetch: app.fetch
}
