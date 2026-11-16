import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { faqData } from './helpData';

export default function FaqAccordion() {
  const [openId, setOpenId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-4 flex-1">
      {faqData.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="bg-[var(--surface)] border border-[var(--border)] rounded-[22px] p-5 md:p-6 transition-all duration-300 shadow-sm hover:border-[var(--primary)]/30"
          >
            <button
              onClick={() => toggleAccordion(item.id)}
              className="w-full flex items-center justify-between text-right gap-4 focus:outline-none group"
            >
              <span
                className={`text-base md:text-lg font-bold transition-colors duration-200 ${
                  isOpen ? 'text-[var(--primary)]' : 'text-[var(--text)] group-hover:text-[var(--primary)]'
                }`}
              >
                {item.question}
              </span>
              
              <span
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 ${
                  isOpen ? 'text-[var(--primary)] bg-[var(--soft-teal)]' : 'text-[var(--text)]'
                }`}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </span>
            </button>

            {isOpen && (
              <div className="mt-4 pt-4 border-t border-[var(--border)] text-sm md:text-base text-[var(--muted)] leading-relaxed animate-fadeIn">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}