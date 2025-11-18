"use client";
import AppHeader from "@/ui/layouts/AppHeader";
import Sidebar from "@/ui/layouts/Sidebar";
import { useState } from "react";

export default function AdminLayout({ children }) {
  const [collapseState, setcollapseState] = useState(false);

  return (
    <div className="max-h-screen overflow-hidden">
      <div className="min-h-screen bg-[#F9F7F7]">
        <div className="flex h-screen">
          {/* <!-- Sidebar --> */}
          <Sidebar collapseState={collapseState} />
          {/* <!-- Main content --> */}
          <div className="flex-1 flex flex-col overflow-hidden w-full">
            <AppHeader setcollapseState={setcollapseState} />
            <div className="flex-1 overflow-auto p-[25px]">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
