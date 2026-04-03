//* @type Layout
//* @context Global
//* @utility Shell principal con Header, Sidebar y región de contenido dinámico.

import { Outlet } from "react-router-dom";
import Header from "@/components/core/Header";
import Sidebar from "@/components/core/Sidebar";
import { useUiStore } from "@/zustand/ui/ui.slice";

export default function MainLayout() {
  const sidebarCollapsed = useUiStore((s) => s.sidebarCollapsed);

  return (
    <div className="min-h-screen bg-neutral dark:bg-neutral-dark">
      {/* <Tag> Header */}
      <Header />
      {/* <Tag> Nav */}
      <Sidebar />
      {/* <Tag> Main — contenido de ruta */}
      <main
        className={`pt-14 transition-all duration-200 ${
          sidebarCollapsed ? "ml-[72px]" : "ml-56"
        } px-4 lg:px-6`}
      >
        <Outlet />
      </main>
    </div>
  );
}
