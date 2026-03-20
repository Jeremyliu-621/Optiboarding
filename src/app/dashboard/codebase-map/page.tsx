"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { useSession } from "next-auth/react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  type Node,
  type Edge,
  type Connection,
  type NodeTypes,
  type EdgeTypes,
  Handle,
  Position,
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  AlertTriangle,
  Star,
  ExternalLink,
  X,
  Trash2,
  GitFork,
  Clock,
  Lightbulb,
  Network,
} from "lucide-react";
import { Breadcrumb } from "@/components/dashboard/Breadcrumb";
import { EmptyState } from "@/components/dashboard/EmptyState";

/* ─── Constants ─── */
const STORAGE_KEY = "opti-codebase-map";
const NODE_WIDTH = 220;
const NODE_HEIGHT = 88;

/* ─── Language colors (GitHub conventions) ─── */
const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  Rust: "#dea584",
  Go: "#00add8",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Ruby: "#701516",
  PHP: "#4f5d95",
  Swift: "#f05138",
  Kotlin: "#a97bff",
  Dart: "#00b4ab",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Lua: "#000080",
  Scala: "#c22d40",
  Elixir: "#6e4a7e",
  Haskell: "#5e5086",
  Zig: "#ec915c",
};

function getLangColor(lang: string | null): string {
  if (!lang) return "var(--text-muted)";
  return LANG_COLORS[lang] || "var(--text-muted)";
}

/* ─── Time ago helper ─── */
function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

/* ─── Types ─── */
interface RepoData {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  pushed_at: string;
  fork: boolean;
}

interface SavedMap {
  nodes: Array<{ id: string; x: number; y: number }>;
  edges: Array<{
    id: string;
    source: string;
    target: string;
    label: string;
  }>;
  notes: Record<string, string>;
}

/* ─── Repo Node Component ─── */
function RepoNode({
  data,
  selected,
}: {
  data: {
    repo: RepoData;
    onNodeClick: (repo: RepoData) => void;
  };
  selected: boolean;
}) {
  const { repo, onNodeClick } = data;

  return (
    <div
      className="group cursor-pointer"
      onClick={() => onNodeClick(repo)}
      style={{ width: NODE_WIDTH }}
    >
      {/* Handles — invisible until hover */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-2.5 !h-2.5 !bg-[var(--accent)] !border-2 !border-[var(--bg-surface)] !opacity-0 group-hover:!opacity-100 !transition-opacity"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!w-2.5 !h-2.5 !bg-[var(--accent)] !border-2 !border-[var(--bg-surface)] !opacity-0 group-hover:!opacity-100 !transition-opacity"
      />

      <div
        className="dashboard-card p-3 transition-all duration-150"
        style={{
          boxShadow: selected
            ? "0 0 0 2px var(--accent), 0 4px 16px rgba(0,0,0,0.2)"
            : "0 2px 8px rgba(0,0,0,0.12)",
          transform: selected ? "translateY(-1px)" : undefined,
        }}
      >
        {/* Top row: language dot + name */}
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: getLangColor(repo.language) }}
          />
          <span className="text-[14px] font-medium text-[var(--text-primary)] truncate leading-tight">
            {repo.name}
          </span>
        </div>

        {/* Description */}
        <p className="text-[11px] text-[var(--text-muted)] truncate mb-2 leading-snug min-h-[14px]">
          {repo.description || "No description"}
        </p>

        {/* Bottom row: stars + pushed */}
        <div className="flex items-center gap-3 text-[11px] text-[var(--text-muted)]">
          <span className="flex items-center gap-1">
            <Star size={10} />
            {repo.stargazers_count}
          </span>
          {repo.fork && (
            <span className="flex items-center gap-1">
              <GitFork size={10} />
              fork
            </span>
          )}
          <span className="flex items-center gap-1 ml-auto">
            <Clock size={10} />
            {timeAgo(repo.pushed_at)}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Custom Edge with Label Pill ─── */
function LabeledEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  selected,
}: {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: Position;
  targetPosition: Position;
  data?: { label?: string; onLabelClick?: (edgeId: string) => void };
  selected?: boolean;
}) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 16,
  });

  const hasLabel = data?.label && data.label.trim().length > 0;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: selected ? "var(--accent)" : "var(--accent)",
          strokeOpacity: selected ? 0.8 : 0.35,
          strokeWidth: selected ? 2.5 : 1.5,
          strokeDasharray: hasLabel ? undefined : "6 4",
          transition: "stroke-opacity 0.15s, stroke-width 0.15s",
        }}
      />
      <EdgeLabelRenderer>
        <button
          className="nodrag nopan cursor-pointer"
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          onClick={(e) => {
            e.stopPropagation();
            data?.onLabelClick?.(id);
          }}
        >
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] max-w-[140px] truncate transition-all"
            style={{
              backgroundColor: hasLabel
                ? "var(--bg-elevated)"
                : "var(--accent-muted)",
              color: hasLabel
                ? "var(--text-secondary)"
                : "var(--text-muted)",
              border: `1px solid ${hasLabel ? "var(--card-border)" : "var(--accent-muted)"}`,
            }}
          >
            {hasLabel ? data.label : "describe..."}
          </span>
        </button>
      </EdgeLabelRenderer>
    </>
  );
}

