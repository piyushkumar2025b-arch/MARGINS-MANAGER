import { ExperimentHypothesis } from '../types';

export const BENCHMARK_EXPERIMENTS: ExperimentHypothesis[] = [
  {
    id: 'exp_01_basket',
    title: 'High-Affinity Complementary Add-ons at Checkout',
    description: 'Trigger 1 high-probability complementary product prompt inside the active cart tray before final payment.',
    variableTested: 'P(Add SKU | Cart Category Vector)',
    sampleSize: 50000,
    baselineStrategy: 'Standard static popular items carousel',
    treatmentStrategy: 'Dynamic MarginOS expected incremental contribution ranker',
    targetMetric: 'Contribution / Order (₹)',
    liftEstimate: 4.82,
    pValue: 0.0001,
    confidenceInterval: [4.15, 5.49],
    downsideRiskScenario: 'Cart drop-off if prompt increases friction (observed: -0.12% conversion risk, well within tolerance).',
    upsidePotentialScenario: '+₹4.82 per order across 1.2M daily orders yields +₹57.8 Lakhs incremental daily network contribution.',
    recommendationDecision: 'Deploy'
  },
  {
    id: 'exp_02_discount',
    title: 'Targeted Elasticity-Based Incentive Rationalization',
    description: 'Withhold blanket ₹20 coupons on high-intent baskets (AOV > ₹600) with predicted conversion probability > 94%.',
    variableTested: 'Incentive Elasticity Threshold (ε < 0.15)',
    sampleSize: 75000,
    baselineStrategy: 'Flat ₹20/₹30 coupon auto-applied on all carts',
    treatmentStrategy: 'MarginOS minimum-effective incentive model',
    targetMetric: 'Discount Leakage Reduction (₹ / order)',
    liftEstimate: 6.94,
    pValue: 0.00001,
    confidenceInterval: [6.32, 7.56],
    downsideRiskScenario: 'Small conversion elasticity dip of 1.4% on price-sensitive subsets.',
    upsidePotentialScenario: 'Conserves ₹83.2 Lakhs daily in non-incremental marketing promotional burn.',
    recommendationDecision: 'Deploy'
  },
  {
    id: 'exp_03_delivery',
    title: 'Safe Spatial Dispatch Batching (450m Radius)',
    description: 'Pair two concurrent orders if destination centroid is within 450m and second order ETA delta ≤ 3.5 minutes.',
    variableTested: 'Dispatch Batching Window (3.5 min max delay)',
    sampleSize: 40000,
    baselineStrategy: 'Solitary point-to-point rider dispatch for every order',
    treatmentStrategy: 'Dynamic twin-order co-routing with SLA bounds',
    targetMetric: 'Delivery Cost / Order (₹)',
    liftEstimate: 5.10,
    pValue: 0.0002,
    confidenceInterval: [4.40, 5.80],
    downsideRiskScenario: 'Late delivery SLA penalty if rider gets delayed in high-traffic peak.',
    upsidePotentialScenario: 'Frees 28% rider capacity during peak rush hour while saving ₹61 Lakhs/day.',
    recommendationDecision: 'Deploy'
  },
  {
    id: 'exp_04_inventory',
    title: 'Dynamic Expiry Perishable Clearance Engine',
    description: 'Target dairy and bakery items with ≤ 36 hours shelf-life to nearby repeat shoppers with 25% price cut.',
    variableTested: 'Shelf-Life Decay Velocity Trigger',
    sampleSize: 30000,
    baselineStrategy: 'Fixed shelf clearance or end-of-day store write-off',
    treatmentStrategy: 'Proactive MarginOS clearance discount prompt',
    targetMetric: 'Shrinkage & Wastage Allocation (% of Revenue)',
    liftEstimate: 1.85,
    pValue: 0.0012,
    confidenceInterval: [1.30, 2.40],
    downsideRiskScenario: 'Cannibalization of standard full-margin fresh produce.',
    upsidePotentialScenario: 'Recovers 64% of product cost on items that would otherwise suffer 100% loss.',
    recommendationDecision: 'Deploy'
  }
];
