export interface OrderItem {
  skuId: string;
  name: string;
  category: 'Dairy & Bread' | 'Fruits & Vegetables' | 'Snacks & Beverages' | 'Instant Food' | 'Personal Care' | 'Household';
  quantity: number;
  unitPrice: number;
  unitCost: number;
  marginPct: number;
  isPerishable: boolean;
  expiryDaysRemaining?: number;
}

export interface CostAssumptions {
  deliveryBaseCost: number;       // default ₹22.00
  deliveryCostPerKm: number;      // default ₹4.50
  pickingCostPerMinute: number;   // default ₹1.20
  packingCostBase: number;        // default ₹4.50
  paymentGatewayPct: number;      // default 1.4%
  paymentGatewayFixed: number;    // default ₹1.50
  wastagePerishablePct: number;   // default 3.5%
  wastageNonPerishablePct: number;// default 0.4%
}

export interface ContributionBreakdown {
  revenue: number;
  productCost: number;
  deliveryCost: number;
  pickingCost: number;
  packingCost: number;
  discountCost: number;
  paymentCost: number;
  wastageAllocation: number;
  netContribution: number;
  marginPct: number;
}

export interface InterventionAction {
  id: string;
  type: 
    | 'no_action' 
    | 'basket_complement' 
    | 'discount_reduction' 
    | 'high_margin_substitute' 
    | 'fulfillment_batch' 
    | 'inventory_clearance';
  title: string;
  categoryLabel: string;
  description: string;
  expectedRevenue: number;
  expectedCost: number;
  expectedContribution: number;
  incrementalContribution: number;
  conversionProbability: number;
  customerFrictionScore: 'Low' | 'Medium' | 'High';
  frictionNumeric: number; // 0 - 10 scale
  etaRiskMinutes: number;
  inventoryRisk: 'Low' | 'Medium' | 'High';
  confidenceInterval: [number, number];
  decisionScore: number;
  isFeasible: boolean;
  feasibilityReason?: string;
  recommendedSku?: {
    skuId: string;
    name: string;
    price: number;
    marginPct: number;
    coPurchaseLift: number;
  };
  mathematicalEvidence: {
    priorConversion: number;
    newConversion: number;
    grossMarginDelta: number;
    discountSavings: number;
    deliveryCostDelta: number;
    etaImpactMinutes: number;
    riskAdjustment: number;
    decisionFormula: string;
  };
}

export interface OrderRecord {
  id: string;
  displayId: string;
  timestamp: string;
  storeId: string;
  storeName: string;
  city: string;
  items: OrderItem[];
  subtotal: number;
  currentDiscount: number;
  appliedCoupon?: string;
  deliveryDistanceKm: number;
  estimatedPickingMinutes: number;
  paymentMethod: 'UPI' | 'Credit Card' | 'NetBanking' | 'Cash on Delivery';
  economics: ContributionBreakdown;
  potentialEconomics?: ContributionBreakdown;
  candidateInterventions: InterventionAction[];
  bestInterventionId?: string;
  totalOpportunityDelta: number;
  isSimulated: boolean;
}

export interface DarkStore {
  id: string;
  name: string;
  city: string;
  zone: string;
  ordersPerDay: number;
  aov: number;
  contributionPerOrder: number;
  contributionPerDay: number;
  orderDensity: number; // orders / sq km
  skuCount: number;
  inventoryUtilizationPct: number;
  stockoutRatePct: number;
  expiryWastageRatePct: number;
  avgPickingTimeMinutes: number;
  avgDeliveryCost: number;
  topProfitLeaks: {
    category: string;
    amountPerDay: number;
    sharePct: number;
  }[];
  topOpportunities: {
    action: string;
    potentialGainPerDay: number;
  }[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface SimulationResult {
  sampleSize: number;
  executionTimeMs: number;
  timestamp: string;
  baseline: {
    aov: number;
    conversionRate: number;
    discountPerOrder: number;
    deliveryCostPerOrder: number;
    contributionPerOrder: number;
    totalContribution: number;
    stockoutRate: number;
    wastageRate: number;
    etaComplianceRate: number;
  };
  marginOS: {
    aov: number;
    conversionRate: number;
    discountPerOrder: number;
    deliveryCostPerOrder: number;
    contributionPerOrder: number;
    totalContribution: number;
    stockoutRate: number;
    wastageRate: number;
    etaComplianceRate: number;
  };
  delta: {
    contributionPerOrder: number;
    totalContributionGain: number;
    aovLift: number;
    discountLeakageSaved: number;
    deliveryCostSaved: number;
    liftPercentage: number;
  };
  distributions: {
    baselinePercentiles: { p5: number; p25: number; p50: number; p75: number; p95: number; std: number };
    marginOSPercentiles: { p5: number; p25: number; p50: number; p75: number; p95: number; std: number };
    confidenceInterval95: [number, number];
  };
  histogram: {
    bins: string[];
    baselineFrequencies: number[];
    marginOSFrequencies: number[];
  };
}

export interface ExperimentHypothesis {
  id: string;
  title: string;
  description: string;
  variableTested: string;
  sampleSize: number;
  baselineStrategy: string;
  treatmentStrategy: string;
  targetMetric: string;
  liftEstimate: number;
  pValue: number;
  confidenceInterval: [number, number];
  downsideRiskScenario: string;
  upsidePotentialScenario: string;
  recommendationDecision: 'Deploy' | 'Iterate' | 'Reject';
}

export type ApplicationMode = 'simulation' | 'live_read_only' | 'assisted_live';

export interface SwiggyMcpState {
  isConnected: boolean;
  mode: ApplicationMode;
  serverEndpoint: string;
  authenticatedUser?: {
    userId: string;
    name: string;
    primaryPhone: string;
    addresses: { id: string; label: string; addressLine: string; isDefault: boolean }[];
  };
  activeCart?: {
    cartId: string;
    items: { skuId: string; name: string; quantity: number; price: number }[];
    subtotal: number;
    discount: number;
    availableCoupons: { code: string; discountAmount: number; minCart: number }[];
  };
  recentOrdersCount: number;
  lastSyncTimestamp?: string;
  simulatedEconomicsLabel: string;
}

export interface CopilotMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  functionInvoked?: string;
  evidenceData?: {
    label: string;
    values: { name: string; value: string | number; change?: string }[];
  };
  suggestedPrompts?: string[];
}

export interface NetworkTotals {
  storeCount: number;
  totalOrdersPerDay: number;
  networkAov: number;
  networkContributionPerOrder: number;
  networkContributionPerDay: number;
  networkAnnualizedRunRate: number;
  totalOpportunityPerDay: number;
  annualizedNetworkOpportunity: number;
  leakageBreakdown: { category: string; amountLakhs: number; percentage: number }[];
}

export interface DigitalTwinScenario {
  aovMultiplier: number;
  discountSpendMultiplier: number;
  deliveryCostMultiplier: number;
  orderDensityMultiplier: number;
  conversionMultiplier: number;
  wastageMultiplier: number;
  storeCount: number;
}

export interface CopilotResponse {
  answer: string;
  evidenceUsed: string[];
  suggestedNextAction?: string;
}
