"use client"

import React, { useEffect, useState, } from "react";

export default function Pagination({
    currentPage,
    totalCount,
    limit,
    triggerPage,
}: {
    currentPage: number;
    totalCount: number;
    limit: number;
    triggerPage: (pageNumber: number, limit: number) => void;
}) {
    const [pages, setPages] = useState<[]>([]);

    useEffect(() => {
        let pageResultArr: any = UsePagination(totalCount, limit, 1, currentPage);

        if (pageResultArr) {
            setPages(pageResultArr);
        }
    }, [currentPage, totalCount, limit]);

    const DOTS = "...";

    const range = (start: number, end: number) => {
        let length = end - start + 1;
        return Array.from({ length }, (_, idx) => idx + start);
    };

    const UsePagination = (totalCount: number, pageSize: number, siblingCount: number = 1, currentPage: number) => {
        let totalPageCount = Math.ceil(totalCount / pageSize);

        let totalPageNumbers = siblingCount + 5;

        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        let leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        let rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

        let shouldShowLeftDots = leftSiblingIndex > 2;
        let shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        let firstPageIndex = 1;
        let lastPageIndex = totalPageCount;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, DOTS, totalPageCount];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
            return [firstPageIndex, DOTS, ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }
    };

    return (
        <div className="flex items-center justify-between py-4 sm:px-6 ">
            <div className="flex flex-1 items-center justify-between flex-wrap gap-2">
                <div>
                    <nav
                        className="isolate inline-flex -space-x-px rounded-md "
                        aria-label="Pagination"
                    >
                        {currentPage != 1 && (
                            <button
                                onClick={() => triggerPage(currentPage - 1, limit)}
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400  hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Previous</span>
                                <img src="/png/previous-arrow.png" alt="previous-arrow" />
                            </button>
                        )}

                        {pages.length > 0
                            ? pages.map((page, index) =>
                                page === "..." ? (
                                    <span
                                        key={index}
                                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold  focus:outline-offset-0 pagination-number"
                                    >
                                        ...
                                    </span>
                                ) : page === currentPage ? (
                                    <button
                                        onClick={() => triggerPage(page, limit)}
                                        key={index}
                                        aria-current="page"
                                        className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold 
                                        text-green-700 focus:z-20 
                                        focus-visible:outline focus-visible:outline-2 
                                        focus-visible:outline-offset-2 focus-visible:outline-indigo-600 
                                        pagination-arrow"
                                        disabled={true}
                                    >
                                        {page}
                                    </button>
                                ) : (
                                    <button
                                        key={index}
                                        onClick={() => triggerPage(page, limit)}
                                        className="relative inline-flex items-center px-4 py-2 text-sm hover:bg-gray-50 
                                        focus:z-20 focus:outline-offset-0"
                                    >
                                        {page}
                                    </button>
                                )
                            )
                            : ""}
                        {currentPage < pages[pages.length - 1] && pages.length > 1 && (
                            <button
                                onClick={() => triggerPage(currentPage + 1, limit)}
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400  hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Next</span>
                                <img src="/png/next-arrow.png" alt="next-arrow" />
                            </button>
                        )}
                    </nav>
                </div>
                <div className="flex flex-row">
                    <p className="text-sm">
                        <span className="">
                            Showing page {currentPage} of {pages[pages.length - 1]}
                            <span className="hidden sm:contents">(filtered from{" "} {totalCount} total records)</span>
                        </span>
                        <select
                            onChange={(e) =>
                                triggerPage(currentPage, parseInt(e.target.value))
                            }
                            style={{
                                border: "1px solid #ABABAB",
                                borderRadius: "5px",
                                padding: "5px 7px",
                                marginLeft: "17px",
                            }}
                            className="mt-5 sm:mt-0"
                            value={limit}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </p>
                </div>
            </div>
        </div>
    );
}