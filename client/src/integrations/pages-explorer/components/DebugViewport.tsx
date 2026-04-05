//* @type Integration Component
//* @context Pages Explore
//* @utility Contenedor iframe-like que envuelve el contenido de la app con viewport controlado.

import { usePagesExplorerStore, getViewportWidth } from "../pages-explorer.slice";
import { VIEWPORT_MODE_WIDTHS } from "../pages-explorer.mock";

export default function DebugViewport({ children }: { children: React.ReactNode }) {
  const state = usePagesExplorerStore();
  const viewportWidth = getViewportWidth(state);

  const viewportLabel = (() => {
    switch (state.viewportMode) {
      case "responsive":
        return "Responsive — 100%";
      case "mobile":
        return `Mobile — ${VIEWPORT_MODE_WIDTHS.mobile}px`;
      case "tablet":
        return `Tablet — ${VIEWPORT_MODE_WIDTHS.tablet}px`;
      case "desktop":
        return `Desktop — ${VIEWPORT_MODE_WIDTHS.desktop}px`;
      case "custom":
        return `Custom — ${state.customWidth}×${state.customHeight}px`;
    }
  })();

  const modeColor = (() => {
    switch (state.viewportMode) {
      case "mobile":
        return "text-debug-viewport-mobile";
      case "tablet":
        return "text-debug-viewport-tablet";
      case "desktop":
        return "text-debug-viewport-desktop";
      default:
        return "text-debug-text-muted dark:text-debug-text-muted-dark";
    }
  })();

  return (
    <div className="flex-1 min-w-0 flex flex-col bg-debug-surface-overlay dark:bg-debug-surface-overlay-dark overflow-hidden">
      {/* ==========================================
          Viewport Indicator
         ========================================== */}
      <div className="flex items-center justify-center py-1.5 border-b border-debug-border dark:border-debug-border-dark">
        <span className={`text-[10px] font-medium tracking-wide ${modeColor}`}>
          {viewportLabel}
        </span>
      </div>

      {/* ==========================================
          Viewport Container
         ========================================== */}
      <div className="flex-1 flex justify-center overflow-auto p-3">
        <div
          className="relative bg-neutral dark:bg-neutral-dark rounded-(--radius-debug-panel) overflow-hidden shadow-md transition-all duration-300"
          style={{
            width: viewportWidth ?? "100%",
            maxWidth: "100%",
            height: "100%",
            transform: "translateZ(0)",
          }}
        >
          <div className="w-full h-full overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
