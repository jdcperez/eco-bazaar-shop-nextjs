import { create } from "zustand";
import { CategoryListProps } from "@/types/category";
import { FetchCategoryList } from "@/api/category";
import toast from "react-hot-toast";


type CategoryStore = {
    categoryLoading: boolean,
    category: CategoryListProps[] | null,
    setCategory: (category: CategoryListProps[] | null) => void,
    fetchCategory: (router: any) => Promise<void>;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
    categoryLoading: false,
    category: null,
    setCategory: (category) => set({ category }),
    fetchCategory: async (router: any) => {
        set({ categoryLoading: true });

        try {
            const apiResponse: any = await FetchCategoryList(1, 5);
            if (apiResponse.statusCode === 200) {
                const result = apiResponse.data;

                console.log(result);

                console.log(result.categories);
                const categories: CategoryListProps[] = result.categories.map((category: any) => ({
                    id: category._id,
                    name: category.name,
                }));

                console.log(categories);
                set({ category: categories });
            }
            else {
                set({ category: null });
            }
        } catch (error) {
            set({ category: null });
        }

        set({ categoryLoading: false });
    },
}));