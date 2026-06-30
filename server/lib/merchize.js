/**
 * Merchize API client
 *
 * Base URL format: https://bo-group-X-Y.merchize.com/{store_id}/bo-api
 * Get your specific base URL from: Merchize Dashboard → Integrations → API
 */

const BASE_URL = process.env.MERCHIZE_API_BASE_URL;
const ACCESS_TOKEN = process.env.MERCHIZE_ACCESS_TOKEN;

function assertConfig() {
  if (!BASE_URL) throw new Error('MERCHIZE_API_BASE_URL is not set');
  if (!ACCESS_TOKEN) throw new Error('MERCHIZE_ACCESS_TOKEN is not set');
}

/**
 * Import a new order into Merchize for fulfillment.
 * @param {object} orderData
 * @param {string} orderData.order_id        - Your unique order ID
 * @param {object} orderData.shipping_info   - Recipient shipping address
 * @param {Array}  orderData.items           - Line items (each must have merchize_sku)
 * @param {string[]} [orderData.tags]        - Optional order tags
 */
export async function importOrder(orderData) {
  assertConfig();

  const url = `${BASE_URL}/orders/import`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }

  if (!response.ok) {
    const err = new Error(`Merchize API error ${response.status}`);
    err.status = response.status;
    err.body = data;
    throw err;
  }

  return data;
}

/**
 * Get the tracking status for an order.
 * @param {string} externalOrderId - Your external order ID
 */
export async function getOrderTracking(externalOrderId) {
  assertConfig();

  const url = `${BASE_URL}/orders/tracking?external_number=${encodeURIComponent(externalOrderId)}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
  });

  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }

  if (!response.ok) {
    const err = new Error(`Merchize API error ${response.status}`);
    err.status = response.status;
    err.body = data;
    throw err;
  }

  return data;
}
