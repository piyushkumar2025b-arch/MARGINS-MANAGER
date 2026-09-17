import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  ShoppingBag, 
  Building2, 
  Sliders, 
  Play, 
  Beaker, 
  Presentation, 
  Sparkles, 
  Smartphone, 
  Monitor, 
  ShoppingCart, 
  CheckCircle2, 
  ChevronRight, 
  AlertCircle,
  Wifi,
  Battery,
  Layers,
  ArrowUpRight
} from 'lucide-react';

import { 
  OrderRecord, 
  DarkStore, 
  NetworkTotals, 
  CostAssumptions, 
  ApplicationMode, 
  SimulationResult,
  CopilotResponse 
} from './types';

import { ContextTopBar } from './components/ContextTopBar';
import { DemoScenariosBar, DEMO_SCENARIOS } from './components/DemoScenariosBar';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { OrderEconomicsView } from './components/OrderEconomicsView';
import { DarkStoreAnalytics } from './components/DarkStoreAnalytics';
import { SimulationLab } from './components/SimulationLab';
import { DigitalTwinView } from './components/DigitalTwinView';
import { ExperimentLabView } from './components/ExperimentLabView';
import { PitchModeView } from './components/PitchModeView';
import { AiCopilotSheet } from './components/AiCopilotSheet';
import { CostAssumptionsModal } from './components/CostAssumptionsModal';
import { AssistedCheckoutModal } from './components/AssistedCheckoutModal';

