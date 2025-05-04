"use client";

import React, { Suspense, useEffect, useState } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex items-center justify-center h-screen auth-layout-bg">
      <div className="">
        {children}
      </div>
    </section>
  );
}
