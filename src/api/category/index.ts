import { CallApi } from "..";

export async function FetchCategoryList(page: number, limit: number) {
  try {
    const res = await CallApi({
      endpoint: `/ecommerce/categories?page${page}&limit${limit}`,
      method: "GET",
      params: {},
    });
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function CreateCategoryDetails(name: string) {
  try {
    const res = await CallApi({
      endpoint: "/ecommerce/categories",
      params: {
        name: name,
      },
    });
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function UpdateCategoryDetails(id?: number, name?: string) {
  try {
    const res = await CallApi({
      endpoint: `/ecommerce/categories/${id}`,
      method: "PATCH",
      params: {
        name: name,
      },
    });
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export async function DeleteCategoryDetails(id?: number) {
  try {
    const res = await CallApi({
      endpoint: `/ecommerce/categories/${id}`,
      method: "DELETE",
      params: {},
    });
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
