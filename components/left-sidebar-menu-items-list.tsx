"use client";

import React from "react";
import { RiHome6Fill } from "react-icons/ri";
import { IoMdChatbubbles } from "react-icons/io";
import { HiMiniUsers } from "react-icons/hi2";
import { RiNftFill } from "react-icons/ri";
import { MdStore } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ProfileDrawer } from "./profil-drawer-server";

const LeftSidebarMenuItemsList: React.FC = () => {
  const pathname = usePathname();

  const progress = 70;

  //@ts-ignore
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path || pathname!.startsWith("/servers");
    }
    return pathname!.startsWith(path);
  };

  const menuItems = [
    { name: "Home", icon: RiHome6Fill, path: "/home" },
    { name: "Community", icon: FaUsers, path: "/" },
    { name: "Chats", icon: IoMdChatbubbles, path: "/chats" },
    { name: "Friends", icon: HiMiniUsers, path: "/friends" },
    { name: "My NFTs", icon: RiNftFill, path: "/my-nfts" },
    { name: "Marketplace", icon: MdStore, path: "/marketplace" },
  ];

  return (
    <div className="relative flex flex-col gap-6 p-5">
      {menuItems.map((item) => {
        const active = isActive(item.path);
        return (
          <Link
            href={item.path}
            key={item.name}
            className={`flex items-center  gap-3 font-medium cursor-pointer text-md hover:opacity-80 text-white`}
            style={{ borderRadius: active ? "10px" : "" }}
          >
            {active && (
              <div className="absolute bg-[#50FFFF] w-[5px] h-[40px] left-0 rounded-r-lg"></div>
            )}
            <div>
              {active ? (
                <div className="bg-[#50FFFF] shadow-blue w-[36px] flex items-center justify-center h-[36px] rounded-full ">
                  <item.icon
                    size="25"
                    className={`${active ? "text-black" : "text-white"}`}
                  />
                </div>
              ) : (
                <item.icon
                  size="25"
                  className={`${active ? "text-black" : "text-white"}`}
                />
              )}
            </div>

            <div>{item.name}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default LeftSidebarMenuItemsList;