/* ─── Label Editor Popover ─── */
function LabelEditor({
  edgeId,
  initialLabel,
  position,
  onSave,
  onRemove,
  onClose,
}: {
  edgeId: string;
  initialLabel: string;
  position: { x: number; y: number };
  onSave: (edgeId: string, label: string) => void;
  onRemove: (edgeId: string) => void;
  onClose: () => void;
}) {
  const [value, setValue] = useState(initialLabel);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const wordCount = value
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
  const isValid = wordCount >= 2 && wordCount <= 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -4 }}
      transition={{ duration: 0.12 }}
      className="fixed z-50"
      style={{ left: position.x, top: position.y }}
    >
      <div className="dashboard-card p-3 w-[260px] shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] font-medium text-[var(--text-primary)]">
            Describe relationship
          </span>
          <button
            onClick={onClose}
            className="text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
        <textarea
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='e.g. "shared auth module dependency"'
          rows={2}
          className="w-full bg-[var(--bg-elevated)] text-[var(--text-primary)] text-[12px] rounded-md px-2.5 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-[var(--accent)] placeholder:text-[var(--text-muted)]"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && isValid) {
              e.preventDefault();
              onSave(edgeId, value.trim());
            }
            if (e.key === "Escape") onClose();
          }}
        />
        <div className="flex items-center justify-between mt-2">
          <span
            className="text-[11px]"
            style={{
              color: isValid
                ? "var(--text-muted)"
                : "hsl(38, 50%, 55%)",
            }}
          >
            {wordCount} word{wordCount !== 1 ? "s" : ""}{" "}
            {!isValid && "(min 2)"}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onRemove(edgeId)}
              className="px-2 py-1 rounded text-[11px] text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer"
            >
              <Trash2 size={12} />
            </button>
            <button
              onClick={() => isValid && onSave(edgeId, value.trim())}
              disabled={!isValid}
              className="px-3 py-1 rounded text-[11px] font-medium bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white transition-colors disabled:opacity-40 cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Detail Drawer ─── */
