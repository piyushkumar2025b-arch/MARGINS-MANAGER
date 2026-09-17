import { DarkStore, DigitalTwinScenario, NetworkTotals } from '../types';

export const SAMPLE_DARK_STORES: DarkStore[] = [
  {
    id: 'store_blr_001',
    name: 'Indiranagar 100ft Road',
    city: 'Bengaluru',
    zone: 'East Bengaluru',
    ordersPerDay: 4280,
    aov: 684.50,
    contributionPerOrder: 11.20,
    contributionPerDay: 47936,
    orderDensity: 142.5,
    skuCount: 6840,
    inventoryUtilizationPct: 84.2,
    stockoutRatePct: 2.8,
    expiryWastageRatePct: 2.1,
    avgPickingTimeMinutes: 2.4,
    avgDeliveryCost: 28.40,
    topProfitLeaks: [
      { category: 'Over-Discounting (Excessive cart coupons)', amountPerDay: 18400, sharePct: 44 },
      { category: 'Solitary Dispatch (Low batching rate)', amountPerDay: 12200, sharePct: 29 },
      { category: 'Perishable Expiry (Dairy & Bakery)', amountPerDay: 7100, sharePct: 17 },
      { category: 'Picker Travel Inefficiency', amountPerDay: 4180, sharePct: 10 }
    ],
    topOpportunities: [
      { action: 'Targeted Cart Dynamic Add-ons (+₹45 AOV)', potentialGainPerDay: 24800 },
      { action: 'Safe Dispatch Batching (450m radius)', potentialGainPerDay: 16400 },
      { action: 'Dynamic Shelf-Life Clearance Prompt', potentialGainPerDay: 8200 }
    ],
    coordinates: { lat: 12.9784, lng: 77.6408 }
  },
  {
    id: 'store_blr_002',
    name: 'Koramangala 4th Block',
    city: 'Bengaluru',
    zone: 'South Bengaluru',
    ordersPerDay: 5120,
    aov: 642.00,
    contributionPerOrder: 6.80,
    contributionPerDay: 34816,
    orderDensity: 168.0,
    skuCount: 7120,
    inventoryUtilizationPct: 89.5,
    stockoutRatePct: 4.2,
    expiryWastageRatePct: 3.4,
    avgPickingTimeMinutes: 3.1,
    avgDeliveryCost: 31.80,
    topProfitLeaks: [
      { category: 'Discount Leakage (Repeated broad codes)', amountPerDay: 26800, sharePct: 48 },
      { category: 'Rider Congestion / Delivery Costs', amountPerDay: 16300, sharePct: 29 },
      { category: 'Cold Storage Spoilage', amountPerDay: 7800, sharePct: 14 },
      { category: 'Packing Over-Allocation', amountPerDay: 5100, sharePct: 9 }
    ],
    topOpportunities: [
      { action: 'Incentive Rationalization (Save ₹12/order)', potentialGainPerDay: 32600 },
      { action: 'Peak-Hour Batching Engine', potentialGainPerDay: 19800 },
      { action: 'Fresh Produce Clearance Trigger', potentialGainPerDay: 9400 }
    ],
    coordinates: { lat: 12.9345, lng: 77.6266 }
  },
  {
    id: 'store_chn_001',
    name: 'Tambaram West Hub',
    city: 'Chennai',
    zone: 'South Chennai',
    ordersPerDay: 2840,
    aov: 592.00,
    contributionPerOrder: 4.80,
    contributionPerDay: 13632,
    orderDensity: 74.0,
    skuCount: 5400,
    inventoryUtilizationPct: 76.1,
    stockoutRatePct: 5.6,
    expiryWastageRatePct: 4.1,
    avgPickingTimeMinutes: 2.8,
    avgDeliveryCost: 34.60,
    topProfitLeaks: [
      { category: 'Long Transit Dispatches (>3.8km avg)', amountPerDay: 14200, sharePct: 42 },
      { category: 'Discount Leakage', amountPerDay: 11400, sharePct: 34 },
      { category: 'Stockout Lost Sales Exposure', amountPerDay: 5200, sharePct: 15 },
      { category: 'Bakery Expiry', amountPerDay: 3000, sharePct: 9 }
    ],
    topOpportunities: [
      { action: 'Multi-Order Route Optimization', potentialGainPerDay: 18200 },
      { action: 'Margin-Positive Basket Cross-Sell', potentialGainPerDay: 12600 },
      { action: 'Reorder Safety Stock Adjustment', potentialGainPerDay: 6400 }
    ],
    coordinates: { lat: 12.9249, lng: 80.1000 }
  },
  {
    id: 'store_mum_001',
    name: 'Powai Hiranandani',
    city: 'Mumbai',
    zone: 'Central Mumbai',
    ordersPerDay: 4650,
    aov: 748.00,
    contributionPerOrder: 14.50,
    contributionPerDay: 67425,
    orderDensity: 155.0,
    skuCount: 7850,
    inventoryUtilizationPct: 91.2,
    stockoutRatePct: 3.1,
    expiryWastageRatePct: 1.8,
    avgPickingTimeMinutes: 2.2,
    avgDeliveryCost: 29.10,
    topProfitLeaks: [
      { category: 'High Incentive Usage on Prime Baskets', amountPerDay: 21400, sharePct: 46 },
      { category: 'High-Demand Rush Hour Surcharge', amountPerDay: 13200, sharePct: 28 },
      { category: 'High Pack Shrinkage', amountPerDay: 7200, sharePct: 15 },
      { category: 'Slow Replenishment Delay', amountPerDay: 5100, sharePct: 11 }
    ],
    topOpportunities: [
      { action: 'Incentive Cap on Baskets >₹800', potentialGainPerDay: 28400 },
      { action: 'Artisan Gourmet Upsell Clustering', potentialGainPerDay: 22100 },
      { action: 'Co-Located Dispatch Batching', potentialGainPerDay: 14900 }
    ],
    coordinates: { lat: 19.1176, lng: 72.9060 }
  },
  {
    id: 'store_hyd_001',
    name: 'Gachibowli Tech Enclave',
    city: 'Hyderabad',
    zone: 'West Hyderabad',
    ordersPerDay: 3950,
    aov: 670.00,
    contributionPerOrder: 8.90,
    contributionPerDay: 35155,
    orderDensity: 118.0,
    skuCount: 6500,
    inventoryUtilizationPct: 82.0,
    stockoutRatePct: 3.8,
    expiryWastageRatePct: 2.6,
    avgPickingTimeMinutes: 2.5,
    avgDeliveryCost: 30.50,
    topProfitLeaks: [
      { category: 'Under-Optimized Add-Ons in IT corridor', amountPerDay: 16800, sharePct: 39 },
      { category: 'Delivery Solitary Runs during Lunch Peak', amountPerDay: 13500, sharePct: 31 },
      { category: 'Over-Discounting via Partner Cards', amountPerDay: 9200, sharePct: 21 },
      { category: 'Snack Aisle Congestion', amountPerDay: 3800, sharePct: 9 }
    ],
    topOpportunities: [
      { action: 'Office Basket Grouping Recommendations', potentialGainPerDay: 21600 },
      { action: 'Safe Dispatch Batching', potentialGainPerDay: 15300 },
      { action: 'Discount Cap on High-Intent Customers', potentialGainPerDay: 11800 }
    ],
    coordinates: { lat: 17.4401, lng: 78.3489 }
  },
  {
    id: 'store_del_001',
    name: 'Gurugram Cyber City Hub',
    city: 'Delhi-NCR',
    zone: 'Gurugram',
    ordersPerDay: 4890,
    aov: 725.00,
    contributionPerOrder: 12.80,
    contributionPerDay: 62592,
    orderDensity: 162.0,
    skuCount: 7400,
    inventoryUtilizationPct: 88.0,
    stockoutRatePct: 3.5,
    expiryWastageRatePct: 2.2,
    avgPickingTimeMinutes: 2.3,
    avgDeliveryCost: 31.20,
    topProfitLeaks: [
      { category: 'Broad Flat Couponing', amountPerDay: 23100, sharePct: 45 },
      { category: 'High Evening Distance Deliveries', amountPerDay: 15800, sharePct: 31 },
      { category: 'Fresh Salad & Fruit Expiry', amountPerDay: 7900, sharePct: 15 },
      { category: 'Tamper Packaging Re-work', amountPerDay: 4600, sharePct: 9 }
    ],
    topOpportunities: [
      { action: 'Micro-Targeted Checkout Prompts', potentialGainPerDay: 29500 },
      { action: 'Dynamic Cluster Route Batching', potentialGainPerDay: 18700 },
      { action: 'Shelf-Life Risk Dynamic Discounts', potentialGainPerDay: 11200 }
    ],
    coordinates: { lat: 28.4950, lng: 77.0895 }
  }
];

