import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, TrendingUp, Sparkles, Building2, ShoppingBag, ShieldCheck, Database, ArrowRight } from 'lucide-react';

interface PitchModeViewProps {
  onExitPitch: () => void;
  onOpenOrder: (orderId: string) => void;
  onOpenSimulation: () => void;
}

export const PitchModeView: React.FC<PitchModeViewProps> = ({
  onExitPitch,
  onOpenOrder,
  onOpenSimulation
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slides = [
    {
      step: 1,
      tag: 'Executive Proposition',
      title: 'The Quick-Commerce Unit Economics Challenge',
      content: (
        <div className="space-y-4 text-sm text-[#44403c] leading-relaxed">
          <p className="text-base text-[#1c1917] font-semibold">
            "Swiggy already has India's best-in-class commerce engine and fulfillment network. MarginOS adds a unified profit decision layer."
          </p>
          <p>
            Quick-commerce has mastered sub-10-minute consumer convenience. However, at scale, margins leak across disconnected local decisions: broad cart coupons given to inelastic buyers, solitary rider dispatches when adjacent pods could batch, and low-margin basket compositions.
          </p>
          <div className="p-4 bg-[#f5f5f4] rounded border border-[#e7e5e4] font-mono text-xs text-[#1c1917] space-y-1">
            <div className="font-sans font-bold text-[#78716c] uppercase text-[10px]">The Operational Question:</div>
            <div>"For this order/store/network state, what action is expected to create the highest incremental contribution while preserving consumer experience and operational SLA constraints?"</div>
          </div>
        </div>
      )
    },
    {
      step: 2,
      tag: 'Unit Economics',
      title: 'Every Order Contains a Profit Equation',
      content: (
        <div className="space-y-4 text-sm text-[#44403c]">
          <p>
            Consider a typical simulated evening basket: <strong>Order #SIM-004182</strong> in Indiranagar.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-white border border-[#e7e5e4] rounded text-center">
            <div>
              <span className="text-xs text-[#78716c] block">Basket Value</span>
              <span className="text-xl font-bold font-mono text-[#1c1917]">₹624.00</span>
            </div>
            <div>
              <span className="text-xs text-[#78716c] block">Current Contribution</span>
              <span className="text-xl font-bold font-mono text-[#d97706]">₹7.42</span>
            </div>
            <div>
              <span className="text-xs text-[#78716c] block">MarginOS Potential</span>
              <span className="text-xl font-bold font-mono text-[#16a34a]">₹35.10</span>
            </div>
            <div>
              <span className="text-xs text-[#78716c] block">Captured Delta</span>
              <span className="text-xl font-bold font-mono text-[#16a34a]">+₹27.68</span>
            </div>
          </div>
          <p className="text-xs text-[#78716c]">
            Despite strong gross product margins (+₹82.30), solitary transit (₹31.20) and broad discounting (₹20.00) compress net contribution to barely 1.2% of AOV.
          </p>
        </div>
      )
    },
    {
      step: 3,
      tag: 'Optimization Logic',
      title: 'MarginOS Multi-Objective Decision Engine',
      content: (
        <div className="space-y-4 text-sm text-[#44403c]">
          <p>
            Instead of static rules, MarginOS generates and evaluates 6 deterministic candidate interventions:
          </p>
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-white border border-[#e7e5e4] rounded flex justify-between items-center">
              <div>
                <span className="font-bold text-[#1c1917]">1. Rationalize Inelastic Cart Coupon</span>
                <span className="text-[#78716c] block">Save ₹11.40 discount burn with &lt;1.5% conversion drop risk</span>
              </div>
              <span className="font-mono font-bold text-[#16a34a]">+₹11.40</span>
            </div>
            <div className="p-3 bg-white border border-[#e7e5e4] rounded flex justify-between items-center">
              <div>
                <span className="font-bold text-[#1c1917]">2. Add Complementary SKU (Artisan Cold Brew ₹76)</span>
                <span className="text-[#78716c] block">P(Add)=44% with zero warehouse picker disruption</span>
              </div>
              <span className="font-mono font-bold text-[#16a34a]">+₹8.90</span>
            </div>
            <div className="p-3 bg-white border border-[#e7e5e4] rounded flex justify-between items-center">
              <div>
                <span className="font-bold text-[#1c1917]">3. Co-Located Dispatch Batching (450m radius)</span>
                <span className="text-[#78716c] block">Reduces delivery dispatch cost with only +2.4m ETA</span>
              </div>
              <span className="font-mono font-bold text-[#16a34a]">+₹6.80</span>
            </div>
          </div>
        </div>
      )
    },
    {
      step: 4,
      tag: 'Mathematical Rigor',
      title: 'Deterministic Mathematics, Not Hallucinated AI',
      content: (
        <div className="space-y-4 text-sm text-[#44403c]">
          <p>
            Crucial architecture principle: The LLM is <strong>never</strong> the source of numerical truth. All financial calculations originate in deterministic mathematical engines.
          </p>
          <div className="p-4 bg-[#f5f5f4] rounded border border-[#e7e5e4] font-mono text-xs space-y-2">
            <div className="text-[#78716c] font-sans font-semibold uppercase text-[10px]">Deterministic Optimization Objective:</div>
            <div className="text-[#1c1917]">max E[Contribution(Order, Action)]</div>
            <div className="text-[#57534e]">subject to: ETA &le; 12.0m, P(Conversion) &ge; 90%, CustomerFriction &le; Low</div>
          </div>
          <p className="text-xs text-[#78716c]">
            The AI Copilot acts purely as an executive communicator, explaining evidence-backed mathematical decisions without performing unverified arithmetic.
          </p>
        </div>
      )
    },
    {
      step: 5,
      tag: 'Simulation Proof',
      title: '100,000 Order Monte Carlo Validation',
      content: (
        <div className="space-y-4 text-sm text-[#44403c]">
          <p>
            Across 100,000 randomized simulated orders with realistic log-normal baskets and spatial delivery models:
          </p>
          <div className="grid grid-cols-3 gap-4 p-4 bg-white border border-[#e7e5e4] rounded text-center">
            <div>
              <span className="text-xs text-[#78716c] block">Baseline Strategy</span>
              <span className="text-2xl font-bold font-mono text-[#78716c]">₹4.20</span>
              <span className="text-[11px] text-[#78716c]">/ order</span>
            </div>
            <div>
              <span className="text-xs text-[#fc8019] block font-bold">MarginOS</span>
              <span className="text-2xl font-bold font-mono text-[#16a34a]">₹8.70</span>
              <span className="text-[11px] text-[#16a34a]">/ order</span>
            </div>
            <div>
              <span className="text-xs text-[#1c1917] block font-bold">Incremental Lift</span>
              <span className="text-2xl font-bold font-mono text-[#16a34a]">+₹4.50</span>
              <span className="text-[11px] text-[#16a34a] font-semibold">+107% lift</span>
            </div>
          </div>
          <p className="text-xs text-[#78716c]">
            95% Confidence Interval: [+₹4.38, +₹4.62] per order with negligible 0.3% impact on 10-minute SLA compliance.
          </p>
        </div>
      )
    },
    {
      step: 6,
      tag: 'Store Level',
      title: 'Dark Store Operational Visibility',
      content: (
        <div className="space-y-4 text-sm text-[#44403c]">
          <p>
            Pod managers receive actionable, store-level profit leakage diagnostics rather than abstract KPIs.
          </p>
          <div className="p-4 bg-white border border-[#e7e5e4] rounded space-y-2 text-xs">
            <div className="font-bold text-[#1c1917]">Tambaram Pod (Chennai) Analysis:</div>
            <div className="flex justify-between text-[#57534e]">
              <span>Discount Leakage on Standard Baskets:</span>
              <span className="font-mono text-[#dc2626]">₹11.4K / day</span>
            </div>
            <div className="flex justify-between text-[#57534e]">
              <span>Solitary Long-Transit Dispatches (&gt;3.5km):</span>
              <span className="font-mono text-[#dc2626]">₹14.2K / day</span>
            </div>
            <div className="pt-2 border-t border-[#e7e5e4] flex justify-between font-bold text-[#16a34a]">
              <span>Total Recoverable Opportunity:</span>
              <span className="font-mono">+₹18.2K / day</span>
            </div>
          </div>
        </div>
      )
    },
    {
      step: 7,
      tag: 'Network Impact',
      title: 'Network-Level Opportunity: ₹3.84 Cr / Day',
      content: (
        <div className="space-y-4 text-sm text-[#44403c]">
          <p>
            Across 1,200 virtual dark stores handling ~68 Lakh orders daily, a conservative +₹5.40 contribution lift per order compounds into substantial enterprise cash flow:
          </p>
          <div className="p-5 bg-white border border-[#e7e5e4] rounded text-center space-y-2">
            <span className="text-xs uppercase font-semibold text-[#78716c]">Annualized Theoretical Value</span>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#1c1917] font-mono">
              ₹1,402 Crores
            </div>
            <p className="text-xs text-[#78716c]">
              47% from discount rationalization, 28% from basket expansion, 16% from delivery routing, 9% from inventory shrinkage mitigation.
            </p>
          </div>
        </div>
      )
    },
    {
      step: 8,
      tag: 'Integration',
      title: 'Live Swiggy MCP Compatibility',
      content: (
        <div className="space-y-4 text-sm text-[#44403c]">
          <p>
            MarginOS is designed with an extensible <code>SwiggyCommerceProvider</code> interface:
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white border border-[#e7e5e4] rounded">
              <span className="font-bold text-[#1c1917] block">Simulation Mode (Active)</span>
              <span className="text-[#78716c]">Offline-first reproducible synthetic catalog with zero external dependencies.</span>
            </div>
            <div className="p-3 bg-white border border-[#e7e5e4] rounded">
              <span className="font-bold text-[#1c1917] block">Swiggy MCP Live Mode</span>
              <span className="text-[#78716c]">Real-time read-only address, cart, order history, and assisted checkout staging.</span>
            </div>
          </div>
          <p className="text-xs text-[#78716c]">
            Security guarantee: No OAuth secrets or access tokens inside client APK; assisted checkout requires explicit human confirmation immediately before order dispatch.
          </p>
        </div>
      )
    },
    {
      step: 9,
      tag: 'Architecture',
      title: 'Unified Decision Layer Architecture',
      content: (
        <div className="space-y-3 text-sm text-[#44403c]">
          <div className="p-4 bg-[#f5f5f4] rounded border border-[#e7e5e4] font-mono text-xs space-y-2">
            <div className="flex items-center gap-2 text-[#fc8019] font-bold">
              <span>PRESENTATION</span>
              <span>→ Clean Jetpack Compose / Responsive Enterprise Console</span>
            </div>
            <div className="flex items-center gap-2 text-[#3b82f6] font-bold">
              <span>ORCHESTRATION</span>
              <span>→ AI Copilot & Natural Humanized Actions</span>
            </div>
            <div className="flex items-center gap-2 text-[#10b981] font-bold">
              <span>DECISION ENGINE</span>
              <span>→ Multi-Objective Optimization & Monte Carlo Simulator</span>
            </div>
            <div className="flex items-center gap-2 text-[#8b5cf6] font-bold">
              <span>DATA LAYER</span>
              <span>→ Swiggy MCP Adapter + Deterministic Financial Proxy</span>
            </div>
          </div>
          <p className="text-xs text-[#78716c]">
            Integrates without replacing existing commerce pipelines — acts purely as an advisory intelligence overlay.
          </p>
        </div>
      )
    },
    {
      step: 10,
      tag: 'Conclusion',
      title: 'Executive Summary',
      content: (
        <div className="space-y-4 text-sm text-[#44403c]">
          <div className="p-4 bg-white border border-[#16a34a]/30 rounded space-y-2">
            <div className="font-bold text-base text-[#1c1917]">Three Core Takeaways for Swiggy Leadership:</div>
            <ul className="space-y-1.5 text-xs text-[#57534e] list-disc list-inside">
              <li><strong>Contribution First:</strong> Optimizes directly for net rupees per order, not just raw GMV or clicks.</li>
              <li><strong>Zero Service Degradation:</strong> Strict constraints safeguard 10-minute SLA and consumer satisfaction.</li>
              <li><strong>Deterministic Reliability:</strong> Every number is mathematically grounded and auditable by finance and operations.</li>
            </ul>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={onExitPitch}
              className="px-4 py-2 rounded bg-[#1c1917] text-white font-semibold text-xs hover:bg-[#292524] transition-colors"
            >
              Explore Live Operations Console
            </button>
            <button
              onClick={onOpenSimulation}
              className="px-4 py-2 rounded border border-[#e7e5e4] bg-white text-[#1c1917] font-semibold text-xs hover:bg-[#f5f5f4] transition-colors"
            >
              Run 100K Simulation
            </button>
          </div>
        </div>
      )
    }
  ];

  const slide = slides[currentSlide];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* PITCH NAVIGATION TOP */}
      <div className="flex items-center justify-between border-b border-[#e7e5e4] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#fc8019] uppercase tracking-wider">
            Swiggy Executive Pitch
          </span>
          <span className="text-xs text-[#78716c]">
            Slide {currentSlide + 1} of {slides.length}
          </span>
        </div>

        <button
          onClick={onExitPitch}
          className="text-xs text-[#78716c] hover:text-[#1c1917] font-medium"
        >
          Exit Pitch Mode
        </button>
      </div>

      {/* ACTIVE SLIDE CONTAINER (CALM, CINEMATIC, NO VIBE CLUTTER) */}
      <div className="p-8 bg-white border border-[#e7e5e4] rounded min-h-[380px] flex flex-col justify-between space-y-6">
        <div className="space-y-3">
          <span className="text-xs uppercase font-semibold text-[#78716c] tracking-wider font-mono">
            {slide.tag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1c1917] tracking-tight">
            {slide.title}
          </h2>
          <div className="pt-2">
            {slide.content}
          </div>
        </div>

        {/* BOTTOM STEP CONTROLS */}
        <div className="flex items-center justify-between border-t border-[#e7e5e4] pt-4">
          <button
            disabled={currentSlide === 0}
            onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#57534e] hover:text-[#1c1917] disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === currentSlide ? 'bg-[#fc8019] w-4' : 'bg-[#e7e5e4]'
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            disabled={currentSlide === slides.length - 1}
            onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#1c1917] hover:text-[#fc8019] disabled:opacity-30"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
