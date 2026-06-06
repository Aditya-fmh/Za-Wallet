import { useStore } from '../store/useStore';
import { TrendingUp, TrendingDown, Target, ArrowUpRight, Wallet } from 'lucide-react';
import { TransactionList } from '../components/TransactionList';
import { AddTransactionForm } from '../components/AddTransactionForm';

export function TransactionsPage() {
  const { currentMonth, getBalance, setActiveTab, getTotalBalance } = useStore();
  const balance = getBalance();
  const totalBalance = getTotalBalance();

  return (
    <div className="space-y-6">
      {/* Balance Hero - Modern Gradient Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent via-accent/90 to-purple-600 p-6 text-white shadow-xl shadow-accent/20">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-400/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl" />

        <div className="relative">
          <p className="text-white/70 text-sm font-medium uppercase tracking-wider mb-1">Current Balance</p>
          <p className="text-5xl font-bold font-mono tracking-tight mb-6">
            ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>

          <div className="flex gap-4">
            <div className="flex-1 backdrop-blur-sm bg-white/10 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-green-400/20">
                  <TrendingUp className="w-4 h-4 text-green-300" />
                </div>
                <span className="text-white/70 text-xs font-medium">Income</span>
              </div>
              <p className="text-2xl font-bold font-mono text-green-300">
                +${balance.income.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="flex-1 backdrop-blur-sm bg-white/10 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-red-400/20">
                  <TrendingDown className="w-4 h-4 text-red-300" />
                </div>
                <span className="text-white/70 text-xs font-medium">Expenses</span>
              </div>
              <p className="text-2xl font-bold font-mono text-red-300">
                -${balance.expense.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats - Modern Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="group bg-card rounded-2xl p-5 border border-border hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/10">
              <Wallet className="w-5 h-5 text-green-500" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-3xl font-bold font-mono">${totalBalance.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Total Balance</p>
        </div>

        <div className="group bg-card rounded-2xl p-5 border border-border hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10 transition-all cursor-pointer" onClick={() => setActiveTab('stats')}>
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/10">
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-3xl font-bold font-mono">${balance.expense.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Spent This Month</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0">
        <button
          onClick={() => setActiveTab('accounts')}
          className="flex items-center gap-2 px-4 py-2.5 bg-card rounded-xl border border-border hover:border-accent/50 transition-all whitespace-nowrap"
        >
          <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="5" width="20" height="14" rx="2"/>
            <path d="M2 10h20"/>
          </svg>
          <span className="text-sm font-medium">View Accounts</span>
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className="flex items-center gap-2 px-4 py-2.5 bg-card rounded-xl border border-border hover:border-accent/50 transition-all whitespace-nowrap"
        >
          <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 20V10M12 20V4M6 20v-6"/>
          </svg>
          <span className="text-sm font-medium">View Stats</span>
        </button>
      </div>

      {/* Transaction List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <button className="text-sm text-accent hover:text-accent/80 font-medium">See all</button>
        </div>
        <TransactionList />
      </div>

      {/* Add Transaction FAB */}
      <AddTransactionForm />
    </div>
  );
}