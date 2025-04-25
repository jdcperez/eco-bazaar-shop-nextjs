"use client"

import { Spinner } from "@radix-ui/themes";


export default function LoadingSpinner({
    className
}: {
    className: string,
}) {
    return (
        <div className="flex items-center justify-center">
            <Spinner className={className} />
        </div>
    );
}