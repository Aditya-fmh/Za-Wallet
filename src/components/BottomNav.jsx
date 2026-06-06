import { useStore } from '../store/useStore';
import { ArrowLeftRight, BarChart3, CreditCard, Settings, Wallet } from 'lucide-react';

const tabs = [
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'stats', label: 'Statistics', icon: BarChart3 },
  { id: 'accounts', label: 'Accounts', icon: Wallet },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function BottomNav() {
  const { activeTab, setActiveTab } = useStore();

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border flex-col p-4 z-50">
        <div className="flex items-center gap-3 px-4 py-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <span className="text-xl font-bold">Za Wallet</span>
        </div>

        <div className="flex-1 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-accent text-white shadow-lg shadow-accent/25'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="pt-4 border-t border-border">
          <div className="px-4 py-3 text-sm text-muted-foreground">
            <p>Version 1.0.0</p>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border pb-safe">
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                  isActive
                    ? 'text-accent'
                    : 'text-muted-foreground'
                }`}
              >
                <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-accent/10' : ''}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}