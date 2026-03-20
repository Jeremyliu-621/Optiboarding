"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { OnboardingWizard } from "@/components/dashboard/OnboardingWizard";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isDesktop;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (status === "authenticated" && !localStorage.getItem("optimal-onboarded")) {
      setShowOnboarding(true);
    }
  }, [status]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <DashboardSkeleton />;
  }

  if (!session) {
    return null;
  }

  const mainMargin = isDesktop ? (sidebarCollapsed ? "56px" : "220px") : "0px";

  return (
    <div className="min-h-screen bg-[var(--bg-deep)]">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
      />

      <div
        className="transition-[margin] duration-200 ease-in-out"
        style={{ marginLeft: mainMargin }}
      >
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebarCollapse={() => setSidebarCollapsed((c) => !c)}
        />

        <main className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1100px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>
        {showOnboarding && (
          <OnboardingWizard
            userName={session.user?.name || undefined}
            userImage={session.user?.image || undefined}
            onComplete={() => {
              localStorage.setItem("optimal-onboarded", "true");
              setShowOnboarding(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--bg-deep)] flex">
      <div className="hidden lg:block w-[220px] bg-[var(--bg-surface)] shrink-0">
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full shimmer" />
            <div className="h-3 w-24 rounded shimmer" />
          </div>
          <div className="space-y-2 mt-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-8 rounded-[6px] shimmer" />
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="h-14 border-b border-[var(--border-subtle)]" />
        <div className="p-6 max-w-[1100px] mx-auto">
          {/* Greeting skeleton */}
          <div className="mb-8">
            <div className="h-3 w-32 rounded shimmer mb-2" />
            <div className="h-8 w-64 rounded shimmer" />
          </div>
          {/* Feature cards skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-[12px] overflow-hidden">
                <div className="aspect-[4/3] shimmer" />
                <div className="bg-[var(--bg-surface)] px-3 py-2.5">
                  <div className="h-3.5 w-16 rounded shimmer" />
                </div>
              </div>
            ))}
          </div>
          {/* Activity skeleton */}
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3 p-3">
                <div className="w-7 h-7 rounded-full shimmer shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 w-3/4 rounded shimmer" />
                  <div className="h-3 w-1/2 rounded shimmer" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