import { DEFAULT_COST_ASSUMPTIONS, calculateOrderContribution } from './engine/economics';
import { evaluateOrderInterventions } from './engine/optimizer';
import { runMonteCarloSimulation } from './engine/simulation';
import { SAMPLE_DARK_STORES, calculateNetworkTotals } from './engine/storeAnalytics';
import { DEMO_ORDER_SIM_004182, GENERATED_ORDERS } from './engine/swiggyCommerceProvider';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'overview' | 'order' | 'stores' | 'simulation' | 'digital_twin' | 'experiments' | 'pitch'>('overview');
  const [selectedOrderId, setSelectedOrderId] = useState<string>('ord_sim_004182');
  const [selectedStoreId, setSelectedStoreId] = useState<string>('store_blr_001');
  const [activeScenarioId, setActiveScenarioId] = useState<number | undefined>(undefined);

  // Viewport mode: Desktop Enterprise Console vs Android Google Pixel Frame
  const [viewportMode, setViewportMode] = useState<'desktop' | 'android'>('desktop');

  // Application & Mode State
  const [appMode, setAppMode] = useState<ApplicationMode>('simulation');
  const [costAssumptions, setCostAssumptions] = useState<CostAssumptions>(DEFAULT_COST_ASSUMPTIONS);
  const [isAssumptionsOpen, setIsAssumptionsOpen] = useState<boolean>(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [copilotPrefillPrompt, setCopilotPrefillPrompt] = useState<string>('');
  const [isAssistedCheckoutOpen, setIsAssistedCheckoutOpen] = useState<boolean>(false);

  // Data Store State
  const [orders, setOrders] = useState<OrderRecord[]>(GENERATED_ORDERS);
  const [darkStores, setDarkStores] = useState<DarkStore[]>(SAMPLE_DARK_STORES);
  const [networkTotals, setNetworkTotals] = useState<NetworkTotals>(() => calculateNetworkTotals(SAMPLE_DARK_STORES));
  const [simulationResult, setSimulationResult] = useState<SimulationResult>(() => runMonteCarloSimulation(100000));
  const [isSimulatedData, setIsSimulatedData] = useState<boolean>(true);

  // Sync / Recalculate when Cost Assumptions Change
  const handleSaveAssumptions = (newAssumptions: CostAssumptions) => {
    setCostAssumptions(newAssumptions);
    
    // Deterministically recalculate all orders with the new assumptions
    setOrders(prevOrders => prevOrders.map(ord => {
      const updatedEcon = calculateOrderContribution(
        ord.items,
        ord.currentDiscount,
        ord.deliveryDistanceKm,
        ord.estimatedPickingMinutes,
        ord.paymentMethod,
        newAssumptions
      );
      const updatedRecord = { ...ord, economics: updatedEcon };
      updatedRecord.candidateInterventions = evaluateOrderInterventions(updatedRecord, newAssumptions);
      return updatedRecord;
    }));
  };

  const handleResetAssumptions = () => {
    handleSaveAssumptions(DEFAULT_COST_ASSUMPTIONS);
  };

  // Selected Order Object
  const currentOrder = orders.find(o => o.id === selectedOrderId || o.displayId === selectedOrderId) || orders[0];

  // Demo Walkthrough Scenario Controller (Section 22)
  const handleSelectDemoScenario = (scenarioId: number) => {
    setActiveScenarioId(scenarioId);

    switch (scenarioId) {
      case 1: // Turn an Unprofitable Order Profitable
        setSelectedOrderId('ord_sim_004182');
        setActiveTab('order');
        break;

      case 2: // Optimize a Dark Store
        setSelectedStoreId('store_chn_001'); // Tambaram West Hub
        setActiveTab('stores');
        break;

      case 3: // Reduce Discount Leakage
        setSelectedOrderId('ord_sim_004182');
        setActiveTab('order');
        break;

      case 4: // Increase Basket Economics
        setSelectedOrderId('ord_sim_004182');
        setActiveTab('order');
        break;

      case 5: // Optimize Delivery Economics
        setSelectedOrderId('ord_sim_004182');
        setActiveTab('order');
        break;

      case 6: // Run 100,000 Order Simulation
        setActiveTab('simulation');
        break;

      case 7: // Compare Baseline vs MarginOS
        setActiveTab('simulation');
        break;

      case 8: // Analyze Live Instamart Cart & Safe Checkout
        setSelectedOrderId('ord_sim_004182');
        setIsAssistedCheckoutOpen(true);
        break;

      case 9: // Explain the AI Decision
        setCopilotPrefillPrompt('Why did MarginOS select discount rationalization as the highest-scoring candidate for order SIM-004182?');
        setIsCopilotOpen(true);
        break;

      default:
        break;
    }
  };

  // Open Copilot with targeted context
  const handleOpenCopilot = (prompt: string) => {
    setCopilotPrefillPrompt(prompt);
    setIsCopilotOpen(true);
  };

  // Copilot backend query dispatcher
  const handleExecuteCopilotQuery = async (prompt: string, context?: any): Promise<CopilotResponse> => {
    try {
      const res = await fetch('/api/copilot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          query: prompt,
          prompt, 
          activeOrderId: currentOrder.displayId,
          context 
        })
      });
      if (!res.ok) throw new Error('API query failed');
      const data = await res.json();
      return {
        answer: data.answer || data.response || 'No explanation generated.',
        evidenceUsed: data.evidenceUsed || (data.evidence?.values ? data.evidence.values.map((v: any) => `${v.name}: ${v.value}`) : [
          `Order #${currentOrder.displayId} AOV: ₹${currentOrder.subtotal.toFixed(2)}`,
          `Current Net Contribution: ₹${currentOrder.economics.netContribution.toFixed(2)}`
        ]),
        suggestedNextAction: data.suggestedNextAction || 'Inspect unit economics waterfall'
      };
    } catch {
      // Deterministic client fallback if server endpoint is busy
      return {
        answer: `Deterministic Financial Trace: Order #${currentOrder.displayId} has AOV ₹${currentOrder.subtotal.toFixed(2)} with gross margin ₹${(currentOrder.subtotal - currentOrder.economics.productCost).toFixed(2)}. Unoptimized solitary transit (₹${currentOrder.economics.deliveryCost.toFixed(2)}) and blanket coupon (₹${currentOrder.economics.discountCost.toFixed(2)}) compress net contribution to ₹${currentOrder.economics.netContribution.toFixed(2)}. MarginOS evaluates 6 interventions, with candidate #1 capturing +₹${currentOrder.candidateInterventions[0]?.incrementalContribution.toFixed(2)} incremental contribution.`,
        evidenceUsed: [
          `Order #${currentOrder.displayId} AOV: ₹${currentOrder.subtotal.toFixed(2)}`,
          `Current Net Contribution: ₹${currentOrder.economics.netContribution.toFixed(2)}`,
          `Candidate #1 Incremental: +₹${currentOrder.candidateInterventions[0]?.incrementalContribution.toFixed(2)}`,
          `Objective: max E[Contribution] s.t. ETA <= 12m, Friction <= Low`
        ],
        suggestedNextAction: 'Inspect unit economics waterfall'
      };
    }
  };

  // Navigation Items
  const navTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3, badge: 'Modelled' },
    { id: 'order', label: 'Order Economics', icon: ShoppingBag, badge: currentOrder.displayId },
    { id: 'stores', label: 'Dark Stores', icon: Building2, badge: '6 Sample Pods' },
    { id: 'simulation', label: 'Simulation Lab', icon: Play, badge: '100K Sim' },
    { id: 'digital_twin', label: 'Digital Twin', icon: Sliders },
    { id: 'experiments', label: 'Experiments', icon: Beaker },
    { id: 'pitch', label: 'Pitch Mode', icon: Presentation, highlight: true }
  ];

  // Render Inner Content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <ExecutiveDashboard
            networkTotals={networkTotals}
            darkStores={darkStores}
            onNavigateToOrder={(id) => {
              setSelectedOrderId(id);
              setActiveTab('order');
            }}
            onNavigateToStore={(id) => {
              setSelectedStoreId(id);
              setActiveTab('stores');
            }}
            onNavigateToSimulation={() => setActiveTab('simulation')}
            onOpenCopilotWithPrompt={handleOpenCopilot}
          />
        );

      case 'order':
        return (
          <OrderEconomicsView
            order={currentOrder}
            allOrders={orders}
            onSelectOtherOrder={(id) => setSelectedOrderId(id)}
            assumptions={costAssumptions}
            onBack={() => setActiveTab('overview')}
            onOpenCopilotWithOrder={(orderId, prompt) => handleOpenCopilot(prompt)}
          />
        );

      case 'stores':
        return (
          <DarkStoreAnalytics
            darkStores={darkStores}
            selectedStoreId={selectedStoreId}
            onSelectStore={(id) => setSelectedStoreId(id)}
            onOpenCopilotWithStore={(name, prompt) => handleOpenCopilot(prompt)}
          />
        );

      case 'simulation':
        return <SimulationLab initialResult={simulationResult} />;

      case 'digital_twin':
        return <DigitalTwinView networkTotals={networkTotals} />;

      case 'experiments':
        return <ExperimentLabView />;

      case 'pitch':
        return (
          <PitchModeView
            onExitPitch={() => setActiveTab('overview')}
            onOpenOrder={(id) => {
              setSelectedOrderId(id);
              setActiveTab('order');
            }}
            onOpenSimulation={() => setActiveTab('simulation')}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#1c1917] flex flex-col font-sans selection:bg-[#fc8019]/20 selection:text-[#fc8019]">
      
      {/* CONTEXT TOP BAR (QUIET, CONTEXTUAL, NO GIANT BRANDING) */}
      <ContextTopBar
        currentTab={activeTab === 'pitch' ? 'Swiggy Executive Story' : activeTab.replace('_', ' ')}
        subTitle={
          activeTab === 'overview' ? 'Where are we losing money across the network? · Modelled 6-store extrapolation (200x)' :
          activeTab === 'order' ? `Why did we make or lose money on this order? · #${currentOrder.displayId} (${currentOrder.storeName})` :
          activeTab === 'stores' ? 'Which stores are losing money, and why? · 6 Sample Pods (Simulated)' :
          activeTab === 'simulation' ? 'What happens across 100,000 simulated orders? · Monte Carlo Engine' :
          activeTab === 'digital_twin' ? 'What happens if delivery costs or basket sizes change? · Sensitivity Model' :
          activeTab === 'experiments' ? 'Which profit interventions should we test in the real world? · Hypotheses' :
          'Executive Presentation · Unit Economics Strategy'
        }
        appMode={appMode}
        onModeChange={(m) => setAppMode(m)}
        onOpenAssumptions={() => setIsAssumptionsOpen(true)}
        viewportMode={viewportMode}
        onToggleViewport={() => setViewportMode(prev => prev === 'desktop' ? 'android' : 'desktop')}
        isSimulatedData={isSimulatedData}
      />

      {/* 9 DEMO SCENARIOS BAR (SECTION 22) */}
      <DemoScenariosBar
        onSelectScenario={handleSelectDemoScenario}
        activeScenario={activeScenarioId}
      />

      {/* VIEWPORT CONTROLLER: DESKTOP CONSOLE VS ANDROID HANDHELD */}
      {viewportMode === 'desktop' ? (
        
        /* DESKTOP ENTERPRISE OPERATIONS CONSOLE */
        <div className="flex-1 flex flex-col">
          
          {/* Main Horizontal Tab Navigation */}
          <nav aria-label="Main Navigation" className="border-b border-[#e7e5e4] bg-white px-4 sm:px-6">
            <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto scrollbar-thin">
              {navTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 py-3 px-3.5 border-b-2 font-medium text-xs whitespace-nowrap transition-colors ${
                      isActive
                        ? 'border-[#fc8019] text-[#1c1917] font-semibold'
                        : 'border-transparent text-[#78716c] hover:text-[#1c1917] hover:border-[#d6d3d1]'
                    } ${tab.highlight ? 'text-[#fc8019] font-bold' : ''}`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#fc8019]' : 'text-[#78716c]'}`} />
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                        isActive ? 'bg-[#fc8019]/10 text-[#fc8019]' : 'bg-[#f5f5f4] text-[#78716c]'
                      }`}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Primary View Area */}
          <main className="flex-1 pb-16">
            {renderTabContent()}
          </main>

        </div>

      ) : (

        /* ANDROID HANDHELD DEVICE VIEW (GOOGLE PIXEL 8 PRO JETPACK COMPOSE PRESENTATION) */
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-[#e7e5e4]">
          <div className="w-[392px] h-[830px] bg-black rounded-[48px] p-3 shadow-2xl relative border-4 border-[#292524] flex flex-col overflow-hidden">
            
            {/* Native Screen Bezel & Dynamic Island Camera Cutout */}
            <div className="w-full h-full bg-[#fafaf9] rounded-[36px] flex flex-col overflow-hidden relative">
              
              {/* Android Native Status Bar */}
              <div className="h-7 px-5 pt-1.5 flex items-center justify-between text-[11px] font-medium text-[#1c1917] bg-[#fafaf9] z-20 shrink-0 select-none">
                <span>9:41</span>
                <div className="w-3.5 h-3.5 bg-black rounded-full mx-auto" /> {/* Camera cutout */}
                <div className="flex items-center gap-1.5 text-xs text-[#1c1917]">
                  <Wifi className="w-3 h-3" />
                  <span className="text-[10px] font-mono">5G</span>
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Mobile Compact Top Strip */}
              <div className="px-4 py-2 border-b border-[#e7e5e4] flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#fc8019]" />
                  <span className="font-bold text-xs capitalize text-[#1c1917]">
                    {activeTab.replace('_', ' ')}
                  </span>
                </div>
                <button
                  onClick={() => setIsCopilotOpen(true)}
                  className="p-1 rounded bg-[#f5f5f4] text-[#fc8019] hover:bg-[#e7e5e4]"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Scrollable Handheld Screen Content */}
              <div className="flex-1 overflow-y-auto scrollbar-none pb-14 text-xs">
                {renderTabContent()}
              </div>

              {/* Material 3 Bottom Navigation Bar */}
              <div className="absolute bottom-0 inset-x-0 h-14 bg-white/95 backdrop-blur-sm border-t border-[#e7e5e4] flex items-center justify-around px-2 z-20">
                {navTabs.slice(0, 5).map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className="flex flex-col items-center justify-center flex-1 py-1"
                    >
                      <div className={`p-1 rounded-full ${isActive ? 'bg-[#fc8019]/15 text-[#fc8019]' : 'text-[#78716c]'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`text-[10px] mt-0.5 ${isActive ? 'font-bold text-[#fc8019]' : 'text-[#78716c]'}`}>
                        {tab.label.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Android Home Indicator Bar */}
              <div className="absolute bottom-1 inset-x-0 flex justify-center z-30 pointer-events-none">
                <div className="w-28 h-1 bg-[#1c1917]/40 rounded-full" />
              </div>

            </div>
          </div>
        </div>

      )}

      {/* FLOATING ACTION: COPILOT ANALYST TRIGGER (DESKTOP) */}
      {viewportMode === 'desktop' && (
        <button
          onClick={() => setIsCopilotOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#1c1917] text-white px-4 py-2.5 rounded-full shadow-lg hover:bg-[#292524] transition-all flex items-center gap-2 border border-[#44403c] text-xs font-semibold"
          title="Open Operational AI Copilot"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#fc8019]" />
          <span>Operational Analyst</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
        </button>
      )}

      {/* AI COPILOT SLIDE-OVER SHEET */}
      <AiCopilotSheet
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        onExecutePrompt={handleExecuteCopilotQuery}
        prefilledPrompt={copilotPrefillPrompt}
        orderContextId={currentOrder.displayId}
        storeContextName={currentOrder.storeName}
      />

      {/* COST ASSUMPTIONS MODAL */}
      <CostAssumptionsModal
        isOpen={isAssumptionsOpen}
        onClose={() => setIsAssumptionsOpen(false)}
        assumptions={costAssumptions}
        onSaveAssumptions={handleSaveAssumptions}
        onResetDefaults={handleResetAssumptions}
      />

      {/* ASSISTED CHECKOUT SAFE HUMAN CONFIRMATION MODAL (SECTION 5) */}
      <AssistedCheckoutModal
        isOpen={isAssistedCheckoutOpen}
        onClose={() => setIsAssistedCheckoutOpen(false)}
        order={currentOrder}
        onConfirmOrder={async () => {
          await new Promise(r => setTimeout(r, 600));
        }}
      />

      {/* MINIMAL FOOTER WITH METHODOLOGY DISCLAIMER */}
      <footer className="border-t border-[#e7e5e4] bg-[#fafaf9] py-3 px-4 text-center text-[11px] text-[#78716c]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong>MarginOS</strong> · AI-Powered Quick-Commerce Profit Optimization Engine for Swiggy Instamart Research Prototype
          </div>
          <div>
            Prototype Contribution Proxy — not Swiggy's internal accounting definition.
          </div>
        </div>
      </footer>

    </div>
  );
}
