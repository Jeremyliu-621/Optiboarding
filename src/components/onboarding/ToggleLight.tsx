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
        <p className="text-[14px] font-medium text-[#0a0a0a]">{label}</p>
        {description && (
          <p className="text-[13px] text-[#8a8a8a] mt-0.5">{description}</p>
        )}
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`
          relative shrink-0 w-[40px] h-[22px] rounded-full toggle-track cursor-pointer
          transition-colors duration-200
          ${checked ? "bg-[#5b3dc8]" : "bg-[#d4d4d4]"}
        `}
      >
        <span
          className={`
            absolute top-[2px] left-[2px] w-[18px] h-[18px] rounded-full bg-white toggle-thumb
            transition-transform duration-200
            ${checked ? "translate-x-[18px]" : "translate-x-0"}
          `}
        />
      </button>
    </div>
  );
}
