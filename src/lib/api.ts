import type { CartItem, ShippingInfo } from '@/types';

const API_BASE = '/api';

export interface PlaceOrderPayload {
  cart: CartItem[];
  shipping: ShippingInfo;
  orderId?: string;
}

export interface PlaceOrderResponse {
  success: boolean;
  orderId: string;
  merchize?: unknown;
  error?: string;
  detail?: string;
}

/**
 * Submit the cart + shipping to the backend, which forwards it to Merchize.
 */
export async function placeOrder(payload: PlaceOrderPayload): Promise<PlaceOrderResponse> {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `Server error ${res.status}`);
  }

  return data as PlaceOrderResponse;
}

/**
 * Check backend + Merchize connectivity.
 */
export async function checkHealth(): Promise<{ status: string; merchizeConfigured: boolean; stripeConfigured: boolean }> {
  const res = await fetch(`${API_BASE}/health`);
  return res.json();
}
