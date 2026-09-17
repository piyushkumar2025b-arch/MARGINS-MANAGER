import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle2, Lock, ArrowRight, ShoppingCart } from 'lucide-react';
import { OrderRecord } from '../types';

interface AssistedCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderRecord;
  onConfirmOrder: () => Promise<void>;
}

export const AssistedCheckoutModal: React.FC<AssistedCheckoutModalProps> = ({
  isOpen,
  onClose,
  order,
  onConfirmOrder
}) => {
  const [hasConfirmedCheckbox, setHasConfirmedCheckbox] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCheckout = async () => {
    if (!hasConfirmedCheckbox || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onConfirmOrder();
      setIsCompleted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-[#e7e5e4] rounded-lg max-w-md w-full shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-[#e7e5e4] bg-[#fafaf9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#fc8019]" />
            <div>
              <h3 className="text-sm font-bold text-[#1c1917]">
                Human Confirmation Required
              </h3>
              <p className="text-[11px] text-[#78716c]">
                Assisted Live Mode · Explicit human gate
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded text-[#78716c] hover:bg-[#f5f5f4]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          
          {isCompleted ? (
            <div className="text-center py-6 space-y-2">
              <CheckCircle2 className="w-12 h-12 text-[#16a34a] mx-auto" />
              <div className="text-base font-bold text-[#1c1917]">Assisted Order Staged Safely</div>
              <p className="text-xs text-[#57534e]">
                Order #{order.displayId} has been successfully validated against pod inventory and staged for dispatch.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-1.5 rounded bg-[#1c1917] text-white font-semibold text-xs"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <>
              <div className="p-3 bg-[#fef2f2] border border-[#fecaca] rounded text-[#991b1b] space-y-1">
                <span className="font-semibold block uppercase text-[10px] tracking-wider">Security & Governance Protocol:</span>
                <span>MarginOS never auto-commits transactions without manual user authorization. Review the payload below:</span>
              </div>

              {/* Order Summary */}
              <div className="space-y-2 border border-[#e7e5e4] rounded p-3 bg-[#fafaf9]">
                <div className="flex justify-between font-medium">
                  <span className="text-[#78716c]">Order Ref:</span>
                  <span className="font-mono text-[#1c1917] font-bold">#{order.displayId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716c]">Dark Store Pod:</span>
                  <span className="text-[#1c1917]">{order.storeName} ({order.city})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716c]">Basket Items:</span>
                  <span className="text-[#1c1917]">{order.items.length} items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716c]">Fulfillment Distance:</span>
                  <span className="text-[#1c1917] font-mono">{order.deliveryDistanceKm} km</span>
                </div>
                <div className="pt-2 border-t border-[#e7e5e4] flex justify-between font-bold text-sm">
                  <span className="text-[#1c1917]">Final Cart Total:</span>
                  <span className="font-mono text-[#1c1917]">₹{order.subtotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Explicit Checkbox Gate */}
              <label className="flex items-start gap-2.5 p-3 rounded bg-white border border-[#e7e5e4] cursor-pointer hover:bg-[#fafaf9]">
                <input
                  type="checkbox"
                  checked={hasConfirmedCheckbox}
                  onChange={(e) => setHasConfirmedCheckbox(e.target.checked)}
                  className="mt-0.5 rounded text-[#fc8019] focus:ring-[#fc8019]"
                />
                <span className="text-[11px] text-[#44403c] leading-relaxed">
                  I explicitly authorize dispatching this order to the designated dark store under the verified unit economics criteria.
                </span>
              </label>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={onClose}
                  className="px-3 py-1.5 rounded border border-[#e7e5e4] bg-white text-[#57534e] hover:bg-[#f5f5f4]"
                >
                  Cancel
                </button>
                <button
                  disabled={!hasConfirmedCheckbox || isSubmitting}
                  onClick={handleCheckout}
                  className="px-4 py-1.5 rounded bg-[#fc8019] text-white font-semibold hover:bg-[#ea580c] disabled:opacity-40 transition-colors flex items-center gap-1.5"
                >
                  <Lock className="w-3 h-3" />
                  <span>{isSubmitting ? 'Staging Order...' : 'Authorize Staging'}</span>
                </button>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
