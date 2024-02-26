import { Hono } from 'hono'
import { cors } from 'hono/cors'
import PaymentProcessor from './lib/Braintree';

const app = new Hono()
app.use('*', cors());

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/checkout', async (c) => {
  const { paymentMethodNonce } = await c.req.json();
  const amount = "35.0"
  const paymentProcessor = await new PaymentProcessor().processPayment(amount, paymentMethodNonce);
  return c.json(paymentProcessor);
})

export default {
  port: 8081,
  fetch: app.fetch
}
