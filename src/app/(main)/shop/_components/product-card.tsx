"use client";

import React from "react";
import { Box, Card, Inset, Strong, Text } from "@radix-ui/themes";
import Image from "next/image";
import { ProductListProps } from "@/types/product";
import { MoveDown, MoveUp } from "lucide-react";
import LoadingSpinner from "@/components/_common/loading-spinner";

export default function ProductsCard({
    product,
}: {
    product: ProductListProps,
}) {
    return (
        <Box>
            <Card size="2" className="h-[360px] overflow-hidden">
                <Inset clip="padding-box" side="top" pb="current">
                    <img
                        src={product.imageUrl ?? "/png/no-image-placeholder.png"}
                        alt="Bold typography"
                        style={{
                            display: "block",
                            objectFit: "cover",
                            width: "100%",
                            height: 140,
                            backgroundColor: "var(--gray-5)",
                        }}
                    />
                </Inset>
                <Box>
                    <Text as="p" size="4">
                        <Strong>{product.name}</Strong>
                    </Text>
                </Box>
            </Card>
        </Box>
    );
}
