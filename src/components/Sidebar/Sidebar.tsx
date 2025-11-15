"use client";
import { Modal, Drawer } from "antd";
import { FiLogOut } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { BsClipboardCheckFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { useGetProfileQuery } from "@/redux/features/Profile/Profile";
// import { AiFillHome } from "react-icons/ai";

interface SidebarProps {
  drawerOpen: boolean;
  closeDrawer: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ drawerOpen, closeDrawer }) => {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { data } = useGetProfileQuery({});

  const showLogoutModal = () => setLogoutModalVisible(true);
  const handleLogoutCancel = () => setLogoutModalVisible(false);
  const handleLogoutConfirm = () => {
    dispatch(logout());
    router.push("/login");
    setLogoutModalVisible(false);
  };

  const menuItems = [
    // { name: "Home", icon: <AiFillHome size={28} />, href: "/" },
    { name: "Todos", icon: <BsClipboardCheckFill size={24} />, href: "/todos" },
    {
      name: "Account Information",
      icon: <FaUser size={24} />,
      href: "/",
    },
  ];

  const renderMenuItem = (
    item: (typeof menuItems)[0],
    closeDrawerFn?: () => void,
  ) => {
    const isActive = pathname === item.href;
    return (
      <Link href={item.href} key={item.name} onClick={closeDrawerFn}>
        <div
          className={`flex items-center px-6 py-4 cursor-pointer transition
          ${
            isActive
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
              {data?.profile_image && data.profile_image.trim() !== "" ? (
                <Image
                  src={data.profile_image}
                  alt="Profile"
                  width={96}
                  height={96}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>
            <h3 className="text-lg font-semibold">
              {data?.first_name + " " + data?.last_name}
            </h3>
            <p className="text-sm text-gray-300">{data?.email}</p>
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
            {data?.profile_image && data.profile_image.trim() !== "" ? (
              <Image
                src={data.profile_image}
                alt="Profile"
                width={96}
                height={96}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </div>
          <h3 className="text-lg font-semibold">
            {data?.first_name + " " + data?.last_name}
          </h3>
          <p className="text-sm text-gray-300">{data?.email}</p>
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
          <p className="text-gray-600 mb-4">
            Are you sure you want to log out?
          </p>
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
