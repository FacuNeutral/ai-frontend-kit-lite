//* @type Integration Component
//* @context Pages Explore
//* @utility Botón flotante que abre/cierra el panel de pages-explorer.

import { Layers } from "lucide-react";
import { usePagesExplorerStore } from "../store/pages-explorer.slice";

export default function DebugTrigger() {
  const toggle = usePagesExplorerStore((s) => s.toggle);
  const isOpen = usePagesExplorerStore((s) => s.isOpen);

  return (
    <button
      onClick={toggle}
      className={`
        fixed bottom-5 right-5 z-9300
        flex items-center justify-center
        w-12 h-12 rounded-(--radius-debug-button)
        transition-colors duration-200
        shadow-md
        ${
          isOpen
            ? "bg-debug-primary text-debug-primary-foreground"
            : "bg-debug-surface dark:bg-debug-surface-dark text-debug-text dark:text-debug-text-dark border border-debug-border dark:border-debug-border-dark"
        }
        hover:bg-debug-primary-hover hover:text-debug-primary-foreground
      `}
      title="Debug Panel"
    >
      <Layers size={20} />
    </button>
  );
}
