"use client";

import React, { useState } from "react";
import Image from "next/image";
import NotFoundHome from "@/assets/NotFoundHome.png";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";

const NotFoundPage = () => {
  // Drawer state (for mobile sidebar)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const showDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar (desktop + mobile drawer) */}
        <aside className="fixed left-0 top-0 h-screen w-16 md:w-64 lg:w-72  z-20">
          <Sidebar drawerOpen={drawerOpen} closeDrawer={closeDrawer} />
        </aside>

        {/* Main Area */}
        <div className="flex-1 ml-16 md:ml-64 lg:ml-72">
          {/* Header (includes hamburger) */}
          <Header showDrawer={showDrawer} />

          {/* Page Content */}
          <main className="pt-24 px-4 md:px-6 lg:px-8 pb-8 flex flex-col items-center justify-center text-center min-h-[calc(100vh-6rem)]">
            <div className="max-w-md">
              <Image
                src={NotFoundHome}
                alt="Not Found"
                className="w-full h-auto mb-6"
                priority
              />
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                Page Not Found
              </h1>
              <p className="text-gray-600">
                The page you’re looking for doesn’t exist or has been moved.
              </p>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;