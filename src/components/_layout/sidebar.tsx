"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDownIcon, HomeIcon, Library, TableOfContents } from "lucide-react";
import * as Collapsible from "@radix-ui/react-collapsible";

export default function Sidebar() {
    const [open, setOpen] = useState(false);

    return (
        <aside className="w-64 !bg-accent-primary text-white overflow-y-auto p-4">
            <nav>
                <ul>
                    {/* Home Link */}
                    <li className="p-2 hover:bg-gray-800 rounded">
                        <Link href="/" className="flex items-center gap-2">
                            <HomeIcon className="w-5 h-5" />
                            <span>Home</span>
                        </Link>
                    </li>

                    <li className="p-2 hover:bg-gray-800 rounded">
                        <Link href="/category" className="flex items-center gap-2">
                            <TableOfContents className="w-5 h-5" />
                            <span>Category</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};