function DetailDrawer({
  repo,
  notes,
  onNotesChange,
  onClose,
  onRemoveNode,
}: {
  repo: RepoData;
  notes: string;
  onNotesChange: (val: string) => void;
  onClose: () => void;
  onRemoveNode: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ x: 320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 320, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="absolute top-0 right-0 h-full w-[300px] z-20 border-l border-[var(--card-border)]"
      style={{ backgroundColor: "var(--bg-surface)" }}
    >
      <div className="p-4 h-full flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: getLangColor(repo.language) }}
            />
            <h3 className="text-[15px] font-semibold text-[var(--text-primary)] truncate">
              {repo.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors cursor-pointer shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        {/* Repo info */}
        <div className="space-y-3 mb-5">
          {repo.description && (
            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
              {repo.description}
            </p>
          )}

          <div className="grid grid-cols-2 gap-2 text-[12px]">
            <div className="bg-[var(--bg-elevated)] rounded-md px-2.5 py-2">
              <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-0.5">
                Language
              </p>
              <p className="text-[var(--text-primary)] font-medium">
                {repo.language || "—"}
              </p>
            </div>
            <div className="bg-[var(--bg-elevated)] rounded-md px-2.5 py-2">
              <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-0.5">
                Stars
              </p>
              <p className="text-[var(--text-primary)] font-medium">
                {repo.stargazers_count}
              </p>
            </div>
            <div className="bg-[var(--bg-elevated)] rounded-md px-2.5 py-2 col-span-2">
              <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-0.5">
                Last push
              </p>
              <p className="text-[var(--text-primary)] font-medium">
                {new Date(repo.pushed_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[12px] text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
          >
            <ExternalLink size={12} />
            Open on GitHub
          </a>
        </div>

        {/* Notes */}
        <div className="flex-1 flex flex-col">
          <label className="text-[12px] font-medium text-[var(--text-primary)] mb-1.5">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Add notes about this repo's role..."
            className="flex-1 min-h-[80px] bg-[var(--bg-elevated)] text-[var(--text-primary)] text-[12px] rounded-md px-2.5 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-[var(--accent)] placeholder:text-[var(--text-muted)]"
          />
        </div>

        {/* Remove */}
        <button
          onClick={() => onRemoveNode(String(repo.id))}
          className="mt-4 w-full px-3 py-2 rounded-md text-[12px] text-red-400 border border-red-400/20 hover:bg-red-400/10 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Trash2 size={12} />
          Remove from map
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Loading Skeleton ─── */
function LoadingSkeleton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="grid grid-cols-3 gap-6 p-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="shimmer rounded-[10px]" style={{ width: NODE_WIDTH, height: NODE_HEIGHT }} />
        ))}
      </div>
    </div>
  );
}

/* ─── Grid layout for initial placement ─── */
function computeGridPositions(
  count: number,
  cols: number = 4
): Array<{ x: number; y: number }> {
  const gapX = NODE_WIDTH + 80;
  const gapY = NODE_HEIGHT + 60;
  return Array.from({ length: count }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    // Slight jitter for organic feel
    const jx = (Math.sin(i * 2.7) * 20) | 0;
    const jy = (Math.cos(i * 3.1) * 15) | 0;
    return {
      x: 60 + col * gapX + jx,
      y: 60 + row * gapY + jy,
    };
  });
}

/* ─── Node/Edge type registrations ─── */
const nodeTypes: NodeTypes = {
  repo: RepoNode,
};

const edgeTypes: EdgeTypes = {
  labeled: LabeledEdge,
};

