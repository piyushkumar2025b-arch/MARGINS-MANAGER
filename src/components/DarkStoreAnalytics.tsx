import React, { useState } from 'react';
import { Building2, TrendingUp, AlertTriangle, ArrowRight, CheckCircle2, MapPin } from 'lucide-react';
import { DarkStore } from '../types';

interface DarkStoreAnalyticsProps {
  darkStores: DarkStore[];
  selectedStoreId?: string;
  onSelectStore: (storeId: string) => void;
  onOpenCopilotWithStore: (storeName: string, prompt: string) => void;
}

export const DarkStoreAnalytics: React.FC<DarkStoreAnalyticsProps> = ({
  darkStores,
  selectedStoreId,
  onSelectStore,
  onOpenCopilotWithStore
}) => {
  const currentStore = darkStores.find(s => s.id === selectedStoreId) || darkStores[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      
      {/* HEADER & STORE SELECTOR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e7e5e4] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-semibold text-[#78716c]">Operations Network</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#f5f5f4] text-[#57534e] border border-[#e7e5e4] font-mono font-semibold">
              SIMULATED STORE PROFILES
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1c1917]">
            Which stores are losing money, and why?
          </h2>
          <p className="text-xs text-[#78716c] mt-0.5">
            Pod-level contribution economics, primary profit leaks, and targeted local operations interventions.
          </p>
        </div>

        {/* Store Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {darkStores.map((store) => (
            <button
              key={store.id}
              onClick={() => onSelectStore(store.id)}
              className={`px-3 py-1.5 rounded font-medium border transition-colors whitespace-nowrap ${
                store.id === currentStore.id
                  ? 'bg-[#1c1917] text-white border-[#1c1917]'
                  : 'bg-white text-[#44403c] border-[#e7e5e4] hover:bg-[#f5f5f4]'
              }`}
            >
              {store.name.split(' ')[0]} ({store.city})
            </button>
          ))}
        </div>
      </div>

      {/* SELECTED STORE FOCUS (OPERATIONAL STRIP — SECTION 21: STORE EXPERIENCE) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#e7e5e4] pb-4">
          <div>
            <div className="text-xs font-semibold text-[#fc8019] uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {currentStore.city} · {currentStore.zone}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1c1917] tracking-tight">
              {currentStore.name} Pod
            </h3>
          </div>
          <button
            onClick={() => onOpenCopilotWithStore(currentStore.name, `Where is ${currentStore.name} losing money, and what are the top 3 actionable fixes?`)}
            className="text-xs text-[#fc8019] hover:underline font-medium inline-flex items-center gap-1"
          >
            Explain with AI Copilot →
          </button>
        </div>

        {/* POD 4-STEP WORKFLOW BANNER */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white border border-[#e7e5e4] rounded p-4 text-xs">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#dc2626]">1. Problem</span>
            <p className="text-[#1c1917] font-semibold">Pod Margin Gap</p>
            <p className="text-[#57534e] text-[11px] leading-relaxed">
              Generates ₹{currentStore.contributionPerOrder.toFixed(2)} estimated profit/order ({currentStore.contributionPerOrder < 7.42 ? 'below' : 'above'} ₹7.42 network average).
            </p>
          </div>

          <div className="space-y-1 border-t md:border-t-0 md:border-l border-[#e7e5e4] pt-2 md:pt-0 md:pl-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#d97706]">2. Root Cause</span>
            <p className="text-[#1c1917] font-semibold truncate">{currentStore.topProfitLeaks[0]?.category.split('(')[0]}</p>
            <p className="text-[#57534e] text-[11px] leading-relaxed">
              Drives {currentStore.topProfitLeaks[0]?.sharePct}% of pod profit leakage (₹{(currentStore.topProfitLeaks[0]?.amountPerDay / 1000).toFixed(1)}K/day).
            </p>
          </div>

          <div className="space-y-1 border-t md:border-t-0 md:border-l border-[#e7e5e4] pt-2 md:pt-0 md:pl-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#fc8019]">3. Action</span>
            <p className="text-[#1c1917] font-semibold truncate">{currentStore.topOpportunities[0]?.action}</p>
            <p className="text-[#57534e] text-[11px] leading-relaxed">
              Targeted pod-level dispatch and catalog optimization within SLA bounds.
            </p>
          </div>

          <div className="space-y-1 border-t md:border-t-0 md:border-l border-[#e7e5e4] pt-2 md:pt-0 md:pl-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#16a34a]">4. Expected Impact</span>
            <p className="text-[#16a34a] font-semibold font-mono">+₹{((currentStore.topOpportunities[0]?.potentialGainPerDay || 14000) / 1000).toFixed(1)}K / day</p>
            <p className="text-[#57534e] text-[11px] leading-relaxed">
              Pod daily contribution expands toward ₹{((currentStore.contributionPerDay + (currentStore.topOpportunities[0]?.potentialGainPerDay || 14000)) / 1000).toFixed(1)}K.
            </p>
          </div>
        </div>

        {/* Primary Operational Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-2">
          <div>
            <div className="text-xs font-medium text-[#78716c] uppercase">Estimated Profit / Order</div>
            <div className="text-2xl sm:text-3xl font-bold text-[#1c1917] font-mono mt-1">
              ₹{currentStore.contributionPerOrder.toFixed(2)}
            </div>
            <div className="text-xs text-[#78716c] mt-0.5">Network avg: ₹7.42</div>
          </div>

          <div>
            <div className="text-xs font-medium text-[#78716c] uppercase">Daily Pod Contribution</div>
            <div className="text-2xl sm:text-3xl font-bold text-[#16a34a] font-mono mt-1">
              ₹{(currentStore.contributionPerDay / 1000).toFixed(1)}K
            </div>
            <div className="text-xs text-[#16a34a] mt-0.5">₹{(currentStore.topOpportunities[0]?.potentialGainPerDay || 14000) / 1000}K daily opportunity</div>
          </div>

          <div>
            <div className="text-xs font-medium text-[#78716c] uppercase">Orders / Day</div>
            <div className="text-2xl sm:text-3xl font-bold text-[#1c1917] font-mono mt-1">
              {currentStore.ordersPerDay.toLocaleString()}
            </div>
            <div className="text-xs text-[#78716c] mt-0.5">Density: {currentStore.orderDensity} orders/km²</div>
          </div>

          <div>
            <div className="text-xs font-medium text-[#78716c] uppercase">Average Order Value</div>
            <div className="text-2xl sm:text-3xl font-bold text-[#1c1917] font-mono mt-1">
              ₹{currentStore.aov.toFixed(0)}
            </div>
            <div className="text-xs text-[#78716c] mt-0.5">{currentStore.skuCount.toLocaleString()} active SKUs</div>
          </div>
        </div>

        {/* Secondary Operations Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#f5f5f4] rounded text-xs">
          <div>
            <span className="text-[#78716c] block">Picking Speed</span>
            <span className="font-mono font-bold text-sm text-[#1c1917]">{currentStore.avgPickingTimeMinutes} min / order</span>
          </div>
          <div>
            <span className="text-[#78716c] block">Delivery Transit Cost</span>
            <span className="font-mono font-bold text-sm text-[#1c1917]">₹{currentStore.avgDeliveryCost.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-[#78716c] block">Stockout Rate</span>
            <span className="font-mono font-bold text-sm text-[#d97706]">{currentStore.stockoutRatePct}%</span>
          </div>
          <div>
            <span className="text-[#78716c] block">Expiry Wastage Rate</span>
            <span className="font-mono font-bold text-sm text-[#dc2626]">{currentStore.expiryWastageRatePct}%</span>
          </div>
        </div>

        {/* OPERATIONAL BREAKDOWN: MAIN PROFIT LEAKS VS RECOMMENDED ACTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          
          {/* Main Profit Leaks */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#dc2626] flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              Primary Profit Leaks in Pod
            </h4>
            <div className="border border-[#e7e5e4] rounded bg-white divide-y divide-[#e7e5e4] text-xs">
              {currentStore.topProfitLeaks.map((leak, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-[#1c1917]">{leak.category}</div>
                    <div className="text-[11px] text-[#78716c]">{leak.sharePct}% of pod profit leakage</div>
                  </div>
                  <div className="font-mono font-bold text-sm text-[#dc2626]">
                    ₹{(leak.amountPerDay / 1000).toFixed(1)}K / day
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Operational Actions */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#16a34a] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Recommended MarginOS Interventions
            </h4>
            <div className="border border-[#e7e5e4] rounded bg-white divide-y divide-[#e7e5e4] text-xs">
              {currentStore.topOpportunities.map((opp, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-[#1c1917]">{opp.action}</div>
                    <div className="text-[11px] text-[#78716c]">Feasible within current dark store staffing</div>
                  </div>
                  <div className="font-mono font-bold text-sm text-[#16a34a]">
                    +₹{(opp.potentialGainPerDay / 1000).toFixed(1)}K / day
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </section>

      {/* ALL PODS NETWORK COMPARISON TABLE */}
      <section className="space-y-3 pt-4 border-t border-[#e7e5e4]">
        <h4 className="text-base font-bold text-[#1c1917] tracking-tight">
          All Dark Stores Comparison
        </h4>
        <div className="border border-[#e7e5e4] rounded bg-white overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead className="bg-[#fafaf9] border-b border-[#e7e5e4] text-[#78716c]">
              <tr>
                <th className="py-2.5 px-4 font-semibold">Store Pod</th>
                <th className="py-2.5 px-4 font-semibold">City</th>
                <th className="py-2.5 px-4 font-semibold text-right">Orders/Day</th>
                <th className="py-2.5 px-4 font-semibold text-right">AOV</th>
                <th className="py-2.5 px-4 font-semibold text-right">Contribution / Order</th>
                <th className="py-2.5 px-4 font-semibold text-right">Stockout %</th>
                <th className="py-2.5 px-4 font-semibold text-right">Expiry %</th>
                <th className="py-2.5 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e7e5e4] text-[#1c1917]">
              {darkStores.map((s) => (
                <tr key={s.id} className={s.id === currentStore.id ? 'bg-[#fafaf9] font-medium' : 'hover:bg-[#fafaf9]'}>
                  <td className="py-2.5 px-4 font-semibold">{s.name}</td>
                  <td className="py-2.5 px-4 text-[#78716c]">{s.city}</td>
                  <td className="py-2.5 px-4 text-right font-mono">{s.ordersPerDay.toLocaleString()}</td>
                  <td className="py-2.5 px-4 text-right font-mono">₹{s.aov.toFixed(0)}</td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-[#1c1917]">₹{s.contributionPerOrder.toFixed(2)}</td>
                  <td className="py-2.5 px-4 text-right font-mono text-[#d97706]">{s.stockoutRatePct}%</td>
                  <td className="py-2.5 px-4 text-right font-mono text-[#dc2626]">{s.expiryWastageRatePct}%</td>
                  <td className="py-2.5 px-4 text-right">
                    <button
                      onClick={() => onSelectStore(s.id)}
                      className="text-xs font-semibold text-[#fc8019] hover:underline"
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
};
