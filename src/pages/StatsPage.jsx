import { useStore } from '../store/useStore';
import { TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import { format } from 'date-fns';

export function StatsPage() {
  const { currentMonth, getBalance, getCategoryStats, transactions, categories } = useStore();

  const balance = getBalance();
  const categoryStats = getCategoryStats(currentMonth);
  const monthTransactions = transactions.filter((t) => t.date.startsWith(currentMonth));

  // Calculate daily spending for the chart
  const dailyData = {};
  const daysInMonth = new Date(currentMonth + '-01').getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    const day = i.toString().padStart(2, '0');
    dailyData[day] = 0;
  }

  monthTransactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      const day = t.date.split('-')[2];
      dailyData[day] = (dailyData[day] || 0) + parseFloat(t.amount);
    });

  const maxDailySpending = Math.max(...Object.values(dailyData), 100);

  // Get top categories
  const topCategories = Object.entries(categoryStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  const savingsRate = balance.income > 0
    ? Math.round(((balance.income - balance.expense) / balance.income) * 100)
    : 0;

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-2xl p-5 border border-green-500/20">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-green-500/20">
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Total Income</p>
          <p className="text-2xl font-bold font-mono text-green-500">
            +${balance.income.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 rounded-2xl p-5 border border-red-500/20">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-red-500/20">
              <TrendingDown className="w-4 h-4 text-red-500" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
          <p className="text-2xl font-bold font-mono text-red-500">
            -${balance.expense.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-5 border border-accent/20">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-accent/20">
              <PiggyBank className="w-4 h-4 text-accent" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Savings</p>
          <p className="text-2xl font-bold font-mono text-accent">
            ${Math.max(0, balance.income - balance.expense).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Daily Spending Chart */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Daily Spending</h3>
          <span className="text-sm text-muted-foreground">
            {format(new Date(currentMonth + '-01'), 'MMMM yyyy')}
          </span>
        </div>
        <div className="flex items-end gap-1.5 h-48">
          {Object.entries(dailyData).map(([day, amount]) => {
            const height = (amount / maxDailySpending) * 100;
            const isToday =
              format(new Date(), 'yyyy-MM-dd') ===
              `${currentMonth}-${day}`;

            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full relative">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-300 ${
                      amount > 0 ? 'bg-gradient-to-t from-accent to-accent/60' : 'bg-muted'
                    } ${isToday ? 'ring-2 ring-accent ring-offset-2 ring-offset-background' : ''}`}
                    style={{ height: `${Math.max(height, 4)}%` }}
                  />
                  {amount > 0 && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-foreground text-background text-xs px-2 py-1 rounded-md font-mono whitespace-nowrap z-10">
                      ${amount.toFixed(0)}
                    </div>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h3 className="text-lg font-semibold mb-6">Spending by Category</h3>
        {topCategories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-2">No expenses this month</p>
            <p className="text-sm text-muted-foreground/70">Add transactions to see your spending breakdown</p>
          </div>
        ) : (
          <div className="space-y-5">
            {topCategories.map(([categoryId, amount], index) => {
              const category = categories.find((c) => c.id === categoryId);
              if (!category) return null;

              const percentage =
                balance.expense > 0 ? (amount / balance.expense) * 100 : 0;

              return (
                <div key={categoryId} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold"
                        style={{ backgroundColor: category.color + '20', color: category.color }}
                      >
                        {index + 1}
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="font-medium">
                          {category.name}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-semibold">
                        ${amount.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground text-sm ml-2">
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: category.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Income vs Expenses */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h3 className="text-lg font-semibold mb-6">Income vs Expenses</h3>
        <div className="flex items-center gap-10">
          <div className="relative w-36 h-36">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                className="text-secondary"
              />
              {balance.expense > 0 && (
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeDasharray={`${Math.min((balance.expense / balance.income) * 100, 100)} 100`}
                  strokeLinecap="round"
                  className="text-accent transition-all duration-500"
                />
              )}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold font-mono">{savingsRate}%</span>
              <span className="text-xs text-muted-foreground">saved</span>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-green-500" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">Income</p>
                  <p className="font-mono font-semibold">${balance.income.toLocaleString()}</p>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-red-500" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">Expenses</p>
                  <p className="font-mono font-semibold">${balance.expense.toLocaleString()}</p>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-full transition-all duration-500"
                    style={{ width: `${balance.income > 0 ? (balance.expense / balance.income) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}