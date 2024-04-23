import { redirect } from "next/navigation";
import { ChannelType, MemberRole } from "@prisma/client";

import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ServerRightRooms } from "@/components/server/servers-right-rooms";
import { ServerHeader } from "@/components/server/server-header";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { NavigationMarketSidebar } from "@/components/navigation/navigation-sidebar-market";
import dynamic from "next/dynamic";
import LastSold from "./ServerMarketplace/lastSold";
import Trending from "./ServerMarketplace/trending";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/sign-in");
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) {
    redirect("/");
  }

  const isAdmin = member.role === MemberRole.ADMIN;
  const isModerator = member.role === MemberRole.MODERATOR;
  const isOwner = member.id === member.id;

  const handleNewMessage = (newMessage: any) => {
    console.log(newMessage);
  };
  const DynamicComponentWithNoSSR = dynamic(
    () => import("@/components/top-header-wallet-icons"),
    { ssr: false }
  );

  return (
    <div className="flex flex-col h-full rounded-[25px] sm:w-[100%] md:w-[100%] xl:w-[1050px] 2xl:w-[1600px] z-30 flex-col bg-[#111214] gap-5">
      <DynamicComponentWithNoSSR />
      {channel.type === ChannelType.TEXT && channel.name !== "Marketplace" && (
        <>
          <div className="bg-white/5 border rounded-[25px] flex h-fit w-full z-30 flex-col ">
            <NavigationSidebar />
          </div>

          <ChatHeader
            name={channel.name}
            serverId={channel.serverId}
            type="channel"
          />
          <ChatMessages
            member={member}
            name={channel.name}
            chatId={channel.id}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
            paramKey="channelId"
            paramValue={channel.id}
          />
          {channel.name === "Announcements" && isAdmin && (
            <>
              <ChatInput
                name={channel.name}
                type="channel"
                apiUrl="/api/socket/messages"
                query={{
                  channelId: channel.id,
                  serverId: channel.serverId,
                }}
              />
            </>
          )}
          {channel.name !== "Announcements" &&
            channel.name !== "Marketplace" && (
              <ChatInput
                name={channel.name}
                type="channel"
                apiUrl="/api/socket/messages"
                query={{
                  channelId: channel.id,
                  serverId: channel.serverId,
                }}
              />
            )}
        </>
      )}
      {channel.name === "Marketplace" && (
        <div>
          <div className="bg-white/5 border rounded-[25px] border-[#283643] flex w-full z-30 flex-col mb-5">
            <NavigationMarketSidebar />
          </div>
          <div className="border rounded-[25px] flex-col h-[790px] w-full p-5 overflow-y-auto bg-white/5">
            <MarketSidebar serverId={channel.serverId} />
            {/*  */}
            <LastSold />
            {/* Trending */}
            <Trending />
          </div>
        </div>
      )}
      {channel.type === ChannelType.AUDIO && (
        <MediaRoom chatId={channel.id} video={false} audio={true} />
      )}
      {channel.type === ChannelType.VIDEO && (
        <MediaRoom chatId={channel.id} video={true} audio={true} />
      )}
    </div>
  );
};

export default ChannelIdPage;

interface ServerSidebarProps {
  serverId: string;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="w-4 h-4 mr-2" />,
  [ChannelType.AUDIO]: <Mic className="w-4 h-4 mr-2" />,
  [ChannelType.VIDEO]: <Video className="w-4 h-4 mr-2" />,
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="w-4 h-4 mr-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="w-4 h-4 mr-2 text-rose-500" />,
};

const MarketSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  const members = server?.members.filter(
    (member) => member.profileId !== profile.id
  );

  if (!server) {
    return redirect("/");
  }

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="flex h-[80px] pt-2 left-0 right-0 rounded-t-2xl px-5 z-20 items-center  w-full text-primary">
      <div className="flex w-4/6  items-center gap-5">
        <div className="flex w-1/5">
          <ServerHeader server={server} role={role} />
        </div>
        <div className=" invisible lg:visible lg:flex lg:flex-row w-full border rounded-[15px] border-[#283643] p-2 items-center justify-center ">
          {properties.map((prop, index) => (
            <div key={index} className="flex w-1/5  gap-x-px">
              {prop.flag && (
                <img className="w-4 h-4 mt-0.5" src="/images/market/Mark.svg" />
              )}
              <span>
                <h5>{prop.val}</h5>
                <p className="text-stone-500 text-[13px]">{prop.mval}</p>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-2/6 flex flex-row-reverse">
        <ServerRightRooms
          server={server}
          role={role}
          members={members}
          videoChannels={videoChannels}
          textChannels={textChannels}
          audioChannels={audioChannels}
        />
      </div>
    </div>
  );
};

const properties = [
  {
    flag: true,
    val: "200k",
    mval: "Total volume",
  },
  {
    flag: true,
    val: "22.5k",
    mval: "Best offer",
  },
  {
    flag: true,
    val: "334.1",
    mval: "Floor price",
  },
  {
    flag: false,
    val: "2%",
    mval: "Listed",
  },
  {
    flag: false,
    val: "4k",
    mval: "Owners",
  },
];
