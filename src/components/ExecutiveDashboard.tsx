import React from 'react';
import { ArrowUpRight, ChevronRight, AlertCircle, TrendingUp, Sparkles, Building2, ShoppingBag } from 'lucide-react';
import { NetworkTotals, DarkStore } from '../types';

interface ExecutiveDashboardProps {
  networkTotals: NetworkTotals;
  darkStores: DarkStore[];
  onNavigateToOrder: (orderId: string) => void;
  onNavigateToStore: (storeId: string) => void;
  onNavigateToSimulation: () => void;
  onOpenCopilotWithPrompt: (prompt: string) => void;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  networkTotals,
  darkStores,
  onNavigateToOrder,
  onNavigateToStore,
  onNavigateToSimulation,
  onOpenCopilotWithPrompt
}) => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      
      {/* SECTION 1: BUSINESS SITUATION (EDITORIAL HORIZONTAL BAND) */}
      <section aria-labelledby="section-today" className="border-b border-[#e7e5e4] pb-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#78716c]">National Network Status</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#f5f5f4] text-[#57534e] border border-[#e7e5e4] font-mono font-semibold">
                MODELLED · ILLUSTRATIVE ESTIMATE
              </span>
            </div>
            <h2 id="section-today" className="text-xl sm:text-2xl font-bold tracking-tight text-[#1c1917]">
              Where are we losing money across the network?
            </h2>
          </div>
          <div className="text-xs text-[#78716c] font-mono text-right">
            <span>Illustrative estimate: 6 sample dark stores extrapolated 200x (~18.6L orders/day)</span>
          </div>
        </div>

        {/* CORE 4-STEP WORKFLOW BANNER */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white border border-[#e7e5e4] rounded p-4 text-xs">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#dc2626]">1. Problem</span>
            <p className="text-[#1c1917] font-semibold">Margin Erosion on High Volume</p>
            <p className="text-[#57534e] text-[11px] leading-relaxed">
              Network generates only ₹{networkTotals.networkContributionPerOrder.toFixed(2)} estimated profit per order despite ₹{networkTotals.networkAov.toFixed(0)} average basket size.
            </p>
          </div>

          <div className="space-y-1 border-t md:border-t-0 md:border-l border-[#e7e5e4] pt-2 md:pt-0 md:pl-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#d97706]">2. Root Cause</span>
            <p className="text-[#1c1917] font-semibold">Discount Burn & Solitary Trips</p>
            <p className="text-[#57534e] text-[11px] leading-relaxed">
              Discounts burn ₹18.20/order (47% avoidable) and unbatched transit costs ₹31.10/order across 1.8km avg distance.
            </p>
          </div>

          <div className="space-y-1 border-t md:border-t-0 md:border-l border-[#e7e5e4] pt-2 md:pt-0 md:pl-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#fc8019]">3. Action</span>
            <p className="text-[#1c1917] font-semibold">Deterministic Interventions</p>
            <p className="text-[#57534e] text-[11px] leading-relaxed">
              Targeted coupon rationalization, cart-affinity high-margin complements, and safe spatial dispatch batching.
            </p>
          </div>

          <div className="space-y-1 border-t md:border-t-0 md:border-l border-[#e7e5e4] pt-2 md:pt-0 md:pl-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#16a34a]">4. Expected Impact</span>
            <p className="text-[#16a34a] font-semibold font-mono">+₹5.40 / order net</p>
            <p className="text-[#57534e] text-[11px] leading-relaxed">
              Unlocks estimated ₹{(networkTotals.totalOpportunityPerDay / 100000).toFixed(2)}L/day across illustrative 1,200 pod network.
            </p>
          </div>
        </div>

        {/* Aligned Metric Group — Plain English labels */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-2">
          <div>
            <div className="text-xs font-medium text-[#78716c] uppercase tracking-wide">Estimated Profit / Order</div>
            <div className="text-2xl sm:text-3xl font-bold text-[#1c1917] tracking-tight mt-1 font-mono">
              ₹{networkTotals.networkContributionPerOrder.toFixed(2)}
            </div>
            <div className="text-xs text-[#16a34a] mt-0.5 flex items-center gap-0.5">
              <span>+₹5.40 opportunity (Modelled)</span>
            </div>
          </div>

          <div>
            <div className="text-xs font-medium text-[#78716c] uppercase tracking-wide">Average Customer Basket</div>
            <div className="text-2xl sm:text-3xl font-bold text-[#1c1917] tracking-tight mt-1 font-mono">
              ₹{networkTotals.networkAov.toFixed(0)}
            </div>
            <div className="text-xs text-[#78716c] mt-0.5">Target: ₹735 (+5%)</div>
          </div>

          <div>
            <div className="text-xs font-medium text-[#78716c] uppercase tracking-wide">Discount Burn / Order</div>
            <div className="text-2xl sm:text-3xl font-bold text-[#1c1917] tracking-tight mt-1 font-mono">
              ₹18.20
            </div>
            <div className="text-xs text-[#dc2626] mt-0.5">₹6.90 avoidable leakage</div>
          </div>

          <div>
            <div className="text-xs font-medium text-[#78716c] uppercase tracking-wide">Delivery Transit Cost / Order</div>
            <div className="text-2xl sm:text-3xl font-bold text-[#1c1917] tracking-tight mt-1 font-mono">
              ₹31.10
            </div>
            <div className="text-xs text-[#d97706] mt-0.5">28% batching potential</div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CONTRIBUTION OPPORTUNITY & LEAKAGE BREAKDOWN */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-[#e7e5e4] pb-8">
        
        {/* Left Column: Network Opportunity Headline */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#fc8019]">
              Unified Optimization Impact
            </span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#f5f5f4] text-[#78716c] font-mono border border-[#e7e5e4]">
              MODELLED
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1c1917] font-mono">
            ₹{(networkTotals.totalOpportunityPerDay / 100000).toFixed(2)} Lakhs
          </div>
          <p className="text-sm text-[#57534e] leading-relaxed">
            Illustrative network contribution opportunity today across 1,200 pods (extrapolated from 6 sample pods). 
            Annualized theoretical potential: <strong className="text-[#1c1917]">₹{(networkTotals.annualizedNetworkOpportunity / 10000000).toFixed(1)} Crores</strong>.
          </p>
          
          <div className="pt-2">
            <button
              onClick={onNavigateToSimulation}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-[#1c1917] text-white hover:bg-[#292524] transition-colors"
            >
              <span>Validate via 100,000 Order Simulation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: What is Driving It? (Visual Bar & Direct Breakdown) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-[#78716c] uppercase tracking-wide">
            <span>What is driving margin leakage?</span>
            <span>Annualized Run Rate</span>
          </div>

          {/* Segmented Proportion Bar */}
          <div className="h-3 w-full bg-[#f5f5f4] rounded-full overflow-hidden flex border border-[#e7e5e4]" role="progressbar" aria-label="Leakage breakdown">
            <div className="bg-[#fc8019] h-full" style={{ width: '47%' }} title="Discount Leakage: 47%" />
            <div className="bg-[#3b82f6] h-full" style={{ width: '28%' }} title="Basket Opportunity: 28%" />
            <div className="bg-[#10b981] h-full" style={{ width: '16%' }} title="Delivery Economics: 16%" />
            <div className="bg-[#8b5cf6] h-full" style={{ width: '9%' }} title="Inventory & Expiry: 9%" />
          </div>

          {/* Breakdown Items List */}
          <div className="divide-y divide-[#e7e5e4] text-xs pt-1">
            {networkTotals.leakageBreakdown.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-xs ${
                    idx === 0 ? 'bg-[#fc8019]' :
                    idx === 1 ? 'bg-[#3b82f6]' :
                    idx === 2 ? 'bg-[#10b981]' : 'bg-[#8b5cf6]'
                  }`} />
                  <span className="font-medium text-[#1c1917]">{item.category}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[#78716c]">{item.percentage}%</span>
                  <span className="font-semibold text-[#1c1917]">₹{item.amountLakhs.toFixed(1)}L / day</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* SECTION 3: PRIORITY ACTIONS */}
      <section className="space-y-4 border-b border-[#e7e5e4] pb-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-[#78716c]">Decision Layer</span>
            <h3 className="text-lg font-bold text-[#1c1917] tracking-tight">
              Priority High-Impact Interventions
            </h3>
          </div>
          <span className="text-xs text-[#78716c]">Directly evaluated against SLA constraints</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="border border-[#e7e5e4] bg-white p-4 rounded hover:border-[#fc8019]/60 transition-colors">
            <div className="text-[11px] font-semibold text-[#fc8019] uppercase tracking-wider">Priority 1</div>
            <div className="text-sm font-bold text-[#1c1917] mt-1">Rationalize Inelastic Cart Coupons</div>
            <p className="text-xs text-[#57534e] mt-1 leading-relaxed">
              Withhold ₹20 blanket voucher on high-affinity baskets (AOV &gt; ₹600). Eliminates non-incremental burn with &lt;1.5% conversion elasticity risk.
            </p>
            <div className="mt-3 pt-3 border-t border-[#f5f5f4] flex items-center justify-between text-xs">
              <span className="font-medium text-[#16a34a]">+₹11.40 / eligible order</span>
              <button 
                onClick={() => onNavigateToOrder('ord_sim_004182')}
                className="text-[#fc8019] hover:underline font-medium inline-flex items-center gap-0.5"
              >
                Inspect Order <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="border border-[#e7e5e4] bg-white p-4 rounded hover:border-[#fc8019]/60 transition-colors">
            <div className="text-[11px] font-semibold text-[#3b82f6] uppercase tracking-wider">Priority 2</div>
            <div className="text-sm font-bold text-[#1c1917] mt-1">High-Margin Complementary Add-ons</div>
            <p className="text-xs text-[#57534e] mt-1 leading-relaxed">
              Trigger high-affinity pairing (Artisan Cold Brew ₹76) at cart checkout tray. P(Add)=44% lifts order contribution without picking bottlenecks.
            </p>
            <div className="mt-3 pt-3 border-t border-[#f5f5f4] flex items-center justify-between text-xs">
              <span className="font-medium text-[#16a34a]">+₹8.90 / add-on</span>
              <button 
                onClick={() => onOpenCopilotWithPrompt('Why does MarginOS recommend complementary products on order SIM-004182?')}
                className="text-[#fc8019] hover:underline font-medium inline-flex items-center gap-0.5"
              >
                Ask Analyst <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="border border-[#e7e5e4] bg-white p-4 rounded hover:border-[#fc8019]/60 transition-colors">
            <div className="text-[11px] font-semibold text-[#10b981] uppercase tracking-wider">Priority 3</div>
            <div className="text-sm font-bold text-[#1c1917] mt-1">Safe Spatial Dispatch Batching</div>
            <p className="text-xs text-[#57534e] mt-1 leading-relaxed">
              Pair concurrent orders within 450m radius. Reduces simulated delivery dispatch cost by ₹8.50 with SLA penalty bounded under 2.4 minutes.
            </p>
            <div className="mt-3 pt-3 border-t border-[#f5f5f4] flex items-center justify-between text-xs">
              <span className="font-medium text-[#16a34a]">+₹6.80 net savings</span>
              <button 
                onClick={() => onNavigateToStore('store_blr_001')}
                className="text-[#fc8019] hover:underline font-medium inline-flex items-center gap-0.5"
              >
                View Pod <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4: DARK STORE OPERATIONAL PERFORMANCE TABLE */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-[#78716c]">Network Pod Rankings</span>
            <h3 className="text-lg font-bold text-[#1c1917] tracking-tight">
              Dark Store Performance & Opportunity
            </h3>
          </div>
          <div className="text-xs text-[#78716c]">
            Showing 6 detailed sample pods (Simulated Store Profiles)
          </div>
        </div>

        {/* Clean Aligned Table — No redundant card containers */}
        <div className="border border-[#e7e5e4] rounded bg-white overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fafaf9] border-b border-[#e7e5e4] text-[#78716c] font-medium">
              <tr>
                <th className="py-2.5 px-4 font-semibold">Store / Pod</th>
                <th className="py-2.5 px-4 font-semibold">Zone</th>
                <th className="py-2.5 px-4 font-semibold text-right">Orders/Day</th>
                <th className="py-2.5 px-4 font-semibold text-right">Customer Basket (AOV)</th>
                <th className="py-2.5 px-4 font-semibold text-right">Estimated Profit / Order</th>
                <th className="py-2.5 px-4 font-semibold text-right">Daily Opportunity</th>
                <th className="py-2.5 px-4 font-semibold text-center">Top Leak</th>
                <th className="py-2.5 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e7e5e4] text-[#1c1917]">
              {darkStores.map((store) => (
                <tr key={store.id} className="hover:bg-[#fafaf9] transition-colors">
                  <td className="py-3 px-4 font-medium">
                    <button 
                      onClick={() => onNavigateToStore(store.id)}
                      className="text-left font-semibold text-[#1c1917] hover:text-[#fc8019]"
                    >
                      {store.name}
                    </button>
                    <div className="text-[11px] text-[#78716c]">{store.city}</div>
                  </td>
                  <td className="py-3 px-4 text-[#57534e]">{store.zone}</td>
                  <td className="py-3 px-4 text-right font-mono">{store.ordersPerDay.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right font-mono">₹{store.aov.toFixed(0)}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-semibold font-mono ${
                      store.contributionPerOrder >= 10 ? 'text-[#16a34a]' :
                      store.contributionPerOrder >= 6 ? 'text-[#d97706]' : 'text-[#dc2626]'
                    }`}>
                      ₹{store.contributionPerOrder.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-[#16a34a] font-mono">
                    +₹{(store.topOpportunities[0]?.potentialGainPerDay || 14000).toLocaleString()}/day
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-[#f5f5f4] text-[#44403c] border border-[#e7e5e4]">
                      {store.topProfitLeaks[0]?.category.split('(')[0].trim()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onNavigateToStore(store.id)}
                      className="text-xs font-semibold text-[#fc8019] hover:underline"
                    >
                      Inspect
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
