"use client"

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Flex, Table } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes/components/button";
import { Plus } from "lucide-react";
import CategoryDetails from "./_components/product-details";
import { CategoryListProps } from "@/types/category";
import { useCategoryStore } from "@/store/category-store";
import Pagination from "@/components/_common/pagination";

export default function ProductPage() {
  const router = useRouter();
  const { category, categoryLoading, fetchCategory } = useCategoryStore();

  useEffect(() => {
    fetchCategory(router);
  }, [fetchCategory])

  return (
    <>
      <Box className="space-y-5">
        <Box overflow="auto">
          <Table.Root className="w-full text-left" variant="surface" >
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell
                  className="!align-middle"
                >
                  Category
                </Table.ColumnHeaderCell>
                <Table.Cell>
                  <Flex direction="row" align="center" justify="center">
                    <Button variant="ghost"
                      onClick={() => setIsCategoryAdd(true)}
                    >
                      <Plus />
                      New Category
                    </Button>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            </Table.Header>

            {/* Content */}
            <Table.Body>
              {isCategoryAdd &&
                <Table.Row align="center">
                  <CategoryDetails
                    category={null}
                  />
                </Table.Row>
              }

              {category?.map((category: CategoryListProps, index: number) => (
                <Table.Row align="center" key={index} >
                  <CategoryDetails
                    category={category}
                  />
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root >
        </Box>

        {/* <div>
          {pageDetails.totalCount > 0 && (
            <Pagination
              currentPage={pageDetails.currentPage}
              totalCount={pageDetails.totalCount}
              limit={pageDetails.limit}
              triggerPage={triggerPage}
            />
          )}
        </div> */}
      </Box>
    </>
  );
}