/* ─── Main Page ─── */
export default function CodebaseMapPage() {
  const { data: session } = useSession();

  /* State */
  const [repos, setRepos] = useState<RepoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedRepo, setSelectedRepo] = useState<RepoData | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [editingEdge, setEditingEdge] = useState<string | null>(null);
  const [editorPos, setEditorPos] = useState({ x: 0, y: 0 });
  const [saved, setSaved] = useState(false);
  const flowRef = useRef<HTMLDivElement>(null);

  /* Count unlabeled edges */
  const unlabeledCount = useMemo(
    () =>
      edges.filter(
        (e) => !e.data?.label || (e.data.label as string).trim().length === 0
      ).length,
    [edges]
  );

  /* Load saved map from localStorage */
  const loadSavedMap = useCallback(
    (repoList: RepoData[]) => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const saved: SavedMap = JSON.parse(raw);
        return saved;
      } catch {
        return null;
      }
    },
    []
  );

  /* Fetch repos */
  useEffect(() => {
    if (!session?.accessToken) return;

    const fetchRepos = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          "https://api.github.com/user/repos?sort=updated&per_page=30",
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
              Accept: "application/vnd.github.v3+json",
            },
          }
        );
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        const data: RepoData[] = await res.json();
        setRepos(data);

        // Build nodes
        const savedMap = loadSavedMap(data);
        const positions = computeGridPositions(data.length);

        const newNodes: Node[] = data.map((repo, i) => {
          const savedPos = savedMap?.nodes.find(
            (n) => n.id === String(repo.id)
          );
          return {
            id: String(repo.id),
            type: "repo",
            position: savedPos
              ? { x: savedPos.x, y: savedPos.y }
              : positions[i],
            data: {
              repo,
              onNodeClick: (r: RepoData) => setSelectedRepo(r),
            },
          };
        });
        setNodes(newNodes);

        // Restore edges
        if (savedMap?.edges) {
          const restoredEdges: Edge[] = savedMap.edges
            .filter(
              (se) =>
                data.some((r) => String(r.id) === se.source) &&
                data.some((r) => String(r.id) === se.target)
            )
            .map((se) => ({
              id: se.id,
              source: se.source,
              target: se.target,
              type: "labeled",
              data: {
                label: se.label,
                onLabelClick: handleLabelClick,
              },
            }));
          setEdges(restoredEdges);
        }

        // Restore notes
        if (savedMap?.notes) {
          setNotes(savedMap.notes);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load repositories"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.accessToken]);

  /* Handle new connection */
  const onConnect = useCallback(
    (connection: Connection) => {
      const newEdge: Edge = {
        ...connection,
        id: `e-${connection.source}-${connection.target}`,
        type: "labeled",
        data: {
          label: "",
          onLabelClick: handleLabelClick,
        },
      } as Edge;
      setEdges((eds) => addEdge(newEdge, eds));

      // Auto-open label editor
      setTimeout(() => {
        handleLabelClick(newEdge.id);
      }, 100);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /* Label click handler */
  const handleLabelClick = useCallback((edgeId: string) => {
    // Position editor near center of viewport
    const container = flowRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      setEditorPos({
        x: rect.left + rect.width / 2 - 130,
        y: rect.top + rect.height / 2 - 60,
      });
    }
    setEditingEdge(edgeId);
  }, []);

  /* Save edge label */
  const handleSaveLabel = useCallback(
    (edgeId: string, label: string) => {
      setEdges((eds) =>
        eds.map((e) =>
          e.id === edgeId
            ? {
                ...e,
                data: { ...e.data, label, onLabelClick: handleLabelClick },
              }
            : e
        )
      );
      setEditingEdge(null);
    },
    [setEdges, handleLabelClick]
  );

  /* Remove edge */
  const handleRemoveEdge = useCallback(
    (edgeId: string) => {
      setEdges((eds) => eds.filter((e) => e.id !== edgeId));
      setEditingEdge(null);
    },
    [setEdges]
  );

  /* Remove node */
  const handleRemoveNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((n) => n.id !== nodeId));
      setEdges((eds) =>
        eds.filter((e) => e.source !== nodeId && e.target !== nodeId)
      );
      setSelectedRepo(null);
      setNotes((prev) => {
        const next = { ...prev };
        delete next[nodeId];
        return next;
      });
    },
    [setNodes, setEdges]
  );

  /* Save map to localStorage */
  const handleSave = useCallback(() => {
    const mapData: SavedMap = {
      nodes: nodes.map((n) => ({
        id: n.id,
        x: n.position.x,
        y: n.position.y,
      })),
      edges: edges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        label: (e.data?.label as string) || "",
      })),
      notes,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mapData));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [nodes, edges, notes]);

  /* Notes change for selected repo */
  const handleNotesChange = useCallback(
    (val: string) => {
      if (!selectedRepo) return;
      setNotes((prev) => ({ ...prev, [String(selectedRepo.id)]: val }));
    },
    [selectedRepo]
  );

  /* Currently editing edge data */
  const editingEdgeData = useMemo(
    () => edges.find((e) => e.id === editingEdge),
    [edges, editingEdge]
  );

  return (
    <>
      {/* Header */}
      <Breadcrumb
        items={[
          { label: "Configuration", href: "/dashboard/configuration" },
          { label: "Codebase Map" },
        ]}
        subtitle="Map relationships between your repositories. Drag from node handles to connect, click labels to describe."
      />

      {/* Action bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {unlabeledCount > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[12px]">
              <AlertTriangle size={12} />
              {unlabeledCount} unlabeled connection
              {unlabeledCount !== 1 ? "s" : ""}
            </div>
          )}
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-md text-[13px] font-medium bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white transition-colors cursor-pointer"
        >
          <Save size={13} />
          {saved ? "Saved!" : "Save Map"}
        </button>
      </div>

      {/* Graph container */}
      <div
        ref={flowRef}
        className="relative rounded-[10px] overflow-hidden border border-[var(--card-border)]"
        style={{
          height: "calc(100vh - 230px)",
          minHeight: 500,
          backgroundColor: "var(--bg-deep)",
        }}
      >
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="dashboard-card p-6 max-w-sm text-center">
              <AlertTriangle
                size={28}
                className="mx-auto mb-3 text-red-400"
              />
              <p className="text-[14px] text-[var(--text-primary)] font-medium mb-1">
                Failed to load repos
              </p>
              <p className="text-[12px] text-[var(--text-secondary)]">
                {error}
              </p>
            </div>
          </div>
        ) : repos.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <EmptyState
              icon={Network}
              title="No repositories found"
              description="Connect your GitHub account and make sure you have repos to map."
            />
          </div>
        ) : (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            defaultEdgeOptions={{ type: "labeled" }}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            minZoom={0.3}
            maxZoom={2}
            proOptions={{ hideAttribution: true }}
            className="codebase-map-flow"
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={20}
              size={1}
              color="var(--border-subtle)"
            />
            <Controls
              showInteractive={false}
              className="!bg-[var(--bg-surface)] !border-[var(--card-border)] !rounded-md !shadow-lg [&>button]:!bg-[var(--bg-surface)] [&>button]:!border-[var(--card-border)] [&>button]:!text-[var(--text-secondary)] [&>button:hover]:!bg-[var(--bg-elevated)]"
            />
            <MiniMap
              nodeColor={(node) => {
                const repo = (node.data as { repo: RepoData }).repo;
                return getLangColor(repo?.language);
              }}
              maskColor="rgba(0,0,0,0.6)"
              className="!bg-[var(--bg-surface)] !border-[var(--card-border)] !rounded-md"
              style={{ width: 140, height: 90 }}
            />
          </ReactFlow>
        )}

        {/* Detail Drawer */}
        <AnimatePresence>
          {selectedRepo && (
            <DetailDrawer
              repo={selectedRepo}
              notes={notes[String(selectedRepo.id)] || ""}
              onNotesChange={handleNotesChange}
              onClose={() => setSelectedRepo(null)}
              onRemoveNode={handleRemoveNode}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Label Editor Popover */}
      <AnimatePresence>
        {editingEdge && editingEdgeData && (
          <LabelEditor
            edgeId={editingEdge}
            initialLabel={(editingEdgeData.data?.label as string) || ""}
            position={editorPos}
            onSave={handleSaveLabel}
            onRemove={handleRemoveEdge}
            onClose={() => setEditingEdge(null)}
          />
        )}
      </AnimatePresence>

      {/* Tips bar */}
      <div className="mt-3 flex items-center gap-4 text-[11px] text-[var(--text-muted)]">
        <span className="flex items-center gap-1">
          <Lightbulb size={11} />
          Tips:
        </span>
        <span>Drag handles to connect repos</span>
        <span className="text-[var(--border-subtle)]">·</span>
        <span>Click nodes for details</span>
        <span className="text-[var(--border-subtle)]">·</span>
        <span>Click edge labels to describe relationships</span>
        <span className="text-[var(--border-subtle)]">·</span>
        <span>Scroll to zoom, drag to pan</span>
      </div>
    </>
  );
}