export function calculateNetworkTotals(stores: DarkStore[] = SAMPLE_DARK_STORES): NetworkTotals {
  // Multiply sample stores to represent the 1,200 virtual dark store national network
  const scaleFactor = 1200 / stores.length;
  
  let totalOrdersPerDay = 0;
  let weightedContributionSum = 0;
  let weightedAovSum = 0;

  for (const store of stores) {
    totalOrdersPerDay += store.ordersPerDay * scaleFactor;
    weightedContributionSum += (store.contributionPerOrder * store.ordersPerDay) * scaleFactor;
    weightedAovSum += (store.aov * store.ordersPerDay) * scaleFactor;
  }

  const networkAov = Math.round((weightedAovSum / totalOrdersPerDay) * 100) / 100;
  const networkContributionPerOrder = Math.round((weightedContributionSum / totalOrdersPerDay) * 100) / 100;
  const networkContributionPerDay = Math.round(weightedContributionSum);
  const networkAnnualizedRunRate = Math.round(networkContributionPerDay * 365);

  // Opportunity per order estimated conservatively at +₹4.50 to +₹6.20
  const avgOpportunityPerOrder = 5.40;
  const totalOpportunityPerDay = Math.round(totalOrdersPerDay * avgOpportunityPerOrder);
  const annualizedNetworkOpportunity = Math.round(totalOpportunityPerDay * 365);

  const leakageBreakdown = [
    { category: 'Discount Leakage (Unnecessary broad incentives)', amountLakhs: 181.2, percentage: 47 },
    { category: 'Basket Economics (Under-indexed high-margin add-ons)', amountLakhs: 108.0, percentage: 28 },
    { category: 'Fulfillment & Solitary Dispatch (Low batching rate)', amountLakhs: 61.7, percentage: 16 },
    { category: 'Perishable Wastage & Stockout Penalties', amountLakhs: 34.7, percentage: 9 }
  ];

  return {
    storeCount: 1200,
    totalOrdersPerDay: Math.round(totalOrdersPerDay),
    networkAov,
    networkContributionPerOrder,
    networkContributionPerDay,
    networkAnnualizedRunRate,
    totalOpportunityPerDay,
    annualizedNetworkOpportunity,
    leakageBreakdown
  };
}

