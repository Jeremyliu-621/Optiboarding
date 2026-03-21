"use client";

import { usePageOverlay } from "./hooks/usePageOverlay";
import { PageOverlay } from "./PageOverlay";

/**
 * Display component for page overlays during the guided tour.
 * Place this in the main layout of pages that should have tour overlays.
 * It automatically shows/hides based on the current tour step.
 */
export function PageOverlayDisplay() {
  const { overlayDef, shouldShowOverlay, onDismiss } = usePageOverlay();

  if (!overlayDef || !shouldShowOverlay) return null;

  return (
    <PageOverlay
      visible={true}
      title={overlayDef.title}
      description={overlayDef.description}
      bullets={overlayDef.bullets}
      preview={overlayDef.preview}
      onDismiss={onDismiss}
    />
  );
}
