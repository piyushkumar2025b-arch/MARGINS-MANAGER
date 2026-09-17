import React, { useState } from 'react';
import { Beaker, CheckCircle2, AlertCircle, ArrowUpRight, Plus, Check } from 'lucide-react';
import { ExperimentHypothesis } from '../types';
import { BENCHMARK_EXPERIMENTS } from '../engine/experiments';

export const ExperimentLabView: React.FC = () => {
  const [experiments, setExperiments] = useState<ExperimentHypothesis[]>(BENCHMARK_EXPERIMENTS);
  const [selectedExpId, setSelectedExpId] = useState<string>(BENCHMARK_EXPERIMENTS[0].id);

  const selectedExp = experiments.find(e => e.id === selectedExpId) || experiments[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e7e5e4] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-semibold text-[#fc8019]">Statistical Validation</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#f5f5f4] text-[#57534e] border border-[#e7e5e4] font-mono font-semibold">
              BENCHMARK SIMULATION DATA
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1c1917]">
            How do we know these interventions actually work?
          </h2>
          <p className="text-xs text-[#78716c] mt-0.5">
            Calibrated A/B benchmark hypotheses evaluated against baseline operating strategies. Live telemetry adapter connection required for continuous field experiments.
          </p>
        </div>

        <div className="text-xs font-mono text-[#78716c]">
          4 Active Hypotheses · Sample &gt; 195,000 orders
        </div>
      </div>

      {/* EXPERIMENTS SPLIT VIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left List */}
        <div className="lg:col-span-5 space-y-2 border border-[#e7e5e4] rounded bg-white p-2 divide-y divide-[#e7e5e4]">
          {experiments.map((exp) => {
            const isSelected = exp.id === selectedExpId;
            return (
              <div
                key={exp.id}
                onClick={() => setSelectedExpId(exp.id)}
                className={`p-3 rounded cursor-pointer transition-colors ${
                  isSelected ? 'bg-[#fafaf9] border border-[#fc8019]/40' : 'hover:bg-[#fafaf9]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#78716c]">
                    {(exp.sampleSize / 1000).toFixed(0)}K sample
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                    exp.recommendationDecision === 'Deploy' ? 'bg-[#16a34a]/10 text-[#16a34a]' : 'bg-[#d97706]/10 text-[#d97706]'
                  }`}>
                    {exp.recommendationDecision}
                  </span>
                </div>
                
                <h4 className="text-xs font-bold text-[#1c1917] mt-1">{exp.title}</h4>
                <div className="flex items-center justify-between mt-2 text-xs">
                  <span className="text-[#78716c] text-[11px]">{exp.targetMetric}</span>
                  <span className="font-mono font-bold text-[#16a34a]">+₹{exp.liftEstimate.toFixed(2)} lift</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Details */}
        <div className="lg:col-span-7 space-y-6 border border-[#e7e5e4] p-6 rounded bg-white">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#fc8019] uppercase tracking-wider">Hypothesis Spec</span>
              <span className="text-xs font-mono text-[#78716c]">p-value = {selectedExp.pValue}</span>
            </div>
            <h3 className="text-lg font-bold text-[#1c1917]">{selectedExp.title}</h3>
            <p className="text-xs text-[#57534e] leading-relaxed">{selectedExp.description}</p>
          </div>

          {/* Strategy Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-[#fafaf9] rounded border border-[#e7e5e4] text-xs">
            <div>
              <span className="text-[10px] font-semibold text-[#78716c] uppercase block">Control / Baseline</span>
              <p className="text-[#1c1917] font-medium mt-0.5">{selectedExp.baselineStrategy}</p>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-[#fc8019] uppercase block">MarginOS Treatment</span>
              <p className="text-[#1c1917] font-medium mt-0.5">{selectedExp.treatmentStrategy}</p>
            </div>
          </div>

          {/* Statistical Outcomes */}
          <div className="grid grid-cols-3 gap-4 border-b border-[#e7e5e4] pb-4">
            <div>
              <span className="text-xs text-[#78716c] block">Estimated Lift</span>
              <span className="text-2xl font-bold font-mono text-[#16a34a]">
                +₹{selectedExp.liftEstimate.toFixed(2)}
              </span>
              <span className="text-[11px] text-[#78716c] block">per order</span>
            </div>
            <div>
              <span className="text-xs text-[#78716c] block">Simulation Uncertainty Range</span>
              <span className="text-sm font-bold font-mono text-[#1c1917] mt-1 block">
                [₹{selectedExp.confidenceInterval[0].toFixed(2)}, ₹{selectedExp.confidenceInterval[1].toFixed(2)}]
              </span>
              <span className="text-[11px] text-[#78716c] block">Modelled 95% interval</span>
            </div>
            <div>
              <span className="text-xs text-[#78716c] block">Sample Size</span>
              <span className="text-sm font-bold font-mono text-[#1c1917] mt-1 block">
                {selectedExp.sampleSize.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#78716c] block">orders tested</span>
            </div>
          </div>

          {/* Risk Scenarios */}
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-[#f5f5f4] rounded space-y-1">
              <span className="font-semibold text-[#dc2626] block text-[11px] uppercase">
                Observed Downside Risk Scenario
              </span>
              <p className="text-[#44403c]">{selectedExp.downsideRiskScenario}</p>
            </div>

            <div className="p-3 bg-[#f5f5f4] rounded space-y-1">
              <span className="font-semibold text-[#16a34a] block text-[11px] uppercase">
                Upside Potential at Scale
              </span>
              <p className="text-[#44403c]">{selectedExp.upsidePotentialScenario}</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
