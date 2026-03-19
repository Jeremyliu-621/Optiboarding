"use client";

interface ToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Toggle({ label, description, checked, onChange }: ToggleProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-[var(--text-primary)]">{label}</p>
        {description && (
          <p className="text-[12px] text-[var(--text-secondary)] mt-0.5">{description}</p>
        )}
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`
          relative shrink-0 w-[40px] h-[22px] rounded-full toggle-track cursor-pointer
          ${checked ? "bg-[var(--accent)]" : "bg-[var(--bg-elevated)]"}
        `}
      >
        <span
          className={`
            absolute top-[2px] left-[2px] w-[18px] h-[18px] rounded-full bg-white toggle-thumb
            ${checked ? "translate-x-[18px]" : "translate-x-0"}
          `}
        />
      </button>
    </div>
  );
}
