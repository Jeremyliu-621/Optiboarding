"use client";

interface ToggleLightProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function ToggleLight({ label, description, checked, onChange }: ToggleLightProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-[14px] font-medium" style={{ color: "hsl(275, 8%, 88%)" }}>{label}</p>
        {description && (
          <p className="text-[13px] mt-0.5" style={{ color: "hsl(275, 6%, 55%)" }}>{description}</p>
        )}
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative shrink-0 w-[40px] h-[22px] rounded-full cursor-pointer transition-colors duration-200"
        style={{ background: checked ? "hsl(275, 55%, 55%)" : "hsl(275, 8%, 28%)" }}
      >
        <span
          className="absolute top-[2px] left-[2px] w-[18px] h-[18px] rounded-full bg-white transition-transform duration-200"
          style={{ transform: checked ? "translateX(18px)" : "translateX(0)" }}
        />
      </button>
    </div>
  );
}
