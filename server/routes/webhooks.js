import express from 'express';
import crypto from 'crypto';
import { importOrder } from '../lib/merchize.js';

const router = express.Router();

// ─── Stripe webhook (payment confirmation → trigger Merchize order) ───────────

/**
 * POST /api/webhooks/stripe
 *
 * Stripe sends this event when a checkout session completes. We then import the
 * order into Merchize for fulfillment.
 *
 * To enable:
 *   1. Set STRIPE_SECRET_KEY + STRIPE_WEBHOOK_SECRET in .env
 *   2. In Stripe Dashboard → Webhooks, add this endpoint and select
 *      "checkout.session.completed"
 *   3. In Stripe Dashboard → Checkout, enable "Collect shipping addresses"
 */
router.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

  if (!STRIPE_SECRET_KEY) {
    return res.status(503).json({ error: 'Stripe is not configured on this server' });
  }

  let stripe;
  try {
    const { default: Stripe } = await import('stripe');
    stripe = new Stripe(STRIPE_SECRET_KEY);
  } catch {
    return res.status(503).json({ error: 'stripe package not installed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('[stripe-webhook] Signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook signature invalid: ${err.message}` });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    await handleStripeSessionCompleted(session);
  }

  res.json({ received: true });
});

async function handleStripeSessionCompleted(session) {
  try {
    const metadata = session.metadata || {};
    const cartJson = metadata.cart;
    if (!cartJson) {
      console.warn('[stripe-webhook] No cart in session metadata, skipping Merchize import');
      return;
    }

    const cart = JSON.parse(cartJson);
    const shipping = session.shipping_details?.address;
    const customer = session.customer_details;

    if (!shipping) {
      console.warn('[stripe-webhook] No shipping details in session, skipping Merchize import');
      return;
    }

    const orderId = `TINC-STR-${session.id.slice(-8).toUpperCase()}`;

    await importOrder({
      order_id: orderId,
      shipping_info: {
        full_name: customer?.name || metadata.customerName || 'Customer',
        address_1: shipping.line1,
        ...(shipping.line2 && { address_2: shipping.line2 }),
        city: shipping.city,
        state: shipping.state,
        postcode: shipping.postal_code,
        country: shipping.country || 'US',
        email: customer?.email || metadata.customerEmail || '',
        ...(customer?.phone && { phone: customer.phone }),
      },
      items: cart.map((item) => ({
        name: item.product.name,
        sku: item.product.sku,
        merchize_sku: item.product.sku,
        quantity: item.quantity,
        price: item.product.price,
        currency: 'USD',
        attributes: [{ name: 'Style', option: item.variant }],
      })),
      tags: ['tourettes-inc-website', 'stripe'],
    });

    console.log(`[stripe-webhook] Imported Merchize order ${orderId} for Stripe session ${session.id}`);
  } catch (err) {
    console.error('[stripe-webhook] Merchize import failed:', err.message, err.body || '');
  }
}

// ─── Merchize webhook (fulfillment status updates back to us) ─────────────────

/**
 * POST /api/webhooks/merchize
 *
 * Merchize calls this endpoint when an order's status changes (shipped, delivered, etc.).
 *
 * To enable:
 *   1. Set MERCHIZE_WEBHOOK_SECRET in .env (copy from Merchize Dashboard → Webhooks)
 *   2. In Merchize Dashboard → Webhooks, add this URL:
 *      https://your-domain.com/api/webhooks/merchize
 *   3. Select the events you want (e.g. order.shipped)
 */
router.post('/merchize', express.json(), (req, res) => {
  const WEBHOOK_SECRET = process.env.MERCHIZE_WEBHOOK_SECRET;

  if (WEBHOOK_SECRET) {
    const incomingKey = req.headers['merchize-webhook-key'];
    if (incomingKey !== WEBHOOK_SECRET) {
      console.warn('[merchize-webhook] Invalid webhook key');
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  const event = req.body;
  console.log('[merchize-webhook] Event received:', JSON.stringify(event, null, 2));

  // Add your custom logic here — e.g. email the customer their tracking number,
  // update an order status dashboard, send a Slack notification, etc.

  // Always respond 200 so Merchize marks delivery as successful.
  res.status(200).json({ received: true });
});

export default router;
