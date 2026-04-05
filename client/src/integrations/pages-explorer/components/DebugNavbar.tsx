//* @type Integration Component
//* @context Pages Explore
//* @utility Navbar del panel de pages-explorer: rutas, viewport switcher, presets custom y toggle de detalles.

import {
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
  PanelRight,
  ChevronDown,
  Scaling,
  Search,
  LayoutGrid,
  Check,
  RefreshCw,
} from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import { usePagesExplorerStore } from "../pages-explorer.slice";
import {
  ROUTE_MAP,
  VIEWPORT_PRESETS,
  type ViewportMode,
} from "../pages-explorer.mock";

export default function DebugNavbar() {
  const activeRoute = usePagesExplorerStore((s) => s.activeRoute);
  const setActiveRoute = usePagesExplorerStore((s) => s.setActiveRoute);
  const viewportMode = usePagesExplorerStore((s) => s.viewportMode);
  const setViewportMode = usePagesExplorerStore((s) => s.setViewportMode);
  const setCustomSize = usePagesExplorerStore((s) => s.setCustomSize);
  const detailOpen = usePagesExplorerStore((s) => s.detailOpen);
  const toggleDetail = usePagesExplorerStore((s) => s.toggleDetail);
  const openGallery = usePagesExplorerStore((s) => s.openGallery);

  const [presetsOpen, setPresetsOpen] = useState(false);
  const presetsRef = useRef<HTMLDivElement>(null);
  const [routeQuery, setRouteQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (presetsRef.current && !presetsRef.current.contains(e.target as Node)) {
        setPresetsOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredRoutes = useMemo(() => {
    if (!routeQuery.trim()) return ROUTE_MAP;
    const q = routeQuery.toLowerCase();
    return ROUTE_MAP.filter(
      (r) =>
        r.label.toLowerCase().includes(q) ||
        r.path.toLowerCase().includes(q)
    );
  }, [routeQuery]);

  const activeEntry = ROUTE_MAP.find((r) => r.navigateTo === activeRoute);
  const activePathDisplay = activeEntry?.navigateTo ?? activeRoute;

  const viewportButtons: { mode: ViewportMode; icon: React.ReactNode; label: string }[] = [
    { mode: "responsive", icon: <Maximize2 size={16} />, label: "Responsive" },
    { mode: "mobile", icon: <Smartphone size={16} />, label: "Mobile" },
    { mode: "tablet", icon: <Tablet size={16} />, label: "Tablet" },
    { mode: "desktop", icon: <Monitor size={16} />, label: "Desktop" },
  ];

  return (
    <nav className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-2.5 bg-debug-surface dark:bg-debug-surface-dark border-b border-debug-border dark:border-debug-border-dark">
      {/* ==========================================
          Left — Brand label
         ========================================== */}
      <div className="flex items-center gap-2 justify-self-start">
        <span className="font-secondary text-sm font-semibold animate-debug-brand select-none">
        PAGE EXPLORER
        </span>
      </div>

      {/* ==========================================
          Center — Route Search Bar
         ========================================== */}
      <div className="relative w-80" ref={searchRef}>
        <div
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-(--radius-debug-button) bg-debug-surface-overlay dark:bg-debug-surface-overlay-dark border border-debug-border dark:border-debug-border-dark cursor-text"
          onClick={() => setSearchFocused(true)}
        >
          <Search size={15} className="text-debug-text-muted dark:text-debug-text-muted-dark shrink-0" />
          {searchFocused ? (
            <input
              type="text"
              value={routeQuery}
              onChange={(e) => setRouteQuery(e.target.value)}
              placeholder="Search pages..."
              autoFocus
              className="flex-1 min-w-0 bg-transparent text-sm text-debug-text dark:text-debug-text-dark placeholder:text-debug-text-muted dark:placeholder:text-debug-text-muted-dark outline-none"
            />
          ) : (
            <span className="flex-1 min-w-0 truncate text-sm text-debug-text dark:text-debug-text-dark">
              {activePathDisplay}
            </span>
          )}
        </div>

        {/* Dropdown results */}
        {searchFocused && (
          <div className="absolute left-0 right-0 top-full mt-1 bg-debug-surface-raised dark:bg-debug-surface-raised-dark border border-debug-border dark:border-debug-border-dark rounded-(--radius-debug-panel) shadow-lg overflow-hidden z-9250">
            <div className="max-h-72 overflow-y-auto py-1">
              {filteredRoutes.length === 0 ? (
                <div className="px-4 py-5 text-center text-sm text-debug-text-muted dark:text-debug-text-muted-dark">
                  No pages found
                </div>
              ) : (
                filteredRoutes.map((route) => {
                  const isActive = activeRoute === route.navigateTo;
                  return (
                    <button
                      key={route.path}
                      onClick={() => {
                        setActiveRoute(route.navigateTo);
                        setRouteQuery("");
                        setSearchFocused(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 ${
                        isActive
                          ? "bg-debug-accent/10 text-debug-accent font-medium"
                          : "text-debug-text dark:text-debug-text-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark"
                      }`}
                    >
                      <span className="w-5 shrink-0 flex items-center justify-center">
                        {isActive && <Check size={14} className="text-debug-accent" />}
                      </span>
                      <span className="font-medium">{route.label}</span>
                      <span className="flex-1 text-left truncate text-xs text-debug-text-muted dark:text-debug-text-muted-dark">
                        {route.path}
                      </span>
                      {route.nested && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-debug-surface-overlay dark:bg-debug-surface-overlay-dark text-debug-text-muted dark:text-debug-text-muted-dark">
                          :id
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* ==========================================
          Right — Controls
         ========================================== */}
      <div className="flex items-center gap-1 justify-self-end">
        <button
          onClick={openGallery}
          className="p-2 rounded-(--radius-debug-tab) text-debug-text-muted dark:text-debug-text-muted-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark transition-colors duration-150"
          title="Open page gallery"
        >
          <LayoutGrid size={16} />
        </button>

        <div className="w-px h-7 bg-debug-border dark:bg-debug-border-dark mx-1" />

        {/* Viewport Mode Buttons */}
        <div className="flex items-center gap-0.5">
          {viewportButtons.map((vp) => (
          <button
            key={vp.mode}
            onClick={() => setViewportMode(vp.mode)}
            className={`
              p-2 rounded-(--radius-debug-tab) transition-colors duration-150
              ${
                viewportMode === vp.mode
                  ? "bg-debug-accent text-debug-accent-foreground"
                  : "text-debug-text-muted dark:text-debug-text-muted-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark"
              }
            `}
            title={vp.label}
          >
            {vp.icon}
          </button>
          ))}
        </div>

        {/* Custom Presets Dropdown */}
        <div className="relative" ref={presetsRef}>
          <button
            onClick={() => setPresetsOpen(!presetsOpen)}
            className={`
              flex items-center gap-1.5 px-2.5 py-2 rounded-(--radius-debug-tab) text-sm
              transition-colors duration-150
              ${
                viewportMode === "custom"
                  ? "bg-debug-accent text-debug-accent-foreground"
                  : "text-debug-text-muted dark:text-debug-text-muted-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark"
              }
            `}
          title="Custom resolution"
          >
            <Scaling size={16} />
            <ChevronDown size={13} />
          </button>

          {presetsOpen && (
            <div className="absolute right-0 top-full mt-1 w-64 bg-debug-surface-raised dark:bg-debug-surface-raised-dark border border-debug-border dark:border-debug-border-dark rounded-(--radius-debug-panel) shadow-lg overflow-hidden z-9250">
              <div className="px-4 py-2.5 border-b border-debug-border dark:border-debug-border-dark">
                <span className="text-xs font-semibold uppercase tracking-wider text-debug-text-muted dark:text-debug-text-muted-dark">
                  Presets
                </span>
              </div>
              <div className="max-h-72 overflow-y-auto py-1">
                {VIEWPORT_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => {
                      setCustomSize(preset.width, preset.height);
                      setPresetsOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-debug-text dark:text-debug-text-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark transition-colors duration-150"
                  >
                    <span className="flex items-center gap-2.5">
                      {preset.icon === "mobile" && <Smartphone size={14} />}
                      {preset.icon === "tablet" && <Tablet size={14} />}
                      {preset.icon === "desktop" && <Monitor size={14} />}
                      {preset.label}
                    </span>
                    <span className="text-xs text-debug-text-muted dark:text-debug-text-muted-dark">
                      {preset.width}×{preset.height}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-7 bg-debug-border dark:bg-debug-border-dark mx-1" />

        {/* Detail Panel Toggle */}
        <button
          onClick={toggleDetail}
          className={`
            p-2 rounded-(--radius-debug-tab) transition-colors duration-150
            ${
              detailOpen
                ? "bg-debug-accent text-debug-accent-foreground"
                : "text-debug-text-muted dark:text-debug-text-muted-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark"
            }
          `}
          title="Toggle details panel"
        >
          <PanelRight size={16} />
        </button>
      </div>
    </nav>
  );
}
