import { create } from "zustand";

type CategoryAddStore = {
    isCategoryAdd: boolean;
    setIsCategoryAdd: (isCategoryAdd: boolean) => void;
};

export const useCategoryAddStore = create<CategoryAddStore>((set) => ({
    isCategoryAdd: false,
    setIsCategoryAdd: (isCategoryAdd) => set({ isCategoryAdd }),
}));

