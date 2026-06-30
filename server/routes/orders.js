import express from 'express';
import { importOrder } from '../lib/merchize.js';

const router = express.Router();

/**
 * POST /api/orders
 *
 * Accepts the cart and shipping info from the checkout form, then imports
 * the order into Merchize for print-on-demand fulfillment.
 *
 * Body:
 *   {
 *     cart: CartItem[],       // items with product (name, price, sku) + variant + quantity
 *     shipping: ShippingInfo, // customer shipping details
 *     orderId?: string        // optional custom order ID; generated if omitted
 *   }
 */
router.post('/', async (req, res) => {
  const { cart, shipping, orderId } = req.body;

  if (!Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ error: 'cart is required and must be non-empty' });
  }
  if (!shipping || !shipping.fullName || !shipping.email || !shipping.address1) {
    return res.status(400).json({ error: 'shipping info (fullName, email, address1) is required' });
  }

  // Every item must have a Merchize SKU so fulfillment can map to a catalog product
  const missingSku = cart.find((item) => !item.product?.sku);
  if (missingSku) {
    return res.status(400).json({
      error: `Product "${missingSku.product?.name}" is missing a Merchize SKU. Update siteData.ts with the real SKU from your Merchize Dashboard.`,
    });
  }

  const generatedOrderId = orderId || `TINC-${Date.now()}`;

  const merchizePayload = {
    order_id: generatedOrderId,
    shipping_info: {
      full_name: shipping.fullName,
      address_1: shipping.address1,
      ...(shipping.address2 && { address_2: shipping.address2 }),
      city: shipping.city,
      state: shipping.state,
      postcode: shipping.postcode,
      country: shipping.country || 'US',
      email: shipping.email,
      ...(shipping.phone && { phone: shipping.phone }),
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
    tags: ['tourettes-inc-website'],
  };

  try {
    const result = await importOrder(merchizePayload);
    console.log(`[orders] Created Merchize order ${generatedOrderId}`, result);
    return res.json({ success: true, orderId: generatedOrderId, merchize: result });
  } catch (err) {
    console.error('[orders] Merchize import failed:', err.message, err.body || '');
    return res.status(502).json({
      error: 'Failed to submit order to Merchize. Please try again.',
      detail: err.message,
    });
  }
});

/**
 * GET /api/orders/:orderId/tracking
 *
 * Fetch tracking info for a previously submitted order.
 */
router.get('/:orderId/tracking', async (req, res) => {
  const { orderId } = req.params;
  try {
    const { getOrderTracking } = await import('../lib/merchize.js');
    const result = await getOrderTracking(orderId);
    return res.json(result);
  } catch (err) {
    console.error('[tracking] Failed:', err.message);
    return res.status(502).json({ error: err.message });
  }
});

export default router;
