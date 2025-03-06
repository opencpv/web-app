"use client";
import { Toaster } from "react-hot-toast";
export default function ModeratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
