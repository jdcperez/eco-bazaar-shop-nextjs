import { create } from "zustand";

type PaginationStore = {
    loading: boolean;
    setLoading: (loading: boolean) => void;
};

export const usePaginationStore = create<PaginationStore>((set) => ({
    loading: false,
    setLoading: (loading) => set({ loading }),
}));
