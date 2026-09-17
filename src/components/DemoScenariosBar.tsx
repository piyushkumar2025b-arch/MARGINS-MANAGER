import React from 'react';
import { Play } from 'lucide-react';

interface DemoScenariosBarProps {
  onSelectScenario: (scenarioIndex: number) => void;
  activeScenario?: number;
}

export const DEMO_SCENARIOS = [
  { id: 1, title: 'Unprofitable Order to Profitable', target: 'order', hint: 'Focus on #SIM-004182 with +₹27.68 potential' },
  { id: 2, title: 'Optimize a Dark Store', target: 'store', hint: 'Tambaram Hub unit economics & leakage' },
  { id: 3, title: 'Reduce Discount Leakage', target: 'order', hint: 'Over-discounting elasticity intervention' },
  { id: 4, title: 'Increase Basket Economics', target: 'order', hint: 'High-affinity complementary add-on' },
  { id: 5, title: 'Optimize Delivery Economics', target: 'order', hint: '450m radius safe batching simulation' },
  { id: 6, title: 'Run 100,000 Order Simulation', target: 'simulation', hint: 'Vectorized Monte Carlo distribution' },
  { id: 7, title: 'Compare Baseline vs MarginOS', target: 'simulation', hint: '₹4.20 vs ₹8.70 empirical comparison' },
  { id: 8, title: 'Analyze Live Instamart Cart', target: 'cart', hint: 'Instamart cart structure & safe checkout' },
  { id: 9, title: 'Explain the AI Decision', target: 'copilot', hint: 'Deterministic evidence trace' }
];

export const DemoScenariosBar: React.FC<DemoScenariosBarProps> = ({
  onSelectScenario,
  activeScenario
}) => {
  return (
    <div className="bg-[#f5f5f4] border-b border-[#e7e5e4] px-4 py-2 overflow-x-auto scrollbar-thin">
      <div className="flex items-center gap-1.5 min-w-max max-w-7xl mx-auto">
        <span className="text-[11px] font-semibold tracking-wider uppercase text-[#78716c] mr-2 flex items-center gap-1">
          <Play className="w-3 h-3 text-[#fc8019] fill-[#fc8019]" />
          Demo Walkthroughs:
        </span>
        {DEMO_SCENARIOS.map((scenario) => {
          const isActive = activeScenario === scenario.id;
          return (
            <button
              key={scenario.id}
              onClick={() => onSelectScenario(scenario.id)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all whitespace-nowrap border ${
                isActive
                  ? 'bg-[#1c1917] text-white border-[#1c1917]'
                  : 'bg-white text-[#44403c] border-[#e7e5e4] hover:border-[#a8a29e] hover:bg-[#fafaf9]'
              }`}
              title={scenario.hint}
            >
              <span className="text-[10px] text-[#a8a29e] mr-1">D{scenario.id}</span>
              {scenario.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};
