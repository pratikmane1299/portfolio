import type { Metadata } from "next";
import React from "react";
import { Fira_Code } from "next/font/google";

import Providers from "@/Providers";
import AuthProvider from "@/contexts/auth";
import AdminPanelHeader from "@/app/components/AdminPanel/admin-panel-header";
import { Toaster } from "@/components/ui/toaster";

import "../globals.css";

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Admin Panel",
    default: "Admin Panel",
  },
  description: "Admin panel for Pratik Manes blog.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body style={firaCode.style}>
        <Providers>
          <AuthProvider>
            {/* <header>
              <AdminPanelHeader />
            </header>
            <main className="w-full px-6 lg:max-w-4xl lg:mx-auto"> */}
              {children}
            {/* </main> */}
            <Toaster />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
