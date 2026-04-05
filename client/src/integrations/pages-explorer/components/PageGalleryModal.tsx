//* @type Integration Component
//* @context Pages Explorer
//* @utility Modal de galería con búsqueda y previews de screenshots de cada página.

import { useEffect, useState, useMemo, useRef } from "react";
import { X, Search, RefreshCw, Loader2, ImageOff } from "lucide-react";
import { usePagesExplorerStore } from "../pages-explorer.slice";
import { ROUTE_MAP } from "../pages-explorer.mock";
import {
  captureAllScreenshots,
  refreshAllScreenshots,
  recaptureScreenshot,
  loadSavedScreenshots,
} from "../pages-explorer.screenshots";

export default function PageGalleryModal() {
  const galleryOpen = usePagesExplorerStore((s) => s.galleryOpen);
  const closeGallery = usePagesExplorerStore((s) => s.closeGallery);
  const setActiveRoute = usePagesExplorerStore((s) => s.setActiveRoute);
  const screenshots = usePagesExplorerStore((s) => s.screenshots);
  const capturingRoutes = usePagesExplorerStore((s) => s.capturingRoutes);

  const [query, setQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const capturingRef = useRef(false);

  const hasScreenshots = Object.keys(screenshots).length > 0;
  const isCapturing = capturingRoutes.size > 0;

  /** Al abrir: primero intenta cargar desde disco, si no hay captura todas */
  useEffect(() => {
    if (!galleryOpen) return;
    if (hasScreenshots || capturingRef.current) return;
    capturingRef.current = true;

    loadSavedScreenshots().then((loaded) => {
      if (!loaded) {
        return captureAllScreenshots();
      }
    }).finally(() => { capturingRef.current = false; });
  }, [galleryOpen, hasScreenshots]);

  const filteredRoutes = useMemo(() => {
    if (!query.trim()) return ROUTE_MAP;
    const q = query.toLowerCase();
    return ROUTE_MAP.filter(
      (r) =>
        r.label.toLowerCase().includes(q) ||
        r.path.toLowerCase().includes(q) ||
        r.navigateTo.toLowerCase().includes(q)
    );
  }, [query]);

  function handleSelect(navigateTo: string) {
    setActiveRoute(navigateTo);
    closeGallery();
    setQuery("");
  }

  async function handleRefreshAll() {
    setRefreshing(true);
    await refreshAllScreenshots();
    setRefreshing(false);
  }

  async function handleRefreshOne(e: React.MouseEvent, route: string) {
    e.stopPropagation();
    await recaptureScreenshot(route);
  }

  if (!galleryOpen) return null;

  const isGloballyLoading = isCapturing || refreshing;

  return (
    <div className="fixed inset-0 z-9200 flex items-center justify-center bg-black/60">
      {/* ==========================================
          Modal Container
         ========================================== */}
      <div className="relative w-full max-w-4xl max-h-[85vh] mx-4 flex flex-col bg-debug-surface dark:bg-debug-surface-dark rounded-(--radius-debug-panel) shadow-xl border border-debug-border dark:border-debug-border-dark overflow-hidden">
        {/* ==========================================
            Header
           ========================================== */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-debug-border dark:border-debug-border-dark">
          {/* Search */}
          <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-(--radius-debug-button) bg-debug-surface-overlay dark:bg-debug-surface-overlay-dark border border-debug-border dark:border-debug-border-dark">
            <Search size={14} className="text-debug-text-muted dark:text-debug-text-muted-dark shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pages..."
              autoFocus
              className="flex-1 bg-transparent text-xs text-debug-text dark:text-debug-text-dark placeholder:text-debug-text-muted dark:placeholder:text-debug-text-muted-dark outline-none"
            />
          </div>

          {/* Refresh All */}
          <button
            onClick={handleRefreshAll}
            disabled={isGloballyLoading}
            className="p-1.5 rounded-(--radius-debug-tab) text-debug-text-muted dark:text-debug-text-muted-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark transition-colors duration-150 disabled:opacity-40"
            title="Refresh all screenshots"
          >
            <RefreshCw size={15} className={isGloballyLoading ? "animate-spin" : ""} />
          </button>

          {/* Close */}
          <button
            onClick={() => { closeGallery(); setQuery(""); }}
            className="p-1.5 rounded-(--radius-debug-tab) text-debug-text-muted dark:text-debug-text-muted-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark transition-colors duration-150"
            title="Close"
          >
            <X size={15} />
          </button>
        </div>

        {/* ==========================================
            Gallery Grid
           ========================================== */}
        <div className="flex-1 overflow-y-auto p-4">
          {isCapturing && !hasScreenshots ? (
            /* Full loading state */
            <div className="flex flex-col items-center justify-center gap-3 py-16">
              <Loader2 size={32} className="animate-spin text-debug-accent" />
              <span className="text-xs text-debug-text-muted dark:text-debug-text-muted-dark">
                Capturing screenshots...
              </span>
            </div>
          ) : filteredRoutes.length === 0 ? (
            /* No results */
            <div className="flex flex-col items-center justify-center gap-2 py-16">
              <Search size={24} className="text-debug-text-muted dark:text-debug-text-muted-dark opacity-40" />
              <span className="text-xs text-debug-text-muted dark:text-debug-text-muted-dark">
                No pages match "{query}"
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredRoutes.map((route) => {
                const screenshot = screenshots[route.navigateTo];
                const isCapturing = capturingRoutes.has(route.navigateTo);

                return (
                  <div
                    key={route.path}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSelect(route.navigateTo)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSelect(route.navigateTo); }}
                    className="group flex flex-col rounded-(--radius-debug-panel) border border-debug-border dark:border-debug-border-dark overflow-hidden hover:border-debug-accent transition-colors duration-150 text-left bg-debug-surface-overlay dark:bg-debug-surface-overlay-dark cursor-pointer"
                  >
                    {/* Preview */}
                    <div className="relative aspect-video bg-debug-surface-raised dark:bg-debug-surface-raised-dark overflow-hidden">
                      {isCapturing ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Loader2 size={20} className="animate-spin text-debug-accent" />
                        </div>
                      ) : screenshot ? (
                        <img
                          src={screenshot}
                          alt={route.label}
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ImageOff size={20} className="text-debug-text-muted dark:text-debug-text-muted-dark opacity-40" />
                        </div>
                      )}

                      {/* Refresh individual */}
                      {!isCapturing && (
                        <button
                          onClick={(e) => handleRefreshOne(e, route.navigateTo)}
                          className="absolute top-1.5 right-1.5 p-1 rounded-(--radius-debug-tab) bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150 hover:bg-black/70"
                          title="Refresh screenshot"
                        >
                          <RefreshCw size={11} />
                        </button>
                      )}
                    </div>

                    {/* Label */}
                    <div className="px-3 py-2">
                      <span className="text-xs font-medium text-debug-text dark:text-debug-text-dark group-hover:text-debug-accent transition-colors duration-150">
                        {route.label}
                      </span>
                      <span className="block text-[10px] text-debug-text-muted dark:text-debug-text-muted-dark mt-0.5 truncate">
                        {route.path}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
