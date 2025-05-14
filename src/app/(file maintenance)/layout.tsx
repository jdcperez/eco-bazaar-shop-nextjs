"use client";

import React, { Suspense, useEffect, useState } from "react";
import Header from "@/components/_layout/header";
import Sidebar from "@/components/_layout/sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Header />

      <section className="flex flex-1">
        <Sidebar />

        <div className="flex-1 p-6 bg-gray-100 h-screen overflow-auto">
          {children}
        </div>
      </section>
    </main>
  );
}
