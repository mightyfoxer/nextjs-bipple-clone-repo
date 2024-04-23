"use client";

import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";
import { ModalType, useModal } from "@/hooks/use-modal-store";
import { BsChatLeftTextFill } from "react-icons/bs";
import { FaCamera, FaMicrophone } from "react-icons/fa6";
import { IoStorefront } from "react-icons/io5";
import { HiUsers } from "react-icons/hi2";
import { FaHashtag } from "react-icons/fa";
import { RiMegaphoneFill } from "react-icons/ri";

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
  defaultChannel?: boolean;
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

const annoucementIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="12"
    viewBox="0 0 11 12"
    fill="none"
  >
    <path
      d="M5.5053 7.30948C5.5053 7.98474 5.5053 8.63845 5.5053 9.29575C5.5053 9.6262 5.5053 9.96024 5.5053 10.2907C5.50172 10.7145 5.21465 11.009 4.78764 11.0126C4.58311 11.0162 4.37499 11.0126 4.17046 11.0126C3.8188 11.009 3.5748 10.8366 3.46356 10.5026C3.0832 9.36041 2.69926 8.2218 2.32607 7.07602C2.27584 6.92516 2.21483 6.87488 2.04977 6.87488C0.933813 6.86769 0.0367382 5.98411 0.00085522 4.87424C-0.0314395 3.74641 0.85487 2.7838 1.98518 2.75507C2.82485 2.73352 3.6681 2.75148 4.51135 2.74429C4.60105 2.74429 4.69794 2.71915 4.77688 2.67964C6.48132 1.82838 8.18217 0.973531 9.8902 0.129456C10.0373 0.0576198 10.2132 -0.00344098 10.371 0.000150834C10.7227 0.0109263 10.9775 0.291087 11.0026 0.646677C11.0062 0.686186 11.0062 0.725696 11.0062 0.768798C11.0062 3.46266 11.0062 6.15651 11.0026 8.85037C11.0026 8.96531 10.9882 9.08743 10.9488 9.19159C10.8088 9.57951 10.371 9.73396 9.97991 9.54359C9.42731 9.27061 8.87471 8.99045 8.32571 8.71747C7.42863 8.2685 6.53515 7.81952 5.63807 7.37414C5.60219 7.35259 5.56272 7.33822 5.5053 7.30948Z"
      fill="white"
    />
  </svg>
);

export const ServerChannel = ({
  channel,
  server,
  role,
  defaultChannel,
}: ServerChannelProps) => {
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();

  const Icon = iconMap[channel.type];

  const onClick = () => {
    router.push(`/servers/${params?.serverId}/channels/${channel.id}`);
  };

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { channel, server });
  };

  const channelIconMap = {
    general: <BsChatLeftTextFill />,
    "Voice chat": <FaMicrophone />,
    Marketplace: <IoStorefront />,
    "Sneak-peeks": <FaCamera />,
    Team: <HiUsers />,
    Announcements: <RiMegaphoneFill />,
  };

  return (
    <>
      <button
        onClick={onClick}
        className={cn(
          "flex items-center justify-start gap-3 px-4 py-3 font-normal transition w-full cursor-pointer hover:opacity-80"
        )}
      >
        {params?.channelId === channel.id ? (
          <div className="text-[#50FFFF] shadow-blue ">
            {
              //@ts-ignore
              channelIconMap[channel.name] || <FaHashtag />
            }
          </div>
        ) : (
          <div className="text-white">
            {
              //@ts-ignore
              channelIconMap[channel.name] || <FaHashtag />
            }
          </div>
        )}

        {params?.channelId === channel.id && (
          <div className="absolute bg-[#50FFFF] w-[5px] h-[40px] left-0 rounded-r-lg"></div>
        )}

        <p
          className={cn(
            "text-white capitalize",
            params?.channelId === channel.id && "text-[#50FFFF]"
          )}
        >
          {channel.name}
        </p>
        {channel.name !== "general" && role !== MemberRole.GUEST && (
          <div className="flex items-center ml-auto gap-x-2">
            <ActionTooltip label="Edit">
              <Edit
                onClick={(e) => onAction(e, "editChannel")}
                className="hidden w-4 h-4 transition group-hover:block text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
              />
            </ActionTooltip>
            <ActionTooltip label="Delete">
              <Trash
                onClick={(e) => onAction(e, "deleteChannel")}
                className="hidden w-4 h-4 transition group-hover:block text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
              />
            </ActionTooltip>
          </div>
        )}
        {channel.name === "general" && (
          <Lock className="w-4 h-4 ml-auto text-zinc-500 dark:text-zinc-400" />
        )}
      </button>
    </>
  );
};
