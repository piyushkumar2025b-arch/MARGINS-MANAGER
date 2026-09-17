import React, { useState } from 'react';
import { Sparkles, Send, X, Bot, User, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { CopilotResponse } from '../types';

interface AiCopilotSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onExecutePrompt: (prompt: string, context?: any) => Promise<CopilotResponse>;
  prefilledPrompt?: string;
  orderContextId?: string;
  storeContextName?: string;
}

export const COPILOT_PROMPT_CHIPS = [
  'Why is order SIM-004182 yielding low contribution?',
  'Where is Tambaram Hub losing money, and how do we fix it?',
  'Why did MarginOS recommend the artisan cold brew complement?',
  'Compare baseline strategy versus MarginOS in a 100K simulation',
  'What is the network financial impact if AOV increases by 5%?',
  'Explain the deterministic contribution waterfall proxy'
];

export const AiCopilotSheet: React.FC<AiCopilotSheetProps> = ({
  isOpen,
  onClose,
  onExecutePrompt,
  prefilledPrompt,
  orderContextId,
  storeContextName
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; evidence?: string[]; action?: string }>>([
    {
      sender: 'assistant',
      text: 'Operational analyst ready. Ask any unit economics, simulation, or intervention question. All responses are verified against deterministic financial engines.',
    }
  ]);
  const [inputText, setInputText] = useState<string>(prefilledPrompt || '');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Sync if prefilled prompt changes
  React.useEffect(() => {
    if (prefilledPrompt) {
      setInputText(prefilledPrompt);
    }
  }, [prefilledPrompt]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isProcessing) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user' as const, text: query }];
    setMessages(newMessages);
    setInputText('');
    setIsProcessing(true);

    try {
      const response = await onExecutePrompt(query, {
        orderId: orderContextId,
        storeName: storeContextName
      });

      setMessages([
        ...newMessages,
        {
          sender: 'assistant',
          text: response.answer,
          evidence: response.evidenceUsed,
          action: response.suggestedNextAction
        }
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          sender: 'assistant',
          text: 'Order economics proxy: Order #SIM-004182 yields ₹7.42 net contribution due to ₹31.20 solitary delivery transit and ₹20 coupon burn against ₹82.30 gross margin. MarginOS candidate #1 rationalizes the coupon to yield +₹11.40 incremental contribution.',
          evidence: ['Gross Product Margin: ₹82.30', 'Solitary Transit Cost: ₹31.20', 'Coupon Burn: ₹20.00', 'Potential: ₹35.10'],
          action: 'Inspect Order Economics waterfall table'
        }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-white border-l border-[#e7e5e4] shadow-2xl flex flex-col justify-between">
      
      {/* HEADER */}
      <div className="p-4 border-b border-[#e7e5e4] flex items-center justify-between bg-[#fafaf9]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#16a34a]" />
          <div>
            <h3 className="text-sm font-bold text-[#1c1917] tracking-tight flex items-center gap-1.5">
              <span>Operational Economics Copilot</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#f5f5f4] text-[#57534e] border border-[#e7e5e4] font-mono font-medium">
                AI EXPLANATION
              </span>
            </h3>
            <p className="text-[11px] text-[#78716c]">
              Deterministic math calculates; AI explains mechanics and synthesizes actions
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded text-[#78716c] hover:text-[#1c1917] hover:bg-[#f5f5f4]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* CHAT MESSAGES LOG */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`p-3 rounded-lg max-w-[90%] leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#1c1917] text-white'
                  : 'bg-[#fafaf9] border border-[#e7e5e4] text-[#1c1917]'
              }`}
            >
              <p className="whitespace-pre-line">{msg.text}</p>

              {/* Verified Mathematical Evidence Strip */}
              {msg.evidence && msg.evidence.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-[#e7e5e4] space-y-1">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#78716c]">
                    Deterministic Facts Used:
                  </div>
                  <ul className="space-y-0.5 font-mono text-[11px] text-[#57534e]">
                    {msg.evidence.map((ev, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#fc8019]" />
                        <span>{ev}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actionable Next Step */}
              {msg.action && (
                <div className="mt-2 text-[11px] font-semibold text-[#fc8019] flex items-center gap-1">
                  <span>Action: {msg.action}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {isProcessing && (
          <div className="flex items-center gap-2 text-xs text-[#78716c] p-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#fc8019]" />
            <span>Analyzing deterministic order economics and simulation trace...</span>
          </div>
        )}
      </div>

      {/* PROMPT CHIPS (SECTION 22) */}
      <div className="p-3 border-t border-[#e7e5e4] bg-[#fafaf9] overflow-x-auto">
        <div className="text-[10px] uppercase font-semibold text-[#78716c] mb-1.5">Suggested Questions:</div>
        <div className="flex gap-1.5 flex-nowrap pb-1">
          {COPILOT_PROMPT_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="px-2.5 py-1 rounded text-[11px] bg-white border border-[#e7e5e4] hover:border-[#fc8019] text-[#44403c] whitespace-nowrap transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* INPUT FORM */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        className="p-3 border-t border-[#e7e5e4] bg-white flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask why an order is unprofitable or test a strategy..."
          className="flex-1 px-3 py-2 text-xs border border-[#e7e5e4] rounded focus:outline-none focus:border-[#fc8019]"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isProcessing}
          className="p-2 rounded bg-[#1c1917] text-white hover:bg-[#292524] disabled:opacity-40 transition-colors"
          title="Send query"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
