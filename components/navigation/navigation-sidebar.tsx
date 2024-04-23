import { redirect } from "next/navigation";

import { ModeToggle } from "@/components/mode-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { IoSearch } from "react-icons/io5";
import { NavigationAction } from "./navigation-action";
import { NavigationItem } from "./navigation-item";
import { useWallet } from "@solana/wallet-adapter-react";
import { MdArrowForward } from "react-icons/md";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="flex items-center w-full h-full p-3 text-primary">
      <NavigationAction />
      <ScrollArea className="flex flex-1 w-full">
        <div className="flex items-center gap-2.5">
          {servers.map((server) => (
            <div key={server.id}>
              <NavigationItem
                id={server.id}
                name={server.name}
                imageUrl={server.imageUrl}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="w-12 h-12 border rounded-xl border-[#4effff72] transition-all delay-100 cursor-pointer hover:opacity-80 hover:border-cyan-700 flex items-center justify-center">
        <MdArrowForward color='#4effff72' />
      </div>
    </div>
  );
};
