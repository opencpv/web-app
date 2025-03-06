"use client";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
export default function ModeratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster />
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </>
  );
}
