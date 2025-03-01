"use client";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-zinc-100 p-8">
      <div className="container mx-auto">{children}</div>
    </main>
  );
}
