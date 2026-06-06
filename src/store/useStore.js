import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

const defaultCategories = [
  { id: 'food', name: 'Food & Dining', icon: 'utensils', color: '#F59E0B' },
  { id: 'transport', name: 'Transport', icon: 'car', color: '#3B82F6' },
  { id: 'shopping', name: 'Shopping', icon: 'shopping-bag', color: '#EC4899' },
  { id: 'utilities', name: 'Utilities', icon: 'zap', color: '#8B5CF6' },
  { id: 'entertainment', name: 'Entertainment', icon: 'tv', color: '#EF4444' },
  { id: 'health', name: 'Health', icon: 'heart', color: '#10B981' },
  { id: 'salary', name: 'Salary', icon: 'briefcase', color: '#059669' },
  { id: 'other', name: 'Other', icon: 'more-horizontal', color: '#6B7280' },
];

const defaultAccounts = [
  { id: 'cash', name: 'Cash', type: 'cash', balance: 0 },
];

export const useStore = create(
  persist(
    (set, get) => ({
      // Theme
      theme: 'light',
      toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light'
      })),

      // Current month
      currentMonth: new Date().toISOString().slice(0, 7),

      // Transactions
      transactions: [],
      addTransaction: (transaction) => {
        const newTransaction = {
          id: uuidv4(),
          date: new Date().toISOString().split('T')[0],
          ...transaction,
        };
        set((state) => ({
          transactions: [newTransaction, ...state.transactions],
        }));

        // Update account balance
        if (transaction.accountId) {
          const amount = transaction.type === 'income'
            ? parseFloat(transaction.amount)
            : -parseFloat(transaction.amount);

          set((state) => ({
            accounts: state.accounts.map(acc =>
              acc.id === transaction.accountId
                ? { ...acc, balance: acc.balance + amount }
                : acc
            ),
          }));
        }
      },

      updateTransaction: (id, updates) => set((state) => ({
        transactions: state.transactions.map(t =>
          t.id === id ? { ...t, ...updates } : t
        ),
      })),

      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter(t => t.id !== id),
      })),

      // Categories
      categories: defaultCategories,
      addCategory: (category) => set((state) => ({
        categories: [...state.categories, { id: uuidv4(), ...category }],
      })),

      // Accounts
      accounts: defaultAccounts,
      addAccount: (account) => set((state) => ({
        accounts: [...state.accounts, { id: uuidv4(), ...account }],
      })),

      updateAccount: (id, updates) => set((state) => ({
        accounts: state.accounts.map(a =>
          a.id === id ? { ...a, ...updates } : a
        ),
      })),

      deleteAccount: (id) => set((state) => ({
        accounts: state.accounts.filter(a => a.id !== id),
      })),

      // Navigation
      activeTab: 'transactions',
      setActiveTab: (tab) => set({ activeTab: tab }),

      // Computed values
      getBalance: () => {
        const { transactions } = get();
        const income = transactions
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + parseFloat(t.amount), 0);
        const expense = transactions
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + parseFloat(t.amount), 0);
        return { income, expense, total: income - expense };
      },

      getTransactionsByMonth: (month) => {
        const { transactions } = get();
        return transactions.filter(t => t.date.startsWith(month));
      },

      getCategoryStats: (month) => {
        const transactions = get().getTransactionsByMonth(month);
        const stats = {};

        transactions
          .filter(t => t.type === 'expense')
          .forEach(t => {
            if (!stats[t.category]) {
              stats[t.category] = 0;
            }
            stats[t.category] += parseFloat(t.amount);
          });

        return stats;
      },

      getTotalBalance: () => {
        const { accounts } = get();
        return accounts.reduce((sum, acc) => sum + acc.balance, 0);
      },
    }),
    {
      name: 'penny-wallet-storage',
      partialize: (state) => ({
        theme: state.theme,
        transactions: state.transactions,
        categories: state.categories,
        accounts: state.accounts,
      }),
    }
  )
);