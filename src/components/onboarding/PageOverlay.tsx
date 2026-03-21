"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface PageOverlayProps {
  title: string;
  description: string;
  bullets: string[];
  preview: React.ReactNode;
  visible: boolean;
  onDismiss: () => void;
}

export function PageOverlay({
  title,
  description,
  bullets,
  preview,
  visible,
  onDismiss,
}: PageOverlayProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  const handleDismiss = () => {
    setIsDismissed(true);
    setTimeout(() => {
      onDismiss();
      setIsDismissed(false);
    }, 300);
  };

  return (
    <AnimatePresence mode="wait">
      {visible && !isDismissed && (
        <motion.div
          initial={{ translateY: "100%" }}
          animate={{ translateY: 0 }}
          exit={{ translateY: "100%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed left-[220px] right-0 bottom-0 z-30 h-1/2 flex items-stretch"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, hsl(275, 15%, 7%) 80px, hsl(275, 15%, 7%) 100%)",
          }}
        >
          {/* Content container with padding */}
          <div className="flex-1 flex items-end px-8 pb-12 pt-20">
            <div className="grid grid-cols-2 gap-12 w-full">
              {/* Left column */}
              <div className="space-y-4">
                <h2
                  className="text-[32px] font-bold tracking-[-0.02em] text-[var(--text-primary)]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {title}
                </h2>
                <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed">
                  {description}
                </p>

                {/* Feature bullets */}
                <div className="space-y-2 pt-4">
                  {bullets.map((bullet, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-[var(--accent)] text-lg leading-none mt-0.5">
                        −
                      </span>
                      <p className="text-[14px] text-[var(--text-secondary)]">
                        {bullet}
                      </p>
                    </div>
                  ))}
                </div>

                {/* "Got it" button */}
                <div className="pt-4">
                  <button
                    onClick={handleDismiss}
                    className="px-6 py-2.5 rounded-[8px] border border-[var(--accent)] text-[var(--accent)] text-[14px] font-medium hover:bg-[rgba(91,61,200,0.1)] transition-colors cursor-pointer"
                  >
                    Got it
                  </button>
                </div>
              </div>

              {/* Right column - preview */}
              <div className="flex items-center justify-center">
                {preview}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
