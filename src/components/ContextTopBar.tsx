import React from 'react';
import { Settings2, Smartphone, Monitor, ShieldCheck, Database, RefreshCw } from 'lucide-react';
import { ApplicationMode } from '../types';

interface ContextTopBarProps {
  currentTab: string;
  subTitle?: string;
  appMode: ApplicationMode;
  onModeChange: (mode: ApplicationMode) => void;
  onOpenAssumptions: () => void;
  viewportMode: 'desktop' | 'android';
  onToggleViewport: () => void;
  isSimulatedData: boolean;
}

export const ContextTopBar: React.FC<ContextTopBarProps> = ({
  currentTab,
  subTitle = 'Today · 1,200 stores · National Pod Network',
  appMode,
  onModeChange,
  onOpenAssumptions,
  viewportMode,
  onToggleViewport,
  isSimulatedData
}) => {
  return (
    <header className="border-b border-[#e7e5e4] bg-[#fafaf9]/90 backdrop-blur-sm sticky top-0 z-30 px-4 sm:px-6 py-2.5 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 max-w-7xl mx-auto">
        
        {/* Contextual Title & Subtitle (NO giant branding header) */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#fc8019]" aria-hidden="true" />
            <h1 className="text-base sm:text-lg font-semibold tracking-tight text-[#1c1917] capitalize">
              {currentTab}
            </h1>
          </div>
          <span className="text-[#a8a29e] hidden sm:inline" aria-hidden="true">/</span>
          <span className="text-xs sm:text-sm text-[#78716c] font-normal truncate">
            {subTitle}
          </span>
        </div>

        {/* Operational Context Controls */}
        <div className="flex items-center gap-2 text-xs flex-wrap">
          
          {/* Data Trust Badge */}
          <div 
            title="Internal economics proxy for research & pitch demo"
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#f5f5f4] text-[#57534e] border border-[#e7e5e4] font-mono text-[11px]"
          >
            <Database className="w-3 h-3 text-[#78716c]" />
            <span>{isSimulatedData ? 'SIMULATED DATA' : 'LIVE READ-ONLY'}</span>
          </div>

          {/* Mode Switcher */}
          <div className="inline-flex items-center rounded border border-[#e7e5e4] bg-[#f5f5f4] p-0.5">
            <button
              onClick={() => onModeChange('simulation')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                appMode === 'simulation'
                  ? 'bg-white text-[#1c1917] shadow-xs'
                  : 'text-[#78716c] hover:text-[#1c1917]'
              }`}
            >
              Simulation
            </button>
            <button
              onClick={() => onModeChange('live_read_only')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                appMode === 'live_read_only'
                  ? 'bg-white text-[#1c1917] shadow-xs'
                  : 'text-[#78716c] hover:text-[#1c1917]'
              }`}
            >
              Live Read-Only
            </button>
            <button
              onClick={() => onModeChange('assisted_live')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                appMode === 'assisted_live'
                  ? 'bg-white text-[#fc8019] shadow-xs'
                  : 'text-[#78716c] hover:text-[#1c1917]'
              }`}
            >
              Assisted Live
            </button>
          </div>

          {/* Cost Assumptions Trigger */}
          <button
            onClick={onOpenAssumptions}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-[#e7e5e4] bg-white hover:bg-[#f5f5f4] text-[#44403c] transition-colors"
            title="Inspect & edit deterministic cost assumptions"
          >
            <Settings2 className="w-3.5 h-3.5 text-[#78716c]" />
            <span className="hidden md:inline">Assumptions</span>
          </button>

          {/* Device Frame Viewport Toggle */}
          <button
            onClick={onToggleViewport}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded border transition-colors ${
              viewportMode === 'android'
                ? 'bg-[#1c1917] text-white border-[#1c1917]'
                : 'bg-white text-[#44403c] border-[#e7e5e4] hover:bg-[#f5f5f4]'
            }`}
            title="Toggle between Desktop Console and Android Handheld Frame"
          >
            {viewportMode === 'android' ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-[#fc8019]" />
                <span className="hidden md:inline">Desktop View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-[#78716c]" />
                <span className="hidden md:inline">Android Handheld</span>
              </>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
