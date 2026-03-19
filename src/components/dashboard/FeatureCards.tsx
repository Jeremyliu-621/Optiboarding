"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MessageSquareCode,
  BarChart3,
  Shield,
  FolderGit2,
  Users,
  FileText,
} from "lucide-react";

type ShapeVariant = "circles" | "hexagonal" | "waves" | "grid" | "orbital" | "diamond";

interface CardDef {
  label: string;
  icon: React.ElementType;
  href: string;
  color: string;
  gradient: string;
  decorColor: string;
  decorColor2: string;
  shape: ShapeVariant;
}

const cards: CardDef[] = [
  {
    label: "Review a PR",
    icon: MessageSquareCode,
    href: "/dashboard/optibot",
    color: "hsl(275, 35%, 55%)",
    gradient: "from-[hsl(275,30%,18%)] to-[hsl(275,20%,12%)]",
    decorColor: "hsl(275, 35%, 30%)",
    decorColor2: "hsl(275, 40%, 22%)",
    shape: "circles",
  },
  {
    label: "View Insights",
    icon: BarChart3,
    href: "/dashboard/insights",
    color: "hsl(220, 45%, 60%)",
    gradient: "from-[hsl(220,30%,18%)] to-[hsl(220,20%,12%)]",
    decorColor: "hsl(220, 35%, 30%)",
    decorColor2: "hsl(220, 40%, 22%)",
    shape: "hexagonal",
  },
  {
    label: "Security Scan",
    icon: Shield,
    href: "/dashboard/configuration/settings",
    color: "hsl(150, 40%, 50%)",
    gradient: "from-[hsl(150,25%,16%)] to-[hsl(150,15%,11%)]",
    decorColor: "hsl(150, 30%, 25%)",
    decorColor2: "hsl(150, 35%, 18%)",
    shape: "waves",
  },
  {
    label: "Browse Repos",
    icon: FolderGit2,
    href: "/dashboard/integrations/github",
    color: "hsl(35, 50%, 55%)",
    gradient: "from-[hsl(35,30%,17%)] to-[hsl(35,20%,11%)]",
    decorColor: "hsl(35, 35%, 28%)",
    decorColor2: "hsl(35, 40%, 20%)",
    shape: "grid",
  },
  {
    label: "Team Activity",
    icon: Users,
    href: "/dashboard/organization",
    color: "hsl(200, 40%, 55%)",
    gradient: "from-[hsl(200,30%,17%)] to-[hsl(200,20%,12%)]",
    decorColor: "hsl(200, 35%, 28%)",
    decorColor2: "hsl(200, 40%, 20%)",
    shape: "orbital",
  },
  {
    label: "Release Notes",
    icon: FileText,
    href: "/dashboard/configuration/guidelines",
    color: "hsl(340, 35%, 55%)",
    gradient: "from-[hsl(340,25%,17%)] to-[hsl(340,18%,12%)]",
    decorColor: "hsl(340, 30%, 28%)",
    decorColor2: "hsl(340, 35%, 20%)",
    shape: "diamond",
  },
];

