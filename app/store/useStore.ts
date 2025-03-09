import { create } from 'zustand'

interface LoanState {
  // Add your state properties here
  loanAmount: number
  setLoanAmount: (amount: number) => void
}

export const useStore = create<LoanState>((set) => ({
  // Initial state
  loanAmount: 0,
  
  // Actions
  setLoanAmount: (amount: number) => set({ loanAmount: amount }),
})) 