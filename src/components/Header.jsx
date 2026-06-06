import { useStore } from '../store/useStore';
import { Sun, Moon, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { format, addMonths, subMonths } from 'date-fns';
import { useState } from 'react';

export function Header() {
  const { theme, toggleTheme, currentMonth, setActiveTab } = useStore();

  const handlePrevMonth = () => {
    const date = new Date(currentMonth + '-01');
    const newMonth = format(subMonths(date, 1), 'yyyy-MM');
    useStore.setState({ currentMonth: newMonth });
  };

  const handleNextMonth = () => {
    const date = new Date(currentMonth + '-01');
    const newMonth = format(addMonths(date, 1), 'yyyy-MM');
    useStore.setState({ currentMonth: newMonth });
  };

  const displayMonth = format(new Date(currentMonth + '-01'), 'MMMM yyyy');

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border px-4 py-3 lg:py-4">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-lg shadow-accent/25">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">Za Wallet</span>
        </div>

        {/* Desktop spacer */}
        <div className="hidden lg:block" />

        <div className="flex items-center gap-1">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-xl hover:bg-secondary transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-semibold min-w-[140px] text-center px-3 py-1.5 rounded-lg bg-secondary/50">
            {displayMonth}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-xl hover:bg-secondary transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-border mx-2" />

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-secondary/50 hover:bg-secondary transition-all hover:scale-105"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}