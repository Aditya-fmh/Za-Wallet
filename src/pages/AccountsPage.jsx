import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Plus, X, Building, CreditCard, Wallet, Pencil, Trash2, ChevronRight, DollarSign } from 'lucide-react';

const accountTypes = [
  { id: 'bank', name: 'Bank Account', icon: Building, color: 'blue' },
  { id: 'cash', name: 'Cash', icon: Wallet, color: 'green' },
  { id: 'credit', name: 'Credit Card', icon: CreditCard, color: 'orange' },
];

const colorMap = {
  blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
};

export function AccountsPage() {
  const { accounts, addAccount, updateAccount, deleteAccount, getTotalBalance } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', type: 'bank', balance: '' });

  const totalBalance = getTotalBalance();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    if (editingId) {
      updateAccount(editingId, {
        name: formData.name,
        type: formData.type,
        balance: parseFloat(formData.balance) || 0,
      });
      setEditingId(null);
    } else {
      addAccount({
        name: formData.name,
        type: formData.type,
        balance: parseFloat(formData.balance) || 0,
      });
    }

    setFormData({ name: '', type: 'bank', balance: '' });
    setIsAdding(false);
  };

  const handleEdit = (account) => {
    setFormData({
      name: account.name,
      type: account.type,
      balance: account.balance.toString(),
    });
    setEditingId(account.id);
    setIsAdding(true);
  };

  const getAccountIcon = (type) => {
    const accType = accountTypes.find((t) => t.id === type);
    return accType?.icon || Wallet;
  };

  const getAccountColor = (type) => {
    const accType = accountTypes.find((t) => t.id === type);
    return accType?.color || 'blue';
  };

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Total Balance - Hero Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent via-accent/90 to-purple-600 p-6 text-white shadow-xl shadow-accent/20">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-400/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl" />

        <div className="relative">
          <p className="text-white/70 text-sm font-medium uppercase tracking-wider mb-2">Total Balance</p>
          <p className="text-4xl font-bold font-mono mb-6">
            ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <div className="flex items-center gap-2 text-sm text-white/80">
            <span className="px-3 py-1 bg-white/10 rounded-full">{accounts.length} accounts</span>
          </div>
        </div>
      </div>

      {/* Add/Edit Account Form */}
      {(isAdding || editingId) && (
        <div className="bg-card rounded-2xl border border-accent/50 shadow-lg shadow-accent/10 p-6 animate-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">
              {editingId ? 'Edit Account' : 'Add New Account'}
            </h3>
            <button
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                setFormData({ name: '', type: 'bank', balance: '' });
              }}
              className="p-2 rounded-xl hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Account Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Chase Checking"
                className="w-full px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Account Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                {accountTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = formData.type === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: type.id })}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                        isSelected
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-border hover:border-accent/50'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-xs font-medium">{type.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Initial Balance
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  value={formData.balance}
                  onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent font-mono text-lg transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-accent text-white rounded-xl font-semibold hover:bg-accent/90 transition-all shadow-lg shadow-accent/25 flex items-center justify-center gap-2"
            >
              {editingId ? 'Update Account' : 'Add Account'}
            </button>
          </form>
        </div>
      )}

      {/* Account List */}
      <div className="space-y-4">
        {!isAdding && (
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Your Accounts</h3>
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-xl text-sm font-medium hover:bg-accent/90 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        )}

        {accounts.length === 0 ? (
          <div className="bg-card rounded-2xl border border-border p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-secondary mx-auto mb-4 flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-2">No accounts yet</p>
            <p className="text-sm text-muted-foreground/70 mb-6">
              Add your first account to start tracking
            </p>
            <button
              onClick={() => setIsAdding(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-medium hover:bg-accent/90 transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Account
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {accounts.map((account) => {
              const Icon = getAccountIcon(account.type);
              const colorClass = getAccountColor(account.type);
              const isEditing = editingId === account.id;

              return (
                <div
                  key={account.id}
                  className={`group bg-card rounded-2xl border border-border p-4 transition-all hover:border-accent/50 hover:shadow-lg ${
                    isEditing ? 'ring-2 ring-accent' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colorMap[colorClass]}`}>
                      <Icon className="w-7 h-7" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-lg">{account.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {accountTypes.find((t) => t.id === account.type)?.name}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className={`text-xl font-bold font-mono ${account.balance >= 0 ? '' : 'text-red-500'}`}>
                        ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(account)}
                        className="p-2.5 rounded-xl hover:bg-secondary transition-colors"
                      >
                        <Pencil className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this account?')) {
                            deleteAccount(account.id);
                          }
                        }}
                        className="p-2.5 rounded-xl hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}