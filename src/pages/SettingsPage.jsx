import { useState } from 'react';
import { useStore } from '../store/useStore';
import {
  Sun,
  Moon,
  Globe,
  Bell,
  Download,
  Upload,
  Trash2,
  Info,
  ChevronRight,
  Shield,
  Database,
  Heart,
} from 'lucide-react';

export function SettingsPage() {
  const { theme, toggleTheme, transactions, categories, accounts } = useStore();
  const [notifications, setNotifications] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);

  const handleExportData = () => {
    const data = {
      transactions,
      categories,
      accounts,
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `za-wallet-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const ToggleButton = ({ enabled, onToggle }) => (
    <button
      onClick={onToggle}
      className={`relative w-14 h-8 rounded-full transition-colors duration-200 ease-in-out flex-shrink-0 ${
        enabled ? 'bg-accent' : 'bg-muted'
      }`}
    >
      <span
        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ease-in-out ${
          enabled ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </button>
  );

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Profile Card */}
      <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl p-6 border border-accent/20">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-accent/25">
            P
          </div>
          <div>
            <h2 className="text-xl font-bold">Za Wallet</h2>
            <p className="text-muted-foreground">Your personal finance tracker</p>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border bg-secondary/30">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
            <Sun className="w-4 h-4" />
            Appearance
          </h3>
        </div>

        <div
          onClick={toggleTheme}
          className="px-5 py-4 flex items-center justify-between hover:bg-secondary/30 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${theme === 'light' ? 'bg-amber-100 text-amber-600' : 'bg-indigo-100 text-indigo-600'}`}>
              {theme === 'light' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </div>
            <div>
              <p className="font-semibold">Theme</p>
              <p className="text-sm text-muted-foreground">
                {theme === 'light' ? 'Light mode' : 'Dark mode'}
              </p>
            </div>
          </div>
          <ToggleButton enabled={theme === 'dark'} onToggle={toggleTheme} />
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border bg-secondary/30">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </h3>
        </div>

        <div className="divide-y divide-border">
          <div className="px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center dark:bg-blue-900/30 dark:text-blue-400">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Receive transaction alerts</p>
              </div>
            </div>
            <ToggleButton enabled={notifications} onToggle={() => setNotifications(!notifications)} />
          </div>

          <div className="px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center dark:bg-orange-900/30 dark:text-orange-400">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold">Budget Alerts</p>
                <p className="text-sm text-muted-foreground">Alert when spending exceeds budget</p>
              </div>
            </div>
            <ToggleButton enabled={budgetAlerts} onToggle={() => setBudgetAlerts(!budgetAlerts)} />
          </div>
        </div>
      </div>

      {/* Data & Privacy */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border bg-secondary/30">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
            <Database className="w-4 h-4" />
            Data & Privacy
          </h3>
        </div>

        <div className="divide-y divide-border">
          <div
            onClick={handleExportData}
            className="px-5 py-4 flex items-center justify-between hover:bg-secondary/30 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center dark:bg-green-900/30 dark:text-green-400">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold">Export Data</p>
                <p className="text-sm text-muted-foreground">Download all your data as JSON</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>

          <div
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = '.json';
              input.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    try {
                      const data = JSON.parse(event.target.result);
                      if (data.transactions && data.categories && data.accounts) {
                        useStore.setState({
                          transactions: data.transactions,
                          categories: data.categories,
                          accounts: data.accounts,
                        });
                        alert('Data imported successfully!');
                      } else {
                        alert('Invalid data format');
                      }
                    } catch {
                      alert('Failed to parse file');
                    }
                  };
                  reader.readAsText(file);
                }
              };
              input.click();
            }}
            className="px-5 py-4 flex items-center justify-between hover:bg-secondary/30 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center dark:bg-blue-900/30 dark:text-blue-400">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold">Import Data</p>
                <p className="text-sm text-muted-foreground">Restore from a backup file</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>

          <div
            onClick={() => {
              if (
                window.confirm(
                  'Are you sure? This will permanently delete all your data.'
                )
              ) {
                useStore.setState({
                  transactions: [],
                  accounts: [{ id: 'cash', name: 'Cash', type: 'cash', balance: 0 }],
                });
              }
            }}
            className="px-5 py-4 flex items-center justify-between hover:bg-destructive/10 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center dark:bg-red-900/30 dark:text-red-400">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-destructive">Delete All Data</p>
                <p className="text-sm text-muted-foreground">Permanently remove all transactions</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border bg-secondary/30">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
            <Info className="w-4 h-4" />
            About
          </h3>
        </div>

        <div className="px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-white">
              <span className="text-lg font-bold">P</span>
            </div>
            <div>
              <p className="font-semibold">Za Wallet</p>
              <p className="text-sm text-muted-foreground">Version 1.0.0</p>
            </div>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-border bg-secondary/30">
          <p className="text-sm text-muted-foreground text-center">
            Made with <Heart className="w-4 h-4 inline text-red-500 mx-1" /> for better finance management
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="text-center text-sm text-muted-foreground">
        <p>{transactions.length} transactions · {accounts.length} accounts</p>
      </div>
    </div>
  );
}