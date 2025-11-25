"use client";

import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";
import { usePathname } from "next/navigation";
import { ToastProvider } from "@/components/ui/ToastContext";

export default function ClientLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideHeaderFooter =
    pathname.endsWith("/login") || pathname.endsWith("/register");
  return (
    <ToastProvider>
      {!hideHeaderFooter && <Header />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </ToastProvider>
  );
}
