"use client";

import "./globals.css";
import "../styles/custom-style.css";
import "@radix-ui/themes/styles.css";

import React, { Suspense, useEffect, useState } from "react";
import { Theme } from "@radix-ui/themes";
import { toast, ToastBar, Toaster } from "react-hot-toast";
import { X } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-hidden">
        <Toaster toastOptions={{ duration: 5000 }}>
          {(t) => (
            <ToastBar toast={t}>
              {({ icon, message }) => (
                <>
                  {icon}
                  {message}
                  {t.type !== "loading" && (
                    <X onClick={() => toast.dismiss(t.id)} />
                  )}
                </>
              )}
            </ToastBar>
          )}
        </Toaster>

        <Theme accentColor="grass" radius="large">
          {children}
        </Theme>
      </body>
    </html>
  );
}
