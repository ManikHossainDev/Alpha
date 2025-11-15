"use client";
import React, { useState } from "react";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const showDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <section className="min-h-screen bg-[#EEF7FF]">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 h-screen w-16 md:w-64 lg:w-72  z-20">
          <Sidebar drawerOpen={drawerOpen} closeDrawer={closeDrawer} />
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 ml-16 md:ml-64 lg:ml-72">
          {/* Header */}
          <Header showDrawer={showDrawer} />

          {/* Main Content */}
          <main className="pt-20">
            <div className="">{children}</div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default MainLayout;