export function runDigitalTwinSensitivity(
  scenario: DigitalTwinScenario,
  baselineTotals: NetworkTotals
) {
  // Baseline values
  const baseAov = baselineTotals.networkAov;
  const baseContribution = baselineTotals.networkContributionPerOrder;
  const baseOrders = baselineTotals.totalOrdersPerDay;

  // New simulated values
  const newAov = Math.round((baseAov * scenario.aovMultiplier) * 100) / 100;
  
  // Contribution equation changes:
  // Higher AOV gives ~35% incremental margin on basket delta
  const aovDeltaContribution = (newAov - baseAov) * 0.35;
  // Reduced discount spend directly adds to contribution:
  const discountSavingsPerOrder = 18.0 * (1 - scenario.discountSpendMultiplier);
  // Delivery cost savings:
  const deliverySavingsPerOrder = 31.0 * (1 - scenario.deliveryCostMultiplier);
  // Wastage reduction:
  const wastageSavingsPerOrder = 6.2 * (1 - scenario.wastageMultiplier);

  const newContribution = Math.round(
    (baseContribution + aovDeltaContribution + discountSavingsPerOrder + deliverySavingsPerOrder + wastageSavingsPerOrder) * 100
  ) / 100;

  const contributionImprovement = Math.round((newContribution - baseContribution) * 100) / 100;
  const newTotalOrders = Math.round(baseOrders * scenario.orderDensityMultiplier);
  const dailyGain = Math.round(newTotalOrders * contributionImprovement);
  const annualizedTheoreticalOpportunity = Math.round(dailyGain * 365);

  return {
    baseline: {
      aov: baseAov,
      contributionPerOrder: baseContribution,
      dailyOrders: baseOrders,
      dailyContribution: Math.round(baseOrders * baseContribution)
    },
    scenario: {
      aov: newAov,
      contributionPerOrder: newContribution,
      dailyOrders: newTotalOrders,
      dailyContribution: Math.round(newTotalOrders * newContribution)
    },
    delta: {
      aovChange: Math.round((newAov - baseAov) * 100) / 100,
      contributionImprovement,
      dailyOpportunityGain: dailyGain,
      annualizedTheoreticalOpportunity,
      confidenceInterval: [
        Math.round((contributionImprovement * 0.88) * 100) / 100,
        Math.round((contributionImprovement * 1.12) * 100) / 100
      ]
    },
    disclaimer: 'Simulation / sensitivity analysis — not a financial forecast.'
  };
}
