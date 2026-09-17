import { CostAssumptions, ContributionBreakdown, OrderItem } from '../types';

export const DEFAULT_COST_ASSUMPTIONS: CostAssumptions = {
  deliveryBaseCost: 22.00,       // Base dark store dispatch fee
  deliveryCostPerKm: 4.50,       // Rider transit per kilometer
  pickingCostPerMinute: 1.20,    // Dark store picker wage per minute
  packingCostBase: 4.50,         // Tamper-evident bags + crates handling
  paymentGatewayPct: 0.014,      // 1.4% blended gateway fee
  paymentGatewayFixed: 1.50,     // ₹1.50 fixed processing
  wastagePerishablePct: 0.035,   // 3.5% allocated shrinkage on dairy/produce
  wastageNonPerishablePct: 0.004 // 0.4% allocated shelf-life risk
};

/**
 * Deterministic Prototype Contribution Proxy
 * Contribution(order) = Revenue 
 *                     - ProductCost 
 *                     - DeliveryCost 
 *                     - PickingCost 
 *                     - PackingCost 
 *                     - DiscountCost 
 *                     - PaymentCost 
 *                     - ExpectedWastageAllocation
 *
 * NOTE: Clearly labeled in UI as:
 * "Prototype Contribution Proxy — not Swiggy's internal accounting definition."
 */
export function calculateOrderContribution(
  items: OrderItem[],
  currentDiscount: number,
  deliveryDistanceKm: number,
  estimatedPickingMinutes: number,
  paymentMethod: string,
  assumptions: CostAssumptions = DEFAULT_COST_ASSUMPTIONS
): ContributionBreakdown {
  const subtotal = items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const revenue = Math.max(0, subtotal - currentDiscount);
  const productCost = items.reduce((sum, item) => sum + (item.unitCost * item.quantity), 0);
  
  // Deterministic Delivery Cost
  const deliveryCost = Math.round((assumptions.deliveryBaseCost + (deliveryDistanceKm * assumptions.deliveryCostPerKm)) * 100) / 100;
  
  // Deterministic Picking & Packing
  const pickingCost = Math.round((estimatedPickingMinutes * assumptions.pickingCostPerMinute) * 100) / 100;
  const packingCost = assumptions.packingCostBase;
  
  // Payment Cost
  let paymentCost = 0;
  if (paymentMethod === 'UPI') {
    paymentCost = 0.50; // Low UPI MDR
  } else if (paymentMethod === 'Cash on Delivery') {
    paymentCost = 5.00; // Cash handling fee proxy
  } else {
    paymentCost = Math.round(((revenue * assumptions.paymentGatewayPct) + assumptions.paymentGatewayFixed) * 100) / 100;
  }
  
  // Wastage Allocation
  let wastageAllocation = 0;
  for (const item of items) {
    const itemTotal = item.unitPrice * item.quantity;
    if (item.isPerishable) {
      wastageAllocation += itemTotal * assumptions.wastagePerishablePct;
    } else {
      wastageAllocation += itemTotal * assumptions.wastageNonPerishablePct;
    }
  }
  wastageAllocation = Math.round(wastageAllocation * 100) / 100;

  const totalCost = productCost + deliveryCost + pickingCost + packingCost + currentDiscount + paymentCost + wastageAllocation;
  const netContribution = Math.round((subtotal - totalCost) * 100) / 100;
  const marginPct = subtotal > 0 ? Math.round((netContribution / subtotal) * 1000) / 10 : 0;

  return {
    revenue: Math.round(subtotal * 100) / 100,
    productCost: Math.round(productCost * 100) / 100,
    deliveryCost,
    pickingCost,
    packingCost,
    discountCost: Math.round(currentDiscount * 100) / 100,
    paymentCost,
    wastageAllocation,
    netContribution,
    marginPct
  };
}
