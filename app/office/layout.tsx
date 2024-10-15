"use client";

import { useState } from "react";
import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";

export default function OfficeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleSidebarOpen = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div>
      <Topbar setIsSidebarOpen={handleSidebarOpen} />
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <main className="md:ml-64 min-h-screen p-4 pt-20">{children}</main>
      <div onClick={handleSidebarOpen} className={`${isSidebarOpen ? "bg-gray-900/50 fixed inset-0 z-30" : ""}`} />
    </div>
  );
}
