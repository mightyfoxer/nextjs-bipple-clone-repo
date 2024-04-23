import { redirect, useRouter } from "next/navigation";

import { ServerSidebar } from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import dynamic from "next/dynamic";
import { NavigationMarketSidebar } from "@/components/navigation/navigation-sidebar-market";
import { BackBtn } from "./Backbtn";

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/sign-in");
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  const DynamicComponentWithNoSSR = dynamic(
    () => import("@/components/top-header-wallet-icons"),
    { ssr: false }
  );

  return (
    <div className="flex flex-col h-full rounded-[25px] w-full mx-auto bg-[#111214] gap-5">
      <div className="flex gap-3 justify-between items-center">
        <BackBtn />
        <div className="w-full">
          <DynamicComponentWithNoSSR />
        </div>
      </div>
      <div className="bg-white/5 border rounded-[25px] border-[#283643] flex h-fit w-full z-30 flex-col mb-5">
        <NavigationMarketSidebar />
      </div>
      <main className="h-full rounded-[25px]">{children}</main>
    </div>
  );
};

export default ServerIdLayout;
