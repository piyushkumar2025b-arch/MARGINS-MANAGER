import React, { useState } from 'react';
import { Sliders, RefreshCw, TrendingUp, AlertCircle, Info } from 'lucide-react';
import { NetworkTotals, DigitalTwinScenario } from '../types';
import { runDigitalTwinSensitivity } from '../engine/storeAnalytics';

interface DigitalTwinViewProps {
  networkTotals: NetworkTotals;
}

export const DigitalTwinView: React.FC<DigitalTwinViewProps> = ({ networkTotals }) => {
  const [basketSizeDeltaPct, setBasketSizeDeltaPct] = useState<number>(5);     // +5%
  const [discountSpendDeltaPct, setDiscountSpendDeltaPct] = useState<number>(-8); // -8%
  const [deliveryCostDeltaPct, setDeliveryCostDeltaPct] = useState<number>(-4);   // -4%
  const [orderDensityDeltaPct, setOrderDensityDeltaPct] = useState<number>(7);    // +7%
  const [wastageReductionPct, setWastageReductionPct] = useState<number>(-12);    // -12%

  const scenario: DigitalTwinScenario = {
    aovMultiplier: 1 + (basketSizeDeltaPct / 100),
    discountSpendMultiplier: 1 + (discountSpendDeltaPct / 100),
    deliveryCostMultiplier: 1 + (deliveryCostDeltaPct / 100),
    orderDensityMultiplier: 1 + (orderDensityDeltaPct / 100),
    conversionMultiplier: 1.01,
    wastageMultiplier: 1 + (wastageReductionPct / 100),
    storeCount: 1200
  };

  const simResult = runDigitalTwinSensitivity(scenario, networkTotals);

  const handleResetDefaults = () => {
    setBasketSizeDeltaPct(5);
    setDiscountSpendDeltaPct(-8);
    setDeliveryCostDeltaPct(-4);
    setOrderDensityDeltaPct(7);
    setWastageReductionPct(-12);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e7e5e4] pb-4">
        <div>
          <span className="text-xs uppercase font-semibold text-[#fc8019]">Quick-Commerce Digital Twin</span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1c1917]">
            Network Sensitivity Analysis
          </h2>
          <p className="text-xs text-[#78716c] mt-0.5">
            Stress-test operating parameters across 1,200 virtual dark stores and observe bottom-line run rate changes.
          </p>
        </div>

        <button
          onClick={handleResetDefaults}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs border border-[#e7e5e4] bg-white hover:bg-[#f5f5f4] text-[#44403c] transition-colors"
        >
          <RefreshCw className="w-3 h-3 text-[#78716c]" />
          <span>Reset Assumptions</span>
        </button>
      </div>

      {/* SENSITIVITY CONTROLS & LIVE OUTPUT SPLIT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 5 Cols: Sliders */}
        <div className="lg:col-span-5 space-y-5 border border-[#e7e5e4] p-5 rounded bg-white text-xs">
          <div className="font-semibold text-sm text-[#1c1917] flex items-center justify-between">
            <span>Operating Variables</span>
            <span className="text-[11px] text-[#78716c] font-normal">Active Scenario</span>
          </div>

          {/* Slider 1: Basket Size */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-medium">
              <span className="text-[#1c1917]">Basket Size / Cross-sell Lift</span>
              <span className="font-mono font-bold text-[#fc8019]">
                {basketSizeDeltaPct >= 0 ? `+${basketSizeDeltaPct}%` : `${basketSizeDeltaPct}%`}
              </span>
            </div>
            <input
              type="range"
              min="-10"
              max="20"
              step="1"
              value={basketSizeDeltaPct}
              onChange={(e) => setBasketSizeDeltaPct(Number(e.target.value))}
              className="w-full accent-[#fc8019]"
            />
            <div className="flex justify-between text-[10px] text-[#a8a29e]">
              <span>-10%</span>
              <span>Baseline (0%)</span>
              <span>+20%</span>
            </div>
          </div>

          {/* Slider 2: Discount Spend */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-medium">
              <span className="text-[#1c1917]">Promotional Discount Spend</span>
              <span className="font-mono font-bold text-[#16a34a]">
                {discountSpendDeltaPct >= 0 ? `+${discountSpendDeltaPct}%` : `${discountSpendDeltaPct}%`}
              </span>
            </div>
            <input
              type="range"
              min="-30"
              max="15"
              step="1"
              value={discountSpendDeltaPct}
              onChange={(e) => setDiscountSpendDeltaPct(Number(e.target.value))}
              className="w-full accent-[#16a34a]"
            />
            <div className="flex justify-between text-[10px] text-[#a8a29e]">
              <span>-30% (Rationalized)</span>
              <span>0%</span>
              <span>+15% (Heavy)</span>
            </div>
          </div>

          {/* Slider 3: Delivery Cost via Batching */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-medium">
              <span className="text-[#1c1917]">Delivery Transit Cost / Batching</span>
              <span className="font-mono font-bold text-[#3b82f6]">
                {deliveryCostDeltaPct >= 0 ? `+${deliveryCostDeltaPct}%` : `${deliveryCostDeltaPct}%`}
              </span>
            </div>
            <input
              type="range"
              min="-15"
              max="10"
              step="1"
              value={deliveryCostDeltaPct}
              onChange={(e) => setDeliveryCostDeltaPct(Number(e.target.value))}
              className="w-full accent-[#3b82f6]"
            />
            <div className="flex justify-between text-[10px] text-[#a8a29e]">
              <span>-15% (High Batching)</span>
              <span>0%</span>
              <span>+10%</span>
            </div>
          </div>

          {/* Slider 4: Store Order Density */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-medium">
              <span className="text-[#1c1917]">Pod Order Density / Demand</span>
              <span className="font-mono font-bold text-[#8b5cf6]">
                {orderDensityDeltaPct >= 0 ? `+${orderDensityDeltaPct}%` : `${orderDensityDeltaPct}%`}
              </span>
            </div>
            <input
              type="range"
              min="-10"
              max="25"
              step="1"
              value={orderDensityDeltaPct}
              onChange={(e) => setOrderDensityDeltaPct(Number(e.target.value))}
              className="w-full accent-[#8b5cf6]"
            />
            <div className="flex justify-between text-[10px] text-[#a8a29e]">
              <span>-10%</span>
              <span>0%</span>
              <span>+25%</span>
            </div>
          </div>

          {/* Slider 5: Perishable Wastage */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-medium">
              <span className="text-[#1c1917]">Perishable Spoilage Reduction</span>
              <span className="font-mono font-bold text-[#d97706]">
                {wastageReductionPct >= 0 ? `+${wastageReductionPct}%` : `${wastageReductionPct}%`}
              </span>
            </div>
            <input
              type="range"
              min="-30"
              max="10"
              step="1"
              value={wastageReductionPct}
              onChange={(e) => setWastageReductionPct(Number(e.target.value))}
              className="w-full accent-[#d97706]"
            />
            <div className="flex justify-between text-[10px] text-[#a8a29e]">
              <span>-30%</span>
              <span>0%</span>
              <span>+10%</span>
            </div>
          </div>

        </div>

        {/* Right 7 Cols: Real-time Sensitivity Projections */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Key Output Strip */}
          <div className="p-6 bg-[#fafaf9] border border-[#e7e5e4] rounded space-y-4">
            <div className="text-xs font-semibold text-[#fc8019] uppercase tracking-wider">
              Projected Scenario Outcome
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <span className="text-xs text-[#78716c] block">AOV Shift</span>
                <span className="text-xl font-bold font-mono text-[#1c1917]">
                  ₹{simResult.baseline.aov.toFixed(0)} → ₹{simResult.scenario.aov.toFixed(0)}
                </span>
                <span className="text-[11px] text-[#16a34a] block mt-0.5">
                  +{simResult.delta.aovChange.toFixed(0)} ({basketSizeDeltaPct}%)
                </span>
              </div>

              <div>
                <span className="text-xs text-[#78716c] block">Contribution / Order</span>
                <span className="text-xl font-bold font-mono text-[#16a34a]">
                  ₹{simResult.baseline.contributionPerOrder.toFixed(2)} → ₹{simResult.scenario.contributionPerOrder.toFixed(2)}
                </span>
                <span className="text-[11px] text-[#16a34a] block mt-0.5">
                  +₹{simResult.delta.contributionImprovement.toFixed(2)} / order
                </span>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <span className="text-xs text-[#78716c] block">Annualized Network Value</span>
                <span className="text-xl font-bold font-mono text-[#1c1917]">
                  ₹{(simResult.delta.annualizedTheoreticalOpportunity / 10000000).toFixed(1)} Cr
                </span>
                <span className="text-[11px] text-[#78716c] block mt-0.5">
                  +₹{(simResult.delta.dailyOpportunityGain / 100000).toFixed(1)}L / day
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#e7e5e4] text-xs text-[#78716c] flex items-center justify-between">
              <span>95% Confidence Bounds: [₹{simResult.delta.confidenceInterval[0].toFixed(2)}, ₹{simResult.delta.confidenceInterval[1].toFixed(2)}] / order</span>
            </div>
          </div>

          {/* Operational Sensitivity Breakdown Table */}
          <div className="border border-[#e7e5e4] rounded bg-white overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-[#fafaf9] border-b border-[#e7e5e4] text-[#78716c]">
                <tr>
                  <th className="py-2.5 px-4 font-semibold">Simulation Dimension</th>
                  <th className="py-2.5 px-4 font-semibold text-right">Baseline State</th>
                  <th className="py-2.5 px-4 font-semibold text-right">Scenario State</th>
                  <th className="py-2.5 px-4 font-semibold text-right">Delta (Δ)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e7e5e4] text-[#1c1917]">
                <tr>
                  <td className="py-2.5 px-4 font-medium">Daily Network Orders</td>
                  <td className="py-2.5 px-4 text-right font-mono">{simResult.baseline.dailyOrders.toLocaleString()}</td>
                  <td className="py-2.5 px-4 text-right font-mono">{simResult.scenario.dailyOrders.toLocaleString()}</td>
                  <td className="py-2.5 px-4 text-right font-mono text-[#16a34a]">
                    +{(simResult.scenario.dailyOrders - simResult.baseline.dailyOrders).toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium">Average Order Value</td>
                  <td className="py-2.5 px-4 text-right font-mono">₹{simResult.baseline.aov.toFixed(2)}</td>
                  <td className="py-2.5 px-4 text-right font-mono">₹{simResult.scenario.aov.toFixed(2)}</td>
                  <td className="py-2.5 px-4 text-right font-mono text-[#16a34a]">+₹{simResult.delta.aovChange.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium">Contribution / Order</td>
                  <td className="py-2.5 px-4 text-right font-mono">₹{simResult.baseline.contributionPerOrder.toFixed(2)}</td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-[#16a34a]">₹{simResult.scenario.contributionPerOrder.toFixed(2)}</td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-[#16a34a]">+₹{simResult.delta.contributionImprovement.toFixed(2)}</td>
                </tr>
                <tr className="bg-[#f5f5f4] font-semibold">
                  <td className="py-2.5 px-4">Daily Network Contribution Run Rate</td>
                  <td className="py-2.5 px-4 text-right font-mono">₹{(simResult.baseline.dailyContribution / 100000).toFixed(1)}L</td>
                  <td className="py-2.5 px-4 text-right font-mono text-[#16a34a]">₹{(simResult.scenario.dailyContribution / 100000).toFixed(1)}L</td>
                  <td className="py-2.5 px-4 text-right font-mono text-[#16a34a]">+₹{(simResult.delta.dailyOpportunityGain / 100000).toFixed(1)}L / day</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mandatory Disclaimer */}
          <div className="p-3 bg-[#f5f5f4] rounded border border-[#e7e5e4] flex items-center gap-2 text-xs text-[#78716c]">
            <Info className="w-4 h-4 text-[#a8a29e] shrink-0" />
            <span>{simResult.disclaimer}</span>
          </div>

        </div>

      </div>

    </div>
  );
};
