"use client";
import React from "react";
import { FiMenu } from "react-icons/fi";
import { BsBell, BsCalendar3 } from "react-icons/bs";
import Image from "next/image";
import logo from "@/assets/Authentication/logo.png";

interface HeaderProps {
  showDrawer: () => void;
}

const Header: React.FC<HeaderProps> = ({ showDrawer }) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <header className="fixed top-0 left-0 md:left-64 right-0 bg-white border-b border-gray-200 z-40 shadow-sm">
      <nav className="flex justify-between items-center px-4 md:px-8 py-4">
        {/* Left Section: Menu + Logo */}
        <div className="flex items-center gap-3">
          {/* Hamburger button only on mobile */}
          <button
            type="button"
            className="md:hidden bg-blue-600 text-white p-2 rounded-md shadow"
            onClick={showDrawer}
          >
            <FiMenu size={22} />
          </button>

          {/* Logo */}
          <Image
            src={logo}
            alt="Dreamy Software Logo"
            className="h-10 w-auto hidden md:block"
          />
        </div>

        {/* Right Section: Icons & Date */}
        <div className="flex items-center gap-3 md:gap-4">
          <button className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
            <BsBell className="w-5 h-5" />
          </button>
          <button className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
            <BsCalendar3 className="w-5 h-5" />
          </button>
          <div className="text-right ml-2">
            <div className="text-sm font-medium text-gray-900">
              {currentDate.split(",")[0]}
            </div>
            <div className="text-sm text-gray-600">
              {currentDate.split(",")[1].trim()}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
