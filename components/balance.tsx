import { create } from 'zustand'

type State = {
  balance: number
}

type Action = {
  updateBalance: (firstName: State['balance']) => void
}

// Create your store, which includes both state and (optionally) actions
export const usePersonStore = create<State & Action>((set) => ({
    balance: 1000,
    updateBalance: (balance) => set({ balance }),
}))