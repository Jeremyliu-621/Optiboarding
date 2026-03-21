export interface TourStep {
  id: number;
  route: string;
  sidebarTarget: string | null;
  panelTitle: string;
  panelDescription: string;
  nextLabel: string;
  backLabel?: string;
}

export interface TourContextValue {
  isActive: boolean;
  currentStep: number;
  totalSteps: number;
  goNext: () => void;
  goBack: () => void;
  skipTour: () => void;
  completeTour: () => void;
  currentTourStep: TourStep | null;
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: 1,
    route: "/dashboard",
    sidebarTarget: "Dashboard",
    panelTitle: "Your command center",
    panelDescription:
      "This is your dashboard home. The six cards are quick shortcuts to Optibot's core features. Below them, you'll find real-time insights and recent PR activity from your connected GitHub repos.",

    nextLabel: "Show me Optibot →",
    backLabel: "← Back",
  },
  {
    id: 2,
    route: "/dashboard/optibot",
    sidebarTarget: "Optibot",
    panelTitle: "Meet Optibot",
    panelDescription:
      "Optibot is your AI code reviewer. It reads your entire codebase before reviewing each PR — not just the diff. Use this page to trigger manual reviews, configure its behaviour, and see what it's reviewed recently.",

    nextLabel: "Explore Repo Insights →",
    backLabel: "← Back",
  },
  {
    id: 3,
    route: "/dashboard/insights",
    sidebarTarget: "Repo Insights",
    panelTitle: "Understand your codebase",
    panelDescription:
      "Repo Insights shows how Optibot is affecting your team's velocity. Track merge time trends, review frequency, and security issue detection. Use the repository and time range selectors to drill into specific repos or periods.",

    nextLabel: "Go to Settings →",
    backLabel: "← Back",
  },
  {
    id: 4,
    route: "/dashboard/configuration/settings",
    sidebarTarget: "Settings",
    panelTitle: "Fine-tune Optibot",
    panelDescription:
      "Settings is where you control how Optibot behaves across your workspace. The review settings you configured during onboarding live here — you can change them any time. You'll also find your API key and webhook configuration.",

    nextLabel: "See Guidelines →",
    backLabel: "← Back",
  },
  {
    id: 5,
    route: "/dashboard/configuration/guidelines",
    sidebarTarget: "Guidelines",
    panelTitle: "Teach Optibot your rules",
    panelDescription:
      "Guidelines are natural-language instructions for Optibot. Tell it what your team cares about — security patterns to flag, style rules to enforce, or files to ignore. Optibot reads these before every review.",

    nextLabel: "View Codebase Map →",
    backLabel: "← Back",
  },
  {
    id: 6,
    route: "/dashboard/codebase-map",
    sidebarTarget: "Codebase Map",
    panelTitle: "See your whole codebase",
    panelDescription:
      "Create a visual representation of your organization's repository connections. Click on nodes to edit repository info, and click edge labels to describe relationships.",

    nextLabel: "Finish tour",
    backLabel: "← Back",
  },
];
