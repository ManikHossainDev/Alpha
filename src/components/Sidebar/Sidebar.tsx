"use client";
import { Modal, Drawer } from "antd";
import { FiLogOut } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import profile from "@/assets/Authentication/profile.png";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { BsClipboardCheckFill,  } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";

interface SidebarProps {
  drawerOpen: boolean;
  closeDrawer: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ drawerOpen, closeDrawer }) => {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const pathname = usePathname();

  const showLogoutModal = () => setLogoutModalVisible(true);
  const handleLogoutCancel = () => setLogoutModalVisible(false);
  const handleLogoutConfirm = () => {
    setLogoutModalVisible(false);
    console.log("User logged out");
  };

  const menuItems = [
    { name: "Home", icon: <AiFillHome  size={28} />, href: "/todos" },
    { name: "Todos", icon: <BsClipboardCheckFill size={24} />, href: "/todos" },
    { name: "Account Information", icon: <FaUser size={24} />, href: "/account" },
  ];

  const renderMenuItem = (item: typeof menuItems[0], closeDrawerFn?: () => void) => {
    const isActive = pathname === item.href;
    return (
      <Link href={item.href} key={item.name} onClick={closeDrawerFn}>
        <div
          className={`flex items-center px-6 py-4 cursor-pointer transition
            ${isActive
              ? "bg-gradient-to-r from-[#1D3574] to-[#1d36744b]"
              : "hover:bg-gradient-to-r hover:from-[#1D3574] hover:to-[#1d36744b]"
            }`}
        >
          <span className="mr-4">{item.icon}</span>
          <span>{item.name}</span>
        </div>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        placement="left"
        onClose={closeDrawer}
        open={drawerOpen}
        width={260}
        styles={{ body: { backgroundColor: "#0D224A", padding: 0 } }}
      >
        <nav className="h-full flex flex-col bg-[#0D224A] text-white">
          {/* Profile */}
          <div className="flex flex-col items-center py-8 border-b border-gray-600">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-white">
              <Image src={profile} alt="Profile" width={96} height={96} />
            </div>
            <h3 className="text-lg font-semibold">Manik Hossain</h3>
            <p className="text-sm text-gray-300">se.manik.js@gmail.com</p>
          </div>

          {/* Menu */}
          <div className="flex-1 py-6">
            {menuItems.map((item) => renderMenuItem(item, closeDrawer))}
          </div>

          {/* Logout */}
          <div className="border-t border-gray-600">
            <button
              onClick={() => {
                closeDrawer();
                showLogoutModal();
              }}
              className="w-full text-left"
            >
              <div className="flex items-center px-6 py-4 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 cursor-pointer transition">
                <FiLogOut size={24} className="mr-4" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </nav>
      </Drawer>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col bg-[#0D224A] text-white h-screen w-64 fixed left-0 top-0">
        {/* Profile */}
        <div className="flex flex-col items-center py-8 border-b border-gray-600">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-white">
            <Image src={profile} alt="Profile" width={96} height={96} />
          </div>
          <h3 className="text-lg font-semibold">Manik Hossain</h3>
          <p className="text-sm text-gray-300">se.manik.js@gmail.com</p>
        </div>

        {/* Menu */}
        <div className="flex-1 py-6">
          {menuItems.map((item) => renderMenuItem(item))}
        </div>

        {/* Logout */}
        <div className="border-t border-gray-600">
          <button onClick={showLogoutModal} className="w-full text-left">
            <div className="flex items-center px-6 py-4 hover:bg-gradient-to-r hover:from-[#1D3574] hover:to-[#1d36744b] cursor-pointer transition">
              <FiLogOut size={24} className="mr-4" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </aside>

      {/* Logout Modal */}
      <Modal
        open={logoutModalVisible}
        onOk={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
        centered
        width={320}
        footer={null}
      >
        <div className="py-4 ">
          <h1 className="text-xl font-semibold mb-2">Logout</h1>
          <p className="text-gray-600 mb-4">Are you sure you want to log out?</p>
          <br />
          <div className="flex justify-between ">
            <button
              onClick={handleLogoutCancel}
              className="border border-gray-400 text-gray-700 px-5 py-2 rounded hover:bg-gray-100 transition"
            >
              No
            </button>
            <button
              onClick={handleLogoutConfirm}
              className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition"
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Sidebar;
