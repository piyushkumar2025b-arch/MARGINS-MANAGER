import React, { useState } from 'react';
import { X, RotateCcw, Check, Info } from 'lucide-react';
import { CostAssumptions } from '../types';

interface CostAssumptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  assumptions: CostAssumptions;
  onSaveAssumptions: (newAssumptions: CostAssumptions) => void;
  onResetDefaults: () => void;
}

export const CostAssumptionsModal: React.FC<CostAssumptionsModalProps> = ({
  isOpen,
  onClose,
  assumptions,
  onSaveAssumptions,
  onResetDefaults
}) => {
  const [formState, setFormState] = useState<CostAssumptions>(assumptions);

  if (!isOpen) return null;

  const handleChange = (field: keyof CostAssumptions, val: number) => {
    setFormState(prev => ({
      ...prev,
      [field]: val
    }));
  };

  const handleSave = () => {
    onSaveAssumptions(formState);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-[#e7e5e4] rounded-lg max-w-lg w-full shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 border-b border-[#e7e5e4] bg-[#fafaf9] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#1c1917]">Deterministic Cost Assumptions</h3>
            <p className="text-[11px] text-[#78716c]">
              Prototype Contribution Proxy — not Swiggy's internal accounting definition.
            </p>
          </div>
          <button onClick={onClose} className="p-1 rounded text-[#78716c] hover:bg-[#f5f5f4]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Inputs */}
        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
          
          <div className="p-3 bg-[#f5f5f4] rounded border border-[#e7e5e4] flex items-start gap-2 text-[#57534e]">
            <Info className="w-4 h-4 text-[#78716c] shrink-0 mt-0.5" />
            <span>
              Adjust unit fulfillment parameters below to recalculate order contribution waterfalls, store diagnostics, and simulation spreads across the entire prototype.
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            
            <div className="space-y-1">
              <label className="font-semibold text-[#1c1917] block">Delivery Base Fee (₹)</label>
              <input
                type="number"
                step="1"
                value={formState.deliveryBaseCost}
                onChange={(e) => handleChange('deliveryBaseCost', Number(e.target.value))}
                className="w-full px-2.5 py-1.5 border border-[#e7e5e4] rounded font-mono"
              />
              <span className="text-[10px] text-[#78716c]">Base dispatch charge per run</span>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#1c1917] block">Delivery per Km (₹/km)</label>
              <input
                type="number"
                step="0.5"
                value={formState.deliveryCostPerKm}
                onChange={(e) => handleChange('deliveryCostPerKm', Number(e.target.value))}
                className="w-full px-2.5 py-1.5 border border-[#e7e5e4] rounded font-mono"
              />
              <span className="text-[10px] text-[#78716c]">Rider transit compensation</span>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#1c1917] block">Picking per Minute (₹)</label>
              <input
                type="number"
                step="0.5"
                value={formState.pickingCostPerMinute}
                onChange={(e) => handleChange('pickingCostPerMinute', Number(e.target.value))}
                className="w-full px-2.5 py-1.5 border border-[#e7e5e4] rounded font-mono"
              />
              <span className="text-[10px] text-[#78716c]">Dark store picker labor rate</span>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#1c1917] block">Packaging Fee (₹)</label>
              <input
                type="number"
                step="0.5"
                value={formState.packingCostBase}
                onChange={(e) => handleChange('packingCostBase', Number(e.target.value))}
                className="w-full px-2.5 py-1.5 border border-[#e7e5e4] rounded font-mono"
              />
              <span className="text-[10px] text-[#78716c]">Paper bag & crate packaging</span>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#1c1917] block">Payment Gateway (%)</label>
              <input
                type="number"
                step="0.001"
                value={formState.paymentGatewayPct}
                onChange={(e) => handleChange('paymentGatewayPct', Number(e.target.value))}
                className="w-full px-2.5 py-1.5 border border-[#e7e5e4] rounded font-mono"
              />
              <span className="text-[10px] text-[#78716c]">MDR processing rate on gross</span>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#1c1917] block">Perishable Wastage Reserve (%)</label>
              <input
                type="number"
                step="0.005"
                value={formState.wastagePerishablePct}
                onChange={(e) => handleChange('wastagePerishablePct', Number(e.target.value))}
                className="w-full px-2.5 py-1.5 border border-[#e7e5e4] rounded font-mono"
              />
              <span className="text-[10px] text-[#78716c]">Shrinkage on perishable goods</span>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#e7e5e4] bg-[#fafaf9] flex items-center justify-between text-xs">
          <button
            onClick={() => {
              onResetDefaults();
              onClose();
            }}
            className="inline-flex items-center gap-1 text-[#78716c] hover:text-[#1c1917]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded border border-[#e7e5e4] bg-white hover:bg-[#f5f5f4] text-[#44403c]"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1.5 rounded bg-[#1c1917] text-white font-semibold hover:bg-[#292524]"
            >
              Apply Assumptions
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
