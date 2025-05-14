"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { DefaultButton } from "@/components/_common/buttons";
import ProductsCard from "./_components/product-card";
import { ProductListProps } from "@/types/product";
import { useLoadingStore } from "@/store/loading-store";
import { fetchProductList } from "@/api/product";

export default function ShopPage() {
    const router = useRouter();
    const { loading, setLoading } = useLoadingStore();
    const [searchObject, setSearchObject] = useState();
    const [productList, setProductList] = useState<ProductListProps[]>([]);


    useEffect(() => {
        const getProductList = async () => {
            setLoading(true);
            try {
                let apiResponse: any = await fetchProductList(1, 50);
                if (apiResponse.statusCode === 200) {
                    const result = apiResponse.products;    

                    const product: ProductListProps[] = result.map(
                        (item: any) => ({
                            id: item.id,
                            name: item.name,
                            description: item.description,
                            imageUrl: item.mainImage.url,
                            price: item.price,
                            stock: item.stock
                        })
                    );
    
                    setProductList(product);
                } else {
                    setProductList([]);
                }
            } catch {
                setProductList([]);
            } finally {
                setLoading(false);
            }
        };

        getProductList();        
    }, []);    


    return (
        <>
            <title>Shop</title>
            <Box className="space-y-5">
                <Box>
                    <Grid columns="4" gap="3">
                        {productList.map((product: any, index: number) => (
                            <Box key={index} onClick={() =>
                                router.push(`/books/details?id=${product.id}`)
                            }>
                                <ProductsCard product={product} />
                            </Box>
                        ))}
                    </Grid>
                </Box>
            </Box >
        </>
    );
}