function ShapeDecoration({
  shape,
  color,
  decorColor,
  decorColor2,
}: {
  shape: ShapeVariant;
  color: string;
  decorColor: string;
  decorColor2: string;
}) {
  switch (shape) {
    case "circles":
      return (
        <>
          <div className="absolute rounded-full" style={{ width: 80, height: 80, backgroundColor: decorColor2, opacity: 0.7, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
          <div className="absolute rounded-full" style={{ width: 44, height: 44, backgroundColor: decorColor, opacity: 0.5, top: "15%", right: "10%" }} />
          <div className="absolute rounded-full" style={{ width: 14, height: 14, backgroundColor: color, opacity: 0.6, bottom: "18%", left: "14%" }} />
        </>
      );
    case "hexagonal":
      return (
        <>
          <div className="absolute" style={{ width: 60, height: 60, backgroundColor: decorColor2, opacity: 0.6, top: "20%", left: "15%", clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
          <div className="absolute" style={{ width: 30, height: 30, backgroundColor: decorColor, opacity: 0.5, bottom: "15%", right: "20%", clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
          <div className="absolute rounded-full" style={{ width: 10, height: 10, backgroundColor: color, opacity: 0.5, top: "60%", right: "12%" }} />
        </>
      );
    case "waves":
      return (
        <>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 90" fill="none">
            <path d="M0 60 Q30 40 60 55 Q90 70 120 50" stroke={decorColor} strokeWidth="2.5" opacity="0.5" />
            <path d="M0 45 Q30 25 60 40 Q90 55 120 35" stroke={decorColor2} strokeWidth="2" opacity="0.4" />
            <path d="M0 75 Q30 55 60 70 Q90 85 120 65" stroke={color} strokeWidth="1.5" opacity="0.3" />
          </svg>
          <div className="absolute rounded-full" style={{ width: 18, height: 18, backgroundColor: decorColor, opacity: 0.6, top: "18%", right: "22%" }} />
        </>
      );
    case "grid":
      return (
        <>
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => (
              <div
                key={`${r}-${c}`}
                className="absolute rounded-[3px]"
                style={{
                  width: 16,
                  height: 16,
                  backgroundColor: (r + c) % 2 === 0 ? decorColor : decorColor2,
                  opacity: 0.5 + (r * 0.1),
                  top: `${22 + r * 22}%`,
                  left: `${12 + c * 22}%`,
                }}
              />
            ))
          )}
          <div className="absolute rounded-full" style={{ width: 12, height: 12, backgroundColor: color, opacity: 0.6, bottom: "15%", right: "14%" }} />
        </>
      );
    case "orbital":
      return (
        <>
          <div className="absolute rounded-full border-[1.5px]" style={{ width: 70, height: 70, borderColor: decorColor, opacity: 0.4, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
          <div className="absolute rounded-full border-[1.5px]" style={{ width: 44, height: 44, borderColor: decorColor2, opacity: 0.5, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
          <div className="absolute rounded-full" style={{ width: 8, height: 8, backgroundColor: color, opacity: 0.8, top: "18%", left: "50%", transform: "translateX(-50%)" }} />
          <div className="absolute rounded-full" style={{ width: 6, height: 6, backgroundColor: decorColor, opacity: 0.7, bottom: "22%", right: "20%" }} />
          <div className="absolute rounded-full" style={{ width: 6, height: 6, backgroundColor: decorColor, opacity: 0.7, top: "40%", left: "12%" }} />
        </>
      );
    case "diamond":
      return (
        <>
          <div className="absolute" style={{ width: 50, height: 50, backgroundColor: decorColor2, opacity: 0.6, top: "50%", left: "50%", transform: "translate(-50%, -50%) rotate(45deg)", borderRadius: 6 }} />
          <div className="absolute" style={{ width: 26, height: 26, backgroundColor: decorColor, opacity: 0.5, top: "18%", right: "15%", transform: "rotate(45deg)", borderRadius: 3 }} />
          <div className="absolute rounded-full" style={{ width: 10, height: 10, backgroundColor: color, opacity: 0.6, bottom: "20%", left: "18%" }} />
          <div className="absolute" style={{ width: 14, height: 14, backgroundColor: decorColor, opacity: 0.35, bottom: "30%", right: "22%", transform: "rotate(45deg)", borderRadius: 2 }} />
        </>
      );
  }
}

function CardIllustration({
  icon: Icon,
  color,
  decorColor,
  decorColor2,
  shape,
}: {
  icon: React.ElementType;
  color: string;
  decorColor: string;
  decorColor2: string;
  shape: ShapeVariant;
}) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <ShapeDecoration shape={shape} color={color} decorColor={decorColor} decorColor2={decorColor2} />
      {/* Main icon */}
      <div
        className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: `color-mix(in srgb, ${color} 25%, transparent)` }}
      >
        <Icon size={28} strokeWidth={1.5} style={{ color }} />
      </div>
    </div>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export function FeatureCards() {
  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {cards.map((card) => (
        <motion.div key={card.label} variants={item}>
          <Link
            href={card.href}
            className="group flex flex-col rounded-[12px] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
          >
            {/* Illustration area */}
            <div
              className={`aspect-[4/3] bg-gradient-to-b ${card.gradient} flex items-center justify-center transition-all duration-200 group-hover:brightness-125`}
            >
              <CardIllustration
                icon={card.icon}
                color={card.color}
                decorColor={card.decorColor}
                decorColor2={card.decorColor2}
                shape={card.shape}
              />
            </div>
            {/* Label */}
            <div className="bg-[var(--bg-surface)] group-hover:bg-[var(--bg-elevated)] transition-colors px-3 py-2.5">
              <span className="text-[13px] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                {card.label}
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
