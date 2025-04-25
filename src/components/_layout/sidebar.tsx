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

                    {/* Collapsible Section */}
                    <li>
                        <Collapsible.Root open={open} onOpenChange={setOpen}>
                            <Collapsible.Trigger className="w-full flex items-center justify-between p-2 hover:bg-gray-800 rounded cursor-pointer">
                                <span className="flex items-center gap-2">
                                    <Library className="w-5 h-5" />
                                    <span>Books</span>
                                </span>
                                <ChevronDownIcon
                                    className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`}
                                />
                            </Collapsible.Trigger>

                            <Collapsible.Content className="pl-6 space-y-2">
                                <Link href="/books" className="block p-2 hover:bg-gray-800 rounded">
                                    Check A Books
                                </Link>
                                <Link href="/settings/security" className="block p-2 hover:bg-gray-800 rounded">
                                    Borrow A Books
                                </Link>
                                <Link href="/settings/security" className="block p-2 hover:bg-gray-800 rounded">
                                    Returned A Books
                                </Link>
                            </Collapsible.Content>
                        </Collapsible.Root>
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