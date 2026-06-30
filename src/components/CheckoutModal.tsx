import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, Loader2, Package } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { placeOrder } from '@/lib/api';
import type { CartItem, ShippingInfo } from '@/types';

// ── Validation schema ──────────────────────────────────────────────────────────

const shippingSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  address1: z.string().min(4, 'Street address is required'),
  address2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State / Province is required'),
  postcode: z.string().min(3, 'Postal code is required'),
  country: z.string().length(2, 'Use a 2-letter country code, e.g. US'),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;

// ── Props ──────────────────────────────────────────────────────────────────────

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function CheckoutModal({ isOpen, onClose, items, onOrderSuccess }: CheckoutModalProps) {
  const [step, setStep] = useState<'form' | 'submitting' | 'success'>('form');
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: { country: 'US' },
  });

  const handleClose = () => {
    if (step === 'submitting') return;
    reset();
    setStep('form');
    onClose();
  };

  const onSubmit = async (values: ShippingFormValues) => {
    setStep('submitting');

    const shipping: ShippingInfo = {
      fullName: values.fullName,
      email: values.email,
      phone: values.phone || undefined,
      address1: values.address1,
      address2: values.address2 || undefined,
      city: values.city,
      state: values.state,
      postcode: values.postcode,
      country: values.country,
    };

    try {
      const result = await placeOrder({ cart: items, shipping });
      setConfirmedOrderId(result.orderId);
      setStep('success');
      onOrderSuccess();
    } catch (err) {
      setStep('form');
      toast.error(err instanceof Error ? err.message : 'Could not place order. Please try again.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-card border-border max-w-lg max-h-[90vh] overflow-y-auto">
        {step === 'success' ? (
          // ── Success state ────────────────────────────────────────────────────
          <div className="flex flex-col items-center text-center py-8 gap-4">
            <CheckCircle className="w-16 h-16 text-primary" />
            <DialogHeader>
              <DialogTitle className="font-display font-black text-2xl">Order Placed!</DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground">
              Your order <span className="font-mono font-bold text-foreground">{confirmedOrderId}</span> has
              been sent to Merchize for fulfillment. You'll receive a confirmation email once it ships.
            </p>
            <p className="text-sm text-muted-foreground">
              Questions? Email us at{' '}
              <a href="mailto:tourettesinc@gmail.com" className="text-primary underline">
                tourettesinc@gmail.com
              </a>
            </p>
            <button
              className="btn-primary mt-4"
              onClick={() => {
                setStep('form');
                reset();
                onClose();
              }}
            >
              Close
            </button>
          </div>
        ) : (
          // ── Shipping form ────────────────────────────────────────────────────
          <>
            <DialogHeader>
              <DialogTitle className="font-display font-black text-2xl flex items-center gap-2">
                <Package className="w-6 h-6" />
                Shipping Details
              </DialogTitle>
            </DialogHeader>

            {/* Order summary */}
            <div className="border border-border rounded-lg p-4 space-y-2 bg-background">
              {items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.product.name}{' '}
                    <span className="text-xs">({item.variant})</span> × {item.quantity}
                  </span>
                  <span className="font-semibold">${item.product.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t border-border pt-2 flex justify-between font-black">
                <span>Total</span>
                <span className="text-primary">${total}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Contact */}
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wide">
                  Contact
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      {...register('fullName')}
                      placeholder="Jane Doe"
                      className="mt-1"
                    />
                    {errors.fullName && (
                      <p className="text-destructive text-xs mt-1">{errors.fullName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="jane@example.com"
                      className="mt-1"
                    />
                    {errors.email && (
                      <p className="text-destructive text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      placeholder="+1 555 000 0000"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wide">
                  Shipping Address
                </h3>
                <div>
                  <Label htmlFor="address1">Address Line 1 *</Label>
                  <Input
                    id="address1"
                    {...register('address1')}
                    placeholder="123 Main St"
                    className="mt-1"
                  />
                  {errors.address1 && (
                    <p className="text-destructive text-xs mt-1">{errors.address1.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="address2">Address Line 2</Label>
                  <Input
                    id="address2"
                    {...register('address2')}
                    placeholder="Apt 4B (optional)"
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      {...register('city')}
                      placeholder="Austin"
                      className="mt-1"
                    />
                    {errors.city && (
                      <p className="text-destructive text-xs mt-1">{errors.city.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="state">State / Province *</Label>
                    <Input
                      id="state"
                      {...register('state')}
                      placeholder="TX"
                      className="mt-1"
                    />
                    {errors.state && (
                      <p className="text-destructive text-xs mt-1">{errors.state.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="postcode">Postal Code *</Label>
                    <Input
                      id="postcode"
                      {...register('postcode')}
                      placeholder="78701"
                      className="mt-1"
                    />
                    {errors.postcode && (
                      <p className="text-destructive text-xs mt-1">{errors.postcode.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="country">Country Code *</Label>
                    <Input
                      id="country"
                      {...register('country')}
                      placeholder="US"
                      maxLength={2}
                      className="mt-1 uppercase"
                    />
                    {errors.country && (
                      <p className="text-destructive text-xs mt-1">{errors.country.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Your order will be fulfilled by Merchize and shipped to the address above.
                Shipping cost will be calculated and invoiced separately.
              </p>

              <button
                type="submit"
                disabled={step === 'submitting'}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {step === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Placing Order…
                  </>
                ) : (
                  <>
                    <Package className="w-4 h-4" />
                    Place Order — ${total}
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
