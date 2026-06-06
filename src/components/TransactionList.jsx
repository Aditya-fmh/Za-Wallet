import { useStore } from '../store/useStore';
import {
  Utensils,
  Car,
  ShoppingBag,
  Zap,
  Tv,
  Heart,
  Briefcase,
  MoreHorizontal,
  Trash2,
  Edit2,
} from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';

const iconMap = {
  utensils: Utensils,
  car: Car,
  'shopping-bag': ShoppingBag,
  zap: Zap,
  tv: Tv,
  heart: Heart,
  briefcase: Briefcase,
  'more-horizontal': MoreHorizontal,
};

export function TransactionList() {
  const { transactions, categories, currentMonth, deleteTransaction } = useStore();
  const [deletingId, setDeletingId] = useState(null);

  const monthTransactions = transactions.filter((t) =>
    t.date.startsWith(currentMonth)
  );

  const getCategoryInfo = (categoryId) => {
    return categories.find((c) => c.id === categoryId) || {
      name: 'Other',
      color: '#6B7280',
      icon: 'more-horizontal',
    };
  };

  const formatTransactionDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')) {
      return `Today, ${format(date, 'h:mm a')}`;
    } else if (format(date, 'yyyy-MM-dd') === format(yesterday, 'yyyy-MM-dd')) {
      return `Yesterday, ${format(date, 'h:mm a')}`;
    }
    return format(date, 'MMM d, h:mm a');
  };

  if (monthTransactions.length === 0) {
    return (
      <div className="bg-card rounded-2xl border border-border p-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-secondary mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
        </div>
        <p className="text-muted-foreground mb-2">No transactions this month</p>
        <p className="text-sm text-muted-foreground/70">
          Tap the + button to add your first transaction
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border bg-secondary/30 flex items-center justify-between">
        <h2 className="font-semibold">Recent Transactions</h2>
        <span className="text-sm text-muted-foreground">{monthTransactions.length} items</span>
      </div>

      <div className="divide-y divide-border">
        {monthTransactions.map((transaction) => {
          const category = getCategoryInfo(transaction.category);
          const IconComponent = iconMap[category.icon] || MoreHorizontal;
          const isDeleting = deletingId === transaction.id;

          return (
            <div
              key={transaction.id}
              className={`group px-5 py-4 flex items-center gap-4 hover:bg-secondary/30 transition-colors ${
                isDeleting ? 'opacity-50' : ''
              }`}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ backgroundColor: category.color + '20' }}
              >
                <IconComponent
                  className="w-6 h-6"
                  style={{ color: category.color }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">
                  {formatTransactionDate(transaction.date)}
                </p>
              </div>

              <div className="text-right">
                <p
                  className={`text-lg font-bold font-mono ${
                    transaction.type === 'income'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}$
                  {parseFloat(transaction.amount).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => {
                    if (window.confirm('Delete this transaction?')) {
                      setDeletingId(transaction.id);
                      setTimeout(() => {
                        deleteTransaction(transaction.id);
                        setDeletingId(null);
                      }, 200);
                    }
                  }}
                  className="p-2.5 rounded-xl hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}