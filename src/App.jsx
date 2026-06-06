import { useStore } from './store/useStore';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { TransactionsPage } from './pages/TransactionsPage';
import { StatsPage } from './pages/StatsPage';
import { AccountsPage } from './pages/AccountsPage';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  const { theme, activeTab } = useStore();

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
      <div className="min-h-screen bg-background text-foreground">
        <BottomNav />

        <Header />

        <main className="lg:ml-64 px-4 md:px-6 lg:px-8 py-6 pb-24 md:pb-6">
          {activeTab === 'transactions' && <TransactionsPage />}
          {activeTab === 'stats' && <StatsPage />}
          {activeTab === 'accounts' && <AccountsPage />}
          {activeTab === 'settings' && <SettingsPage />}
        </main>
      </div>
    </div>
  );
}

export default App;