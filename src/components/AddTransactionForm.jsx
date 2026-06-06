import { useState } from 'react';
import { useStore } from '../store/useStore';
import { X, Plus, TrendingUp, TrendingDown } from 'lucide-react';

export function AddTransactionForm() {
  const { addTransaction, categories, accounts } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: 'food',
    accountId: accounts[0]?.id || 'cash',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    addTransaction(formData);
    setFormData({
      ...formData,
      description: '',
      amount: '',
    });
    setIsOpen(false);
  };

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 w-16 h-16 bg-gradient-to-br from-accent to-purple-600 rounded-full shadow-xl shadow-accent/40 flex items-center justify-center text-white hover:scale-110 hover:shadow-2xl transition-all z-40 md:bottom-8 md:right-8"
      >
        <Plus className="w-8 h-8" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="relative bg-card rounded-t-3xl md:rounded-2xl w-full max-w-md p-6 space-y-5 animate-in slide-in-from-bottom-4 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Add Transaction</h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Description
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="What was this for?"
                className="w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                required
              />
            </div>

            {/* Type Toggle */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'expense' })}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border-2 transition-all ${
                  formData.type === 'expense'
                    ? 'bg-red-500/10 border-red-500 text-red-500'
                    : 'border-border hover:border-muted-foreground'
                }`}
              >
                <TrendingDown className="w-5 h-5" />
                <span className="font-semibold">Expense</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'income' })}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border-2 transition-all ${
                  formData.type === 'income'
                    ? 'bg-green-500/10 border-green-500 text-green-500'
                    : 'border-border hover:border-muted-foreground'
                }`}
              >
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">Income</span>
              </button>
            </div>

            {/* Amount */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-lg">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent font-mono text-2xl transition-all"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Account */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Account
              </label>
              <select
                value={formData.accountId}
                onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
              >
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-accent to-purple-600 text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-accent/25 flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Transaction
            </button>
          </form>
        </div>
      )}
    </>
  );
}