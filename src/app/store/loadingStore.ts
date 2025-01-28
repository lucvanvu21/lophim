import { create } from 'zustand';

interface LoadingState {
  globalLoading: boolean;
  setLoading: (value: boolean) => void;
}
export const useLoadingStore = create<LoadingState>(set => ({
  globalLoading: false,
  setLoading: value => set({ globalLoading: value }),
}));
