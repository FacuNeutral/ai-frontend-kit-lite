//* @type Integration
//* @context Pages Explore
//* @utility Entry point de la integración de pages-explorer. Wrappea el contenido de la app.

import DebugTrigger from "../components/DebugTrigger";
import DebugPanel from "../components/DebugPanel";
import DebugToolsModal from "../components/DebugToolsModal";
import { useDebugKeyboard } from "../hooks/useDebugKeyboard";

const IS_EXPLORER_IFRAME = window.name === "__pages_explorer__";

if (IS_EXPLORER_IFRAME) {
  document.documentElement.classList.add("scrollbar-debug");
  document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("scrollbar-debug");
  });

  const debugDark = new URLSearchParams(window.location.search).get("__debug_dark");
  if (debugDark === "1") {
    document.documentElement.classList.add("dark");
  } else if (debugDark === "0") {
    document.documentElement.classList.remove("dark");
  }
}

export default function PagesExplorerIntegration({ children }: { children: React.ReactNode }) {
  useDebugKeyboard();

  if (IS_EXPLORER_IFRAME) return <>{children}</>;

  return (
    <>
      <DebugPanel>{children}</DebugPanel>
      <DebugToolsModal />
    </>
  );
}
