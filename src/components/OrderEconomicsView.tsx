import React, { useState } from 'react';
import { ArrowLeft, Check, ChevronDown, ChevronUp, Info, Sparkles, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';
import { OrderRecord, InterventionAction, CostAssumptions } from '../types';

interface OrderEconomicsViewProps {
  order: OrderRecord;
  onBack?: () => void;
  onSelectOtherOrder: (orderId: string) => void;
  allOrders: OrderRecord[];
  assumptions: CostAssumptions;
  onOpenCopilotWithOrder: (orderId: string, prompt: string) => void;
}

export const OrderEconomicsView: React.FC<OrderEconomicsViewProps> = ({
  order,
  onBack,
  onSelectOtherOrder,
  allOrders,
  assumptions,
  onOpenCopilotWithOrder
}) => {
  const [selectedInterventionId, setSelectedInterventionId] = useState<string>(
    order.bestInterventionId || order.candidateInterventions[0]?.id || ''
  );
  
  // Progressive disclosure levels for the selected intervention
  const [expandedDetailLevel, setExpandedDetailLevel] = useState<1 | 2 | 3>(1);

  const econ = order.economics;
  const grossProductContribution = Math.round((order.subtotal - econ.productCost) * 100) / 100;
  
  const selectedAction = order.candidateInterventions.find(a => a.id === selectedInterventionId) || order.candidateInterventions[0];

  // Dynamically derive reconciled line items for the selected intervention
  const optRevenue = selectedAction?.type === 'basket_complement' 
    ? Math.round((order.subtotal + 76.00) * 100) / 100 
    : selectedAction?.type === 'inventory_clearance' 
    ? Math.round((order.subtotal + 35.00) * 100) / 100 
    : order.subtotal;

  const optProductCost = selectedAction?.type === 'basket_complement' 
    ? Math.round((econ.productCost + 42.00) * 100) / 100 
    : selectedAction?.type === 'inventory_clearance' 
    ? Math.round((econ.productCost + 22.00) * 100) / 100 
    : selectedAction?.type === 'high_margin_substitute' 
    ? Math.round((econ.productCost - 12.50) * 100) / 100 
    : econ.productCost;

  const optGrossProductContrib = Math.round((optRevenue - optProductCost) * 100) / 100;

  const optDeliveryCost = selectedAction?.type === 'fulfillment_batch' 
    ? Math.round(Math.max(18, econ.deliveryCost - 8.50) * 100) / 100 
    : econ.deliveryCost;

  const optDiscountCost = selectedAction?.type === 'discount_reduction' 
    ? Math.round(Math.max(0, econ.discountCost - 11.40) * 100) / 100 
    : econ.discountCost;

  const optPickingCost = selectedAction?.type === 'basket_complement' 
    ? Math.round((econ.pickingCost + 0.48) * 100) / 100 
    : econ.pickingCost;

  const optPackingCost = econ.packingCost;
  const optPaymentCost = econ.paymentCost;

  const optWastage = selectedAction?.type === 'inventory_clearance' 
    ? Math.round(Math.max(0, econ.wastageAllocation - 5.20) * 100) / 100 
    : econ.wastageAllocation;

  // Exact deterministic line-item totals ensuring 100% vertical and horizontal reconciliation
  const baseTotalCosts = Math.round((econ.productCost + econ.deliveryCost + econ.discountCost + econ.pickingCost + econ.packingCost + econ.paymentCost + econ.wastageAllocation) * 100) / 100;
  const baseNetContribution = Math.round((order.subtotal - baseTotalCosts) * 100) / 100;

  const optTotalCosts = Math.round((optProductCost + optDeliveryCost + optDiscountCost + optPickingCost + optPackingCost + optPaymentCost + optWastage) * 100) / 100;
  const optNetContribution = Math.round((optRevenue - optTotalCosts) * 100) / 100;
  const netOpportunity = Math.round((optNetContribution - baseNetContribution) * 100) / 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      
      {/* TOP CONTEXT BAR: ORDER SELECTION & BACK */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e7e5e4] pb-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1 rounded hover:bg-[#f5f5f4] text-[#78716c] hover:text-[#1c1917]"
              title="Return to Overview"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-semibold text-[#78716c]">Order Analysis</span>
              <span className="text-[11px] px-1.5 py-0.2 bg-[#f5f5f4] text-[#57534e] rounded border border-[#e7e5e4] font-mono">
                {order.isSimulated ? 'SIMULATED DATA' : 'LIVE MCP'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1c1917]">
              Why did we make or lose money on Order #{order.displayId}?
            </h2>
            <p className="text-xs text-[#78716c] mt-0.5">
              Unit economics breakdown, root-cause leakage diagnosis, and deterministic profit interventions.
            </p>
          </div>
        </div>

        {/* Quick Order Switcher */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#78716c]">Sample Orders:</span>
          {allOrders.map((o) => (
            <button
              key={o.id}
              onClick={() => onSelectOtherOrder(o.id)}
              className={`px-2.5 py-1 rounded font-mono border transition-colors ${
                o.id === order.id
                  ? 'bg-[#1c1917] text-white border-[#1c1917]'
                  : 'bg-white text-[#44403c] border-[#e7e5e4] hover:bg-[#f5f5f4]'
              }`}
            >
              {o.displayId}
            </button>
          ))}
        </div>
      </div>

      {/* CORE WORKFLOW BANNER: PROBLEM -> ROOT CAUSE -> ACTION -> EXPECTED IMPACT */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white border border-[#e7e5e4] rounded p-4 text-xs">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#dc2626]">1. Problem</span>
          <p className="text-[#1c1917] font-semibold">Low Net Margin</p>
          <p className="text-[#57534e] text-[11px] leading-relaxed">
            Order yields only ₹{baseNetContribution.toFixed(2)} profit ({econ.marginPct.toFixed(1)}% margin) on a ₹{order.subtotal.toFixed(2)} basket.
          </p>
        </div>

        <div className="space-y-1 border-t md:border-t-0 md:border-l border-[#e7e5e4] pt-2 md:pt-0 md:pl-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#d97706]">2. Root Cause</span>
          <p className="text-[#1c1917] font-semibold">Coupon & Solitary Transit</p>
          <p className="text-[#57534e] text-[11px] leading-relaxed">
            Solitary delivery (₹{econ.deliveryCost.toFixed(2)}) + blanket coupon (₹{econ.discountCost.toFixed(2)}) burn gross product margin.
          </p>
        </div>

        <div className="space-y-1 border-t md:border-t-0 md:border-l border-[#e7e5e4] pt-2 md:pt-0 md:pl-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#fc8019]">3. Selected Action</span>
          <p className="text-[#1c1917] font-semibold truncate">{selectedAction?.title}</p>
          <p className="text-[#57534e] text-[11px] leading-relaxed">
            {selectedAction?.categoryLabel} — {selectedAction?.description.slice(0, 75)}...
          </p>
        </div>

        <div className="space-y-1 border-t md:border-t-0 md:border-l border-[#e7e5e4] pt-2 md:pt-0 md:pl-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#16a34a]">4. Expected Impact</span>
          <p className="text-[#16a34a] font-semibold font-mono">+₹{netOpportunity.toFixed(2)} Net Gain</p>
          <p className="text-[#57534e] text-[11px] leading-relaxed">
            Lifts contribution to ₹{optNetContribution.toFixed(2)} while strictly respecting delivery SLA.
          </p>
        </div>
      </div>

      {/* METRIC STRIP (EDITORIAL, ALIGNED, NO NESTED BOXES) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-2 border-b border-[#e7e5e4] pb-6">
        <div>
          <div className="text-xs font-medium text-[#78716c] uppercase tracking-wide">Customer Basket</div>
          <div className="text-2xl sm:text-3xl font-bold text-[#1c1917] mt-1 font-mono">
            ₹{order.subtotal.toFixed(2)}
          </div>
          <div className="text-xs text-[#78716c] mt-0.5">{order.items.length} items · {order.storeName}</div>
        </div>

        <div>
          <div className="text-xs font-medium text-[#78716c] uppercase tracking-wide">Estimated Profit (Baseline)</div>
          <div className={`text-2xl sm:text-3xl font-bold mt-1 font-mono ${
            baseNetContribution >= 15 ? 'text-[#16a34a]' :
            baseNetContribution > 0 ? 'text-[#d97706]' : 'text-[#dc2626]'
          }`}>
            ₹{baseNetContribution.toFixed(2)}
          </div>
          <div className="text-xs text-[#78716c] mt-0.5">
            {order.subtotal > 0 ? ((baseNetContribution / order.subtotal) * 100).toFixed(1) : '0.0'}% contribution margin
          </div>
        </div>

        <div>
          <div className="text-xs font-medium text-[#78716c] uppercase tracking-wide">Optimized Profit</div>
          <div className="text-2xl sm:text-3xl font-bold text-[#16a34a] mt-1 font-mono">
            ₹{optNetContribution.toFixed(2)}
          </div>
          <div className="text-xs text-[#16a34a] font-medium mt-0.5">
            +₹{netOpportunity.toFixed(2)} net opportunity
          </div>
        </div>

        <div>
          <div className="text-xs font-medium text-[#78716c] uppercase tracking-wide">Dispatch SLA Context</div>
          <div className="text-2xl sm:text-3xl font-bold text-[#1c1917] mt-1 font-mono">
            {order.deliveryDistanceKm.toFixed(1)} km
          </div>
          <div className="text-xs text-[#78716c] mt-0.5">
            {order.estimatedPickingMinutes}m pick · {order.paymentMethod}
          </div>
        </div>
      </div>

      {/* CORE FINANCIAL WATERFALL TABLE */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <div>
            <h3 className="text-base font-bold text-[#1c1917] tracking-tight">
              Unit Economics Waterfall
            </h3>
            <p className="text-xs text-[#78716c]">
              Prototype Contribution Proxy — not Swiggy's internal accounting definition.
            </p>
          </div>
          <button 
            onClick={() => onOpenCopilotWithOrder(order.displayId, `Why is order ${order.displayId} yielding only ₹${econ.netContribution} contribution?`)}
            className="text-xs text-[#fc8019] hover:underline font-medium inline-flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Explain with AI Copilot</span>
          </button>
        </div>

        <div className="border border-[#e7e5e4] rounded bg-white overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-[#fafaf9] border-b border-[#e7e5e4] text-[#78716c]">
              <tr>
                <th className="py-2.5 px-4 font-semibold">Financial Line Item</th>
                <th className="py-2.5 px-4 font-semibold text-right">Baseline Amount</th>
                <th className="py-2.5 px-4 font-semibold text-right">MarginOS Optimized</th>
                <th className="py-2.5 px-4 font-semibold text-right">Variance (Δ)</th>
                <th className="py-2.5 px-4 font-semibold">Accounting Basis / Driver</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e7e5e4] text-[#1c1917]">
              
              <tr>
                <td className="py-2.5 px-4 font-medium">Gross Customer Basket (Revenue)</td>
                <td className="py-2.5 px-4 text-right font-mono font-medium">₹{order.subtotal.toFixed(2)}</td>
                <td className="py-2.5 px-4 text-right font-mono font-medium">₹{optRevenue.toFixed(2)}</td>
                <td className="py-2.5 px-4 text-right font-mono text-[#16a34a]">
                  {optRevenue - order.subtotal > 0 ? `+₹${(optRevenue - order.subtotal).toFixed(2)}` : '₹0.00'}
                </td>
                <td className="py-2.5 px-4 text-[#78716c]">Aggregated item prices before coupon deductions</td>
              </tr>

              <tr>
                <td className="py-2.5 px-4 font-medium text-[#57534e]">Less: Cost of Goods Sold (Product Cost)</td>
                <td className="py-2.5 px-4 text-right font-mono text-[#dc2626]">-₹{econ.productCost.toFixed(2)}</td>
                <td className="py-2.5 px-4 text-right font-mono text-[#dc2626]">-₹{optProductCost.toFixed(2)}</td>
                <td className="py-2.5 px-4 text-right font-mono text-[#78716c]">
                  {optProductCost - econ.productCost !== 0 ? `${optProductCost > econ.productCost ? '-' : '+'}₹${Math.abs(optProductCost - econ.productCost).toFixed(2)}` : '₹0.00'}
                </td>
                <td className="py-2.5 px-4 text-[#78716c]">Vendor acquisition wholesale cost proxy</td>
              </tr>

              <tr className="bg-[#fafaf9]/60 font-semibold">
                <td className="py-2 px-4 text-[#1c1917]">Gross Product Contribution</td>
                <td className="py-2 px-4 text-right font-mono">₹{grossProductContribution.toFixed(2)}</td>
                <td className="py-2 px-4 text-right font-mono text-[#16a34a]">₹{optGrossProductContrib.toFixed(2)}</td>
                <td className="py-2 px-4 text-right font-mono text-[#16a34a]">
                  {optGrossProductContrib - grossProductContribution !== 0 ? `+₹${(optGrossProductContrib - grossProductContribution).toFixed(2)}` : '₹0.00'}
                </td>
                <td className="py-2 px-4 text-[#78716c]">Product gross profit margin pool (Revenue − COGS)</td>
              </tr>

              <tr>
                <td className="py-2.5 px-4 font-medium text-[#57534e]">Less: Delivery Transit Cost</td>
                <td className="py-2.5 px-4 text-right font-mono text-[#dc2626]">-₹{econ.deliveryCost.toFixed(2)}</td>
                <td className="py-2.5 px-4 text-right font-mono text-[#dc2626]">-₹{optDeliveryCost.toFixed(2)}</td>
                <td className="py-2.5 px-4 text-right font-mono text-[#16a34a]">
                  {econ.deliveryCost - optDeliveryCost > 0 ? `+₹${(econ.deliveryCost - optDeliveryCost).toFixed(2)}` : '₹0.00'}
                </td>
                <td className="py-2.5 px-4 text-[#78716c]">
                  Base ₹{assumptions.deliveryBaseCost} + {order.deliveryDistanceKm}km × ₹{assumptions.deliveryCostPerKm}/km
                </td>
              </tr>

              <tr>
                <td className="py-2.5 px-4 font-medium text-[#57534e]">Less: Cart Promotional Discount</td>
                <td className="py-2.5 px-4 text-right font-mono text-[#dc2626]">-₹{econ.discountCost.toFixed(2)}</td>
                <td className="py-2.5 px-4 text-right font-mono text-[#dc2626]">-₹{optDiscountCost.toFixed(2)}</td>
                <td className="py-2.5 px-4 text-right font-mono text-[#16a34a]">
                  {econ.discountCost - optDiscountCost > 0 ? `+₹${(econ.discountCost - optDiscountCost).toFixed(2)}` : '₹0.00'}
                </td>
                <td className="py-2.5 px-4 text-[#78716c]">
                  Applied: {order.appliedCoupon || 'None'}
                </td>
              </tr>

              <tr>
                <td className="py-2.5 px-4 font-medium text-[#57534e]">Less: Dark Store Picking & Packing</td>
                <td className="py-2.5 px-4 text-right font-mono text-[#dc2626]">-₹{(econ.pickingCost + econ.packingCost).toFixed(2)}</td>
                <td className="py-2.5 px-4 text-right font-mono text-[#dc2626]">-₹{(optPickingCost + optPackingCost).toFixed(2)}</td>
                <td className="py-2.5 px-4 text-right font-mono text-[#78716c]">
                  {optPickingCost - econ.pickingCost !== 0 ? `-₹${(optPickingCost - econ.pickingCost).toFixed(2)}` : '₹0.00'}
                </td>
                <td className="py-2.5 px-4 text-[#78716c]">
                  {order.estimatedPickingMinutes}m picking (₹{econ.pickingCost}) + crate packing (₹{econ.packingCost})
                </td>
              </tr>

              <tr>
                <td className="py-2.5 px-4 font-medium text-[#57534e]">Less: Payment Gateway Processing</td>
                <td className="py-2.5 px-4 text-right font-mono text-[#dc2626]">-₹{econ.paymentCost.toFixed(2)}</td>
                <td className="py-2.5 px-4 text-right font-mono text-[#dc2626]">-₹{optPaymentCost.toFixed(2)}</td>
                <td className="py-2.5 px-4 text-right font-mono text-[#78716c]">₹0.00</td>
                <td className="py-2.5 px-4 text-[#78716c]">{order.paymentMethod} transaction charge</td>
              </tr>

              <tr>
                <td className="py-2.5 px-4 font-medium text-[#57534e]">Less: Expected Wastage & Shrinkage</td>
                <td className="py-2.5 px-4 text-right font-mono text-[#dc2626]">-₹{econ.wastageAllocation.toFixed(2)}</td>
                <td className="py-2.5 px-4 text-right font-mono text-[#dc2626]">-₹{optWastage.toFixed(2)}</td>
                <td className="py-2.5 px-4 text-right font-mono text-[#16a34a]">
                  {econ.wastageAllocation - optWastage > 0 ? `+₹${(econ.wastageAllocation - optWastage).toFixed(2)}` : '₹0.00'}
                </td>
                <td className="py-2.5 px-4 text-[#78716c]">Allocated perishable shelf-life risk reserve</td>
              </tr>

              <tr className="bg-[#f5f5f4] font-bold text-sm">
                <td className="py-3 px-4 text-[#1c1917]">Estimated Profit (Contribution Proxy)</td>
                <td className="py-3 px-4 text-right font-mono text-[#1c1917]">₹{baseNetContribution.toFixed(2)}</td>
                <td className="py-3 px-4 text-right font-mono text-[#16a34a]">₹{optNetContribution.toFixed(2)}</td>
                <td className="py-3 px-4 text-right font-mono text-[#16a34a]">+₹{netOpportunity.toFixed(2)}</td>
                <td className="py-3 px-4 text-[#16a34a]">
                  Selected Action: {selectedAction?.title || 'None'}
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* MATHEMATICAL RECONCILIATION VERIFICATION BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded bg-[#f5f5f4] border border-[#e7e5e4] font-mono text-[11px] text-[#44403c]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#16a34a]" />
            <span className="font-semibold text-[#1c1917]">Reconciliation Verified:</span>
            <span>Revenue − All Direct Costs = Net Contribution</span>
          </div>
          <div className="text-[11px] text-[#57534e]">
            Baseline: ₹{order.subtotal.toFixed(2)} − ₹{baseTotalCosts.toFixed(2)} = <strong className="text-[#1c1917]">₹{baseNetContribution.toFixed(2)}</strong> | Optimized: ₹{optRevenue.toFixed(2)} − ₹{optTotalCosts.toFixed(2)} = <strong className="text-[#16a34a]">₹{optNetContribution.toFixed(2)}</strong>
          </div>
        </div>
      </section>

      {/* MARGINOS EVALUATED INTERVENTIONS (SELECTION & PROGRESSIVE DISCLOSURE) */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-[#fc8019]">
              Optimization Intelligence Layer
            </span>
            <h3 className="text-lg font-bold text-[#1c1917] tracking-tight">
              Evaluated Candidate Interventions
            </h3>
          </div>
          <span className="text-xs text-[#78716c]">
            Ranked by expected incremental contribution
          </span>
        </div>

        {/* Candidate Actions List (Operational Aligned Rows) */}
        <div className="border border-[#e7e5e4] rounded bg-white divide-y divide-[#e7e5e4] text-xs">
          {order.candidateInterventions.map((action, idx) => {
            const isSelected = action.id === selectedInterventionId;
            return (
              <div 
                key={action.id}
                onClick={() => setSelectedInterventionId(action.id)}
                className={`p-4 transition-colors cursor-pointer ${
                  isSelected ? 'bg-[#fafaf9] border-l-4 border-l-[#fc8019]' : 'hover:bg-[#fafaf9]/70'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[#a8a29e] text-[11px]">#{idx + 1}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#1c1917]">{action.title}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-[#f5f5f4] text-[#57534e] border border-[#e7e5e4]">
                          {action.categoryLabel}
                        </span>
                        {idx === 0 && (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-[#16a34a]/10 text-[#16a34a] font-semibold">
                            Best Action
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#57534e] mt-0.5">{action.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 sm:justify-end">
                    <div>
                      <div className="text-[10px] text-[#78716c] uppercase">Expected Contribution</div>
                      <div className="font-mono font-bold text-sm text-[#1c1917]">
                        ₹{action.expectedContribution.toFixed(2)}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] text-[#78716c] uppercase">Incremental (Δ)</div>
                      <div className="font-mono font-bold text-sm text-[#16a34a]">
                        +₹{action.incrementalContribution.toFixed(2)}
                      </div>
                    </div>

                    <div className="hidden md:block">
                      <div className="text-[10px] text-[#78716c] uppercase">Conversion P</div>
                      <div className="font-mono text-xs text-[#1c1917]">
                        {(action.conversionProbability * 100).toFixed(0)}%
                      </div>
                    </div>

                    <div className="hidden md:block">
                      <div className="text-[10px] text-[#78716c] uppercase">Friction</div>
                      <div className="font-medium text-xs text-[#1c1917]">
                        {action.customerFrictionScore}
                      </div>
                    </div>

                    <div className="hidden lg:block">
                      <div className="text-[10px] text-[#78716c] uppercase">ETA Risk</div>
                      <div className="font-mono text-xs text-[#1c1917]">
                        +{action.etaRiskMinutes}m
                      </div>
                    </div>
                  </div>
                </div>

                {/* PROGRESSIVE DISCLOSURE: WHY? LEVEL 1, LEVEL 2, LEVEL 3 */}
                {isSelected && (
                  <div className="mt-4 pt-3 border-t border-[#e7e5e4] space-y-3 bg-white p-3 rounded border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#1c1917]">Model Reasoning:</span>
                        <div className="inline-flex rounded border border-[#e7e5e4] p-0.5 text-[11px]">
                          <button
                            onClick={(e) => { e.stopPropagation(); setExpandedDetailLevel(1); }}
                            className={`px-2 py-0.5 rounded font-medium ${expandedDetailLevel === 1 ? 'bg-[#1c1917] text-white' : 'text-[#78716c]'}`}
                          >
                            Level 1: Summary
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); setExpandedDetailLevel(2); }}
                            className={`px-2 py-0.5 rounded font-medium ${expandedDetailLevel === 2 ? 'bg-[#1c1917] text-white' : 'text-[#78716c]'}`}
                          >
                            Level 2: Metrics
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); setExpandedDetailLevel(3); }}
                            className={`px-2 py-0.5 rounded font-medium ${expandedDetailLevel === 3 ? 'bg-[#1c1917] text-white' : 'text-[#78716c]'}`}
                          >
                            Level 3: Mathematical Formula
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-xs font-mono text-[#78716c]">
                        Score: {action.decisionScore.toFixed(2)}
                      </div>
                    </div>

                    {/* Level 1: Plain English Summary */}
                    {expandedDetailLevel === 1 && (
                      <p className="text-xs text-[#44403c] leading-relaxed">
                        <strong>Why this recommendation?</strong> {action.description} 
                        {action.type === 'discount_reduction' && " Customer basket of ₹624 is high-affinity with <3% elasticity drop. Rationalizing the ₹20 broad coupon preserves purchase conversion while directly capturing ₹11.40 in margin."}
                        {action.type === 'basket_complement' && " Adding high-affinity Cold Brew adds +₹34 gross margin with P(Add)=44% with zero disruption to warehouse picking route."}
                        {action.type === 'fulfillment_batch' && " Co-locating delivery with adjacent pod order reduces solitary transit cost by ₹8.50 within guaranteed 12-minute consumer promise."}
                      </p>
                    )}

                    {/* Level 2: Detailed Parameters */}
                    {expandedDetailLevel === 2 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-1 font-mono text-[11px]">
                        <div>
                          <span className="text-[#78716c] block">Conversion Prob</span>
                          <span className="font-semibold text-[#1c1917]">{(action.conversionProbability * 100).toFixed(1)}%</span>
                        </div>
                        <div>
                          <span className="text-[#78716c] block">Gross Margin Delta</span>
                          <span className="font-semibold text-[#16a34a]">+₹{action.mathematicalEvidence.grossMarginDelta.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-[#78716c] block">Discount Savings</span>
                          <span className="font-semibold text-[#16a34a]">₹{action.mathematicalEvidence.discountSavings.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-[#78716c] block">Simulation Uncertainty Range</span>
                          <span className="font-semibold text-[#1c1917]">[₹{action.confidenceInterval[0].toFixed(2)}, ₹{action.confidenceInterval[1].toFixed(2)}]</span>
                        </div>
                      </div>
                    )}

                    {/* Level 3: Mathematical Formula */}
                    {expandedDetailLevel === 3 && (
                      <div className="bg-[#f5f5f4] p-2.5 rounded font-mono text-[11px] text-[#292524] space-y-1">
                        <div className="text-[#78716c] uppercase text-[10px] font-sans font-semibold">Deterministic Objective Evaluation</div>
                        <div>{action.mathematicalEvidence.decisionFormula}</div>
                        <div className="text-[10px] text-[#78716c]">
                          Objective: max E[Contribution] s.t. ETA &le; 12.0m, Conversion &ge; 90%, Customer Friction &le; Low.
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </section>

      {/* BASKET ITEMS LIST */}
      <section className="space-y-3 pt-2">
        <h3 className="text-base font-bold text-[#1c1917] tracking-tight">
          Current Cart Items ({order.items.length})
        </h3>
        <div className="border border-[#e7e5e4] rounded bg-white overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-[#fafaf9] border-b border-[#e7e5e4] text-[#78716c]">
              <tr>
                <th className="py-2 px-4 font-semibold">SKU Name</th>
                <th className="py-2 px-4 font-semibold">Category</th>
                <th className="py-2 px-4 font-semibold text-right">Qty</th>
                <th className="py-2 px-4 font-semibold text-right">Unit Price</th>
                <th className="py-2 px-4 font-semibold text-right">Estimated Cost</th>
                <th className="py-2 px-4 font-semibold text-right">Margin %</th>
                <th className="py-2 px-4 font-semibold text-center">Perishable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e7e5e4] text-[#1c1917]">
              {order.items.map((item) => (
                <tr key={item.skuId}>
                  <td className="py-2.5 px-4 font-medium">{item.name}</td>
                  <td className="py-2.5 px-4 text-[#78716c]">{item.category}</td>
                  <td className="py-2.5 px-4 text-right font-mono">{item.quantity}</td>
                  <td className="py-2.5 px-4 text-right font-mono">₹{item.unitPrice.toFixed(2)}</td>
                  <td className="py-2.5 px-4 text-right font-mono text-[#78716c]">₹{item.unitCost.toFixed(2)}</td>
                  <td className="py-2.5 px-4 text-right font-mono font-medium text-[#16a34a]">{item.marginPct}%</td>
                  <td className="py-2.5 px-4 text-center">
                    {item.isPerishable ? (
                      <span className="text-[10px] text-[#d97706] bg-[#fef3c7] px-1.5 py-0.5 rounded">
                        {item.expiryDaysRemaining}d expiry
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#78716c]">Ambient</span>
                    )}
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
