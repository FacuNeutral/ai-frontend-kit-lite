//* @type Integration
//* @context Pages Explore
//* @utility Entry point de la integración de pages-explorer. Wrappea el contenido de la app.

import DebugTrigger from "./components/DebugTrigger";
import DebugPanel from "./components/DebugPanel";

export default function PagesExplorerIntegration({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DebugPanel>{children}</DebugPanel>
      <DebugTrigger />
    </>
  );
}
