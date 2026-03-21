"use client";

import { PageOverlay } from "../PageOverlay";

interface OptibotOverlayProps {
  visible: boolean;
  onDismiss: () => void;
}

export function OptibotOverlay({ visible, onDismiss }: OptibotOverlayProps) {
  const preview = (
    <div className="w-64 space-y-2">
      {/* Fake PR rows */}
      {[
        { dot: "bg-green-500", title: "feat: add dark mode", verdict: "Approved" },
        { dot: "bg-yellow-500", title: "fix: API rate limiting", verdict: "Changes requested" },
        { dot: "bg-red-500", title: "refactor: auth module", verdict: "Issues found" },
      ].map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-2 p-2 rounded-[6px]"
          style={{ backgroundColor: "hsl(275, 10%, 15%)" }}
        >
          <div className={`w-2 h-2 rounded-full ${item.dot} shrink-0`} />
          <div className="flex-1 min-w-0">
            <p className="text-[12px] text-white truncate font-mono">
              {item.title}
            </p>
            <p className="text-[10px] text-[var(--text-muted)]">{item.verdict}</p>
          </div>
          <span className="text-[10px] text-[var(--text-muted)] shrink-0">
            2h ago
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <PageOverlay
      visible={visible}
      onDismiss={onDismiss}
      title="Optibot — your AI reviewer"
      description="Optibot reads your entire codebase, not just the diff. It understands context that file-level tools miss — like whether this PR breaks an invariant defined three files away, or introduces a security pattern your guidelines explicitly flag."
      bullets={[
        "Runs automatically on every opened PR",
        "Posts structured review comments directly to GitHub",
        "Trigger manual reviews on any PR URL",
      ]}
      preview={preview}
    />
  );
}
