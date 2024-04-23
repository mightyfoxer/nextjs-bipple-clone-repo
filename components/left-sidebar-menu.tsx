import React from "react";
import LeftSidebarMenuItemsList from "./left-sidebar-menu-items-list";
import { ProfileDrawer } from "./profil-drawer-server";
import { useSession } from "next-auth/react";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";

const LeftSidebarMenu: React.FC = async () => {
  const profile = await currentProfile();

  return (
    <div className="h-full rounded-[25px] border flex flex-col bg-white/5  min-w-[255px] max-w-[255px]">
      <div className="flex flex-col flex-1 w-full ">
        {profile && <ProfileDrawer />}

        <LeftSidebarMenuItemsList />
      </div>
      <div className="border-t border-[#53acff28] p-5 flex items-center justify-center">
        <img className="w-[140px] mx-auto" src="/logo-text.png" alt="Biples" />
      </div>
    </div>
  );
};

export default LeftSidebarMenu;
