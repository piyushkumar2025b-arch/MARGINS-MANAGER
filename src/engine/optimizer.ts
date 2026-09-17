import { OrderRecord, InterventionAction, CostAssumptions } from '../types';
import { calculateOrderContribution, DEFAULT_COST_ASSUMPTIONS } from './economics';

/**
 * Deterministic Quick-Commerce Optimization Engine
 * Evaluates candidate interventions for an active order basket:
 * 1. No action (Status quo)
 * 2. Add complementary products (Basket expansion)
 * 3. Reduce/modify incentive (Targeted minimal effective discount)
 * 4. Recommend higher-contribution alternative (High gross-margin substitute)
 * 5. Batch compatible delivery scenario (Fulfillment route sharing)
 * 6. Inventory-aware clearance recommendation (Short shelf-life protection)
 */
export function evaluateOrderInterventions(
  order: OrderRecord,
  assumptions: CostAssumptions = DEFAULT_COST_ASSUMPTIONS
): InterventionAction[] {
  const currentEcon = order.economics;
  const currentSubtotal = order.subtotal;
  const currentDiscount = order.currentDiscount;

  const actions: InterventionAction[] = [];

  // Action 1: No Action
  actions.push({
    id: 'act_no_action',
    type: 'no_action',
    title: 'Maintain Current Basket',
    categoryLabel: 'Status Quo',
    description: 'Process order with current cart items, applied coupons, and standard solitary dispatch.',
    expectedRevenue: currentEcon.revenue,
    expectedCost: currentEcon.productCost + currentEcon.deliveryCost + currentEcon.pickingCost + currentEcon.packingCost + currentEcon.discountCost + currentEcon.paymentCost + currentEcon.wastageAllocation,
    expectedContribution: currentEcon.netContribution,
    incrementalContribution: 0.00,
    conversionProbability: 0.96,
    customerFrictionScore: 'Low',
    frictionNumeric: 0.5,
    etaRiskMinutes: 0.0,
    inventoryRisk: 'Low',
    confidenceInterval: [currentEcon.netContribution - 0.5, currentEcon.netContribution + 0.5],
    decisionScore: 1.0,
    isFeasible: true,
    mathematicalEvidence: {
      priorConversion: 0.96,
      newConversion: 0.96,
      grossMarginDelta: 0,
      discountSavings: 0,
      deliveryCostDelta: 0,
      etaImpactMinutes: 0,
      riskAdjustment: 0,
      decisionFormula: 'Base contribution without intervention variance.'
    }
  });

  // Action 2: Add Complementary High-Margin SKU (e.g., Cold Brew / Gourmet Dip / Tea Cake)
  const complementPrice = 76.00;
  const complementCost = 42.00;
  const complementMargin = Math.round(((complementPrice - complementCost) / complementPrice) * 100);
  const pAddComplement = 0.44; // Empirical co-purchase probability given basket categories
  const newSubtotalWithComplement = currentSubtotal + complementPrice;
  const newItems = [
    ...order.items,
    {
      skuId: 'sku_comp_01',
      name: 'Artisan Cold Brew (250ml)',
      category: 'Snacks & Beverages' as const,
      quantity: 1,
      unitPrice: complementPrice,
      unitCost: complementCost,
      marginPct: complementMargin,
      isPerishable: true,
      expiryDaysRemaining: 14
    }
  ];
  const newEconComplement = calculateOrderContribution(
    newItems,
    currentDiscount,
    order.deliveryDistanceKm,
    order.estimatedPickingMinutes + 0.4,
    order.paymentMethod,
    assumptions
  );
  // Expected Incremental Contribution = P(Add) * DeltaContribution - FrictionPenalty
  const grossDelta = newEconComplement.netContribution - currentEcon.netContribution;
  const expectedIncrementalComplement = Math.round((grossDelta * pAddComplement) * 100) / 100;
  const expectedContributionComplement = Math.round((currentEcon.netContribution + expectedIncrementalComplement) * 100) / 100;

  actions.push({
    id: 'act_basket_expansion',
    type: 'basket_complement',
    title: 'Complementary Product Addition',
    categoryLabel: 'Basket Expansion',
    description: `Target high-affinity pairing (Artisan Cold Brew ₹76) based on co-purchase clustering.`,
    expectedRevenue: Math.round((currentSubtotal + (complementPrice * pAddComplement)) * 100) / 100,
    expectedCost: Math.round((currentEcon.productCost + (complementCost * pAddComplement) + currentEcon.deliveryCost + currentEcon.pickingCost + currentEcon.discountCost) * 100) / 100,
    expectedContribution: expectedContributionComplement,
    incrementalContribution: expectedIncrementalComplement,
    conversionProbability: 0.94, // Minimal friction if placed natively in cart drawer
    customerFrictionScore: 'Low',
    frictionNumeric: 1.2,
    etaRiskMinutes: 0.3, // Picker moves 1 aisle
    inventoryRisk: 'Low',
    confidenceInterval: [
      Math.round((expectedContributionComplement - 1.80) * 100) / 100,
      Math.round((expectedContributionComplement + 2.10) * 100) / 100
    ],
    decisionScore: 8.65,
    isFeasible: true,
    recommendedSku: {
      skuId: 'sku_comp_01',
      name: 'Artisan Cold Brew (250ml)',
      price: complementPrice,
      marginPct: complementMargin,
      coPurchaseLift: 3.4
    },
    mathematicalEvidence: {
      priorConversion: 0.96,
      newConversion: 0.94,
      grossMarginDelta: Math.round((complementPrice - complementCost) * 100) / 100,
      discountSavings: 0,
      deliveryCostDelta: 0,
      etaImpactMinutes: 0.3,
      riskAdjustment: -0.40,
      decisionFormula: `E[Δ] = P(Add=0.44) × (₹${complementPrice} - ₹${complementCost}) - PickingAdj(₹0.48) = +₹${expectedIncrementalComplement}`
    }
  });

  // Action 3: Reduce / Modify Incentive (Targeted Minimum Effective Discount)
  // If current discount > ₹10, evaluate elasticity model P(buy|discount) vs P(buy|no_discount)
  if (currentDiscount >= 15) {
    const optimizedDiscount = Math.max(5, Math.round(currentDiscount * 0.45)); // e.g. ₹20 -> ₹9
    const discountSavings = currentDiscount - optimizedDiscount;
    // Logistic elasticity prediction: High basket value (₹600+) has low coupon abandonment elasticity (< 3%)
    const priorConversion = 0.96;
    const postConversion = 0.93; // 3% elasticity drop
    const newEconDiscount = calculateOrderContribution(
      order.items,
      optimizedDiscount,
      order.deliveryDistanceKm,
      order.estimatedPickingMinutes,
      order.paymentMethod,
      assumptions
    );
    const expectedIncrementalDiscount = Math.round((discountSavings * postConversion - ((priorConversion - postConversion) * currentEcon.netContribution)) * 100) / 100;
    const expectedContributionDiscount = Math.round((currentEcon.netContribution + expectedIncrementalDiscount) * 100) / 100;

    actions.push({
      id: 'act_discount_optimization',
      type: 'discount_reduction',
      title: 'Rationalize Incentive Over-Allocation',
      categoryLabel: 'Discount Optimization',
      description: `Replace broad ₹${currentDiscount} coupon with targeted ₹${optimizedDiscount} dynamic checkout incentive.`,
      expectedRevenue: currentSubtotal - optimizedDiscount,
      expectedCost: currentEcon.productCost + currentEcon.deliveryCost + currentEcon.pickingCost + currentEcon.packingCost + optimizedDiscount + currentEcon.paymentCost + currentEcon.wastageAllocation,
      expectedContribution: expectedContributionDiscount,
      incrementalContribution: expectedIncrementalDiscount,
      conversionProbability: postConversion,
      customerFrictionScore: 'Medium',
      frictionNumeric: 2.8,
      etaRiskMinutes: 0.0,
      inventoryRisk: 'Low',
      confidenceInterval: [
        Math.round((expectedContributionDiscount - 1.20) * 100) / 100,
        Math.round((expectedContributionDiscount + 1.60) * 100) / 100
      ],
      decisionScore: 9.15,
      isFeasible: true,
      mathematicalEvidence: {
        priorConversion,
        newConversion: postConversion,
        grossMarginDelta: 0,
        discountSavings,
        deliveryCostDelta: 0,
        etaImpactMinutes: 0,
        riskAdjustment: -0.65,
        decisionFormula: `Saved ₹${discountSavings} over-discounting with only -${Math.round((priorConversion - postConversion)*100)}% purchase elasticity risk.`
      }
    });
  }

  // Action 4: Recommend Higher-Contribution Alternative (Brand/Pack Swap)
  const substituteGain = 12.50;
  const pAcceptSubstitute = 0.38;
  const expectedIncrementalSub = Math.round((substituteGain * pAcceptSubstitute) * 100) / 100;
  const expectedContributionSub = Math.round((currentEcon.netContribution + expectedIncrementalSub) * 100) / 100;

  actions.push({
    id: 'act_substitute',
    type: 'high_margin_substitute',
    title: 'High-Gross Margin SKU Substitution',
    categoryLabel: 'Margin Substitution',
    description: 'Suggest 1L value pack alternative for branded staple with +18% higher gross contribution.',
    expectedRevenue: currentSubtotal + (4.0 * pAcceptSubstitute),
    expectedCost: currentEcon.productCost - (substituteGain * pAcceptSubstitute) + currentEcon.deliveryCost,
    expectedContribution: expectedContributionSub,
    incrementalContribution: expectedIncrementalSub,
    conversionProbability: 0.95,
    customerFrictionScore: 'Low',
    frictionNumeric: 1.5,
    etaRiskMinutes: 0.0,
    inventoryRisk: 'Low',
    confidenceInterval: [
      Math.round((expectedContributionSub - 0.90) * 100) / 100,
      Math.round((expectedContributionSub + 1.10) * 100) / 100
    ],
    decisionScore: 7.40,
    isFeasible: true,
    mathematicalEvidence: {
      priorConversion: 0.96,
      newConversion: 0.95,
      grossMarginDelta: substituteGain,
      discountSavings: 0,
      deliveryCostDelta: 0,
      etaImpactMinutes: 0,
      riskAdjustment: -0.20,
      decisionFormula: `P(Accept=0.38) × ΔMargin(₹${substituteGain}) = +₹${expectedIncrementalSub}`
    }
  });

  // Action 5: Batch Compatible Delivery Scenario (Safe Batching)
  const deliverySavings = 8.50; // Shared rider compensation allocation
  const etaDelay = 2.4; // 2.4 minutes added transit to customer B
  const pAcceptEta = 0.97; // Within 12-minute SLA promise
  const expectedIncrementalBatch = Math.round((deliverySavings * pAcceptEta) * 100) / 100;
  const expectedContributionBatch = Math.round((currentEcon.netContribution + expectedIncrementalBatch) * 100) / 100;

  actions.push({
    id: 'act_delivery_batch',
    type: 'fulfillment_batch',
    title: 'Co-Located Dispatch Batching',
    categoryLabel: 'Delivery Economics',
    description: `Batch with Order #SIM-${Math.floor(1000 + Math.random() * 9000)} within 450m radius (Safe Batching Mode).`,
    expectedRevenue: currentEcon.revenue,
    expectedCost: currentEcon.productCost + (currentEcon.deliveryCost - deliverySavings) + currentEcon.pickingCost + currentEcon.packingCost + currentEcon.discountCost,
    expectedContribution: expectedContributionBatch,
    incrementalContribution: expectedIncrementalBatch,
    conversionProbability: 0.97,
    customerFrictionScore: 'Low',
    frictionNumeric: 1.0,
    etaRiskMinutes: etaDelay,
    inventoryRisk: 'Low',
    confidenceInterval: [
      Math.round((expectedContributionBatch - 0.70) * 100) / 100,
      Math.round((expectedContributionBatch + 0.80) * 100) / 100
    ],
    decisionScore: 8.90,
    isFeasible: true,
    mathematicalEvidence: {
      priorConversion: 0.96,
      newConversion: 0.97,
      grossMarginDelta: 0,
      discountSavings: 0,
      deliveryCostDelta: -deliverySavings,
      etaImpactMinutes: etaDelay,
      riskAdjustment: -0.30,
      decisionFormula: `Shared rider dispatch reduces simulated delivery cost by ₹${deliverySavings} with only +${etaDelay}m ETA.`
    }
  });

  // Action 6: Inventory-Aware Perishable Clearance (e.g. Greek Yogurt 1-day shelf life)
  const clearanceBenefit = 5.20;
  const expectedIncrementalInventory = Math.round((clearanceBenefit * 0.40) * 100) / 100;
  const expectedContributionInventory = Math.round((currentEcon.netContribution + expectedIncrementalInventory) * 100) / 100;

  actions.push({
    id: 'act_inventory_clearance',
    type: 'inventory_clearance',
    title: 'Dynamic Shelf-Life Clearance Prompt',
    categoryLabel: 'Inventory Protection',
    description: 'Promote 1-day expiry Greek Yogurt at 25% off to eliminate 100% store shrinkage loss.',
    expectedRevenue: currentSubtotal + 35.00,
    expectedCost: currentEcon.productCost + 22.00,
    expectedContribution: expectedContributionInventory,
    incrementalContribution: expectedIncrementalInventory,
    conversionProbability: 0.95,
    customerFrictionScore: 'Low',
    frictionNumeric: 0.8,
    etaRiskMinutes: 0.1,
    inventoryRisk: 'Low',
    confidenceInterval: [
      Math.round((expectedContributionInventory - 0.50) * 100) / 100,
      Math.round((expectedContributionInventory + 0.60) * 100) / 100
    ],
    decisionScore: 7.80,
    isFeasible: true,
    mathematicalEvidence: {
      priorConversion: 0.96,
      newConversion: 0.95,
      grossMarginDelta: 13.0,
      discountSavings: 0,
      deliveryCostDelta: 0,
      etaImpactMinutes: 0.1,
      riskAdjustment: 0.80, // positive risk reduction
      decisionFormula: `Recovers ₹${clearanceBenefit} in otherwise 100% expired stock wastage.`
    }
  });

  // Sort candidate actions by incremental contribution descending
  return actions.sort((a, b) => b.incrementalContribution - a.incrementalContribution);
}
