"use client";

import { useDetectClickOutside } from "react-detect-click-outside";

import { ServerWithMembersWithProfiles } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { ChevronDown } from "lucide-react";
import { FaCheckCircle, FaCog } from "react-icons/fa";
import { IoCloseSharp, IoCopy } from "react-icons/io5";
import { useModal } from "@/hooks/use-modal-store";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsChatLeftTextFill } from "react-icons/bs";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";
import { FaMicrophone } from "react-icons/fa";
import { IoStorefront } from "react-icons/io5";
import { FaCamera } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useParams } from "next/navigation";
import { FaHashtag } from "react-icons/fa";
import { RiMegaphoneFill } from "react-icons/ri";

const DEFAULT_CHANNELS = [
  "Announcements",
  "general",
  "Voice chat",
  "Marketplace",
  "Sneak-peeks",
  "Team",
];

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
interface ServerRightRoomsProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
  members: any;
  textChannels: any;
  audioChannels: any;
  videoChannels: any;
}

const dropdownVariants = {
  open: { opacity: 1, height: "auto", scaleY: 1 },
  closed: { opacity: 0, height: 0, scaleY: 0 },
};

export const ServerRightRooms = ({
  server,
  role,
  members,
  textChannels,
  audioChannels,
  videoChannels,
}: ServerRightRoomsProps) => {
  const { onOpen } = useModal();
  const isAdmin = role === MemberRole.ADMIN;
  const params = useParams();
  const isModerator = isAdmin || role === MemberRole.MODERATOR;
  const [open, setOpen] = useState(false);
  const [currentChannelName, setCurrentChannelName] = useState("");
  const [currentChannelId, setCurrentChannelId] = useState("");

  const allChannels = [...textChannels, ...audioChannels, ...videoChannels];
  // Separate default and non-default channels
  const defaultChannels = allChannels
    .filter((channel) => DEFAULT_CHANNELS.includes(channel.name))
    .sort(
      (a, b) =>
        DEFAULT_CHANNELS.indexOf(a.name) - DEFAULT_CHANNELS.indexOf(b.name)
    );

  const nonDefaultChannels = allChannels.filter(
    (channel) => !DEFAULT_CHANNELS.includes(channel.name)
  );

  const closeMenu = () => {
    setOpen(false);
  };

  const ref = useDetectClickOutside({ onTriggered: closeMenu });

  useEffect(() => {
    if (params?.channelId) {
      const currentChannel = allChannels.find(
        (channel) => channel.id === params?.channelId
      );
      if (currentChannel) {
        setCurrentChannelName(currentChannel.name);
        setCurrentChannelId(currentChannel.id);
      }
    }
  }, [params?.channelId, allChannels]);

  const channelIconMap = {
    general: <BsChatLeftTextFill />,
    "Voice chat": <FaMicrophone />,
    Marketplace: <IoStorefront />,
    "Sneak-peeks": <FaCamera />,
    Team: <HiUsers />,
    Announcements: <RiMegaphoneFill />,
  };

  return (
    <div className="relative flex items-center gap-10 ">
      <div
        className={
          open
            ? "flex flex-col items-start border bg-white/5 rounded-2xl rounded-b-none border-b-0 transition-all w-[200px] delay-0"
            : "flex flex-col items-start border bg-white/5 rounded-2xl transition-all delay-0 w-[200px]"
        }
      >
        {open ? (
          <>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center justify-center gap-2 px-4 py-2 font-normal transition outline-none cursor-pointer hover:opacity-80 focus:outline-none"
            ></button>
          </>
        ) : (
          <>
            {currentChannelName === "" ? (
              <>
                <button className="flex items-center w-[200px] h-12 justify-center gap-2 px-4 py-3 font-normal capitalize transition outline-none cursor-pointer animate-pulse hover:opacity-80 focus:outline-none"></button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center justify-center gap-2 px-4 py-3 font-normal capitalize transition outline-none cursor-pointer hover:opacity-80 focus:outline-none"
                >
                  <div className="text-white">
                    {
                      //@ts-ignore
                      channelIconMap[currentChannelName] || <FaHashtag />
                    }
                  </div>
                  {currentChannelName}
                  <ChevronDown
                    className={`w-5 h-5 ml-auto ${open ? "rotate-180" : ""}`}
                  />
                </button>
              </>
            )}
          </>
        )}

        <AnimatePresence>
          {open && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={dropdownVariants}
              transition={{ duration: 0.2 }}
              ref={ref}
              className="absolute left-0 z-10 w-full  bg-[#2C2D2E] top-full rounded-b-2xl max-h-[500px] overflow-y-scroll"
              style={{ originY: 0 }}
            >
              <ScrollArea>
                {!!defaultChannels?.length && (
                  <div className="mb-2">
                    <div className="space-y-[2px]">
                      {defaultChannels.map((channel: any) => (
                        <ServerChannel
                          defaultChannel={true}
                          key={channel.id}
                          channel={channel}
                          role={role}
                          server={server}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="w-full h-[1px] opacity-20 my-5 bg-[#53ACFF]"></div>

                <div className="p-0 overflow-y-scroll">
                  <ScrollArea className="flex-1 px-3">
                    {!!nonDefaultChannels?.length && (
                      <div className="mb-2">
                        <div className="space-y-[2px]">
                          {nonDefaultChannels.map((channel: any) => (
                            <ServerChannel
                              key={channel.id}
                              channel={channel}
                              defaultChannel={false}
                              role={role}
                              server={server}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {isAdmin && isModerator && (
                      /*
                    <ServerSection
                      sectionType="channels"
                      channelType={ChannelType.AUDIO}
                      role={role}
                      label="Voice Channels"
                    />
                    */
                      <button
                        onClick={() =>
                          onOpen("createChannel", {
                            channelType: ChannelType.TEXT,
                          })
                        }
                        className={cn(
                          "flex items-center cursor-pointer hover:opacity-80 relative text-[#50FFFF] gap-3 px-4 py-3 pt-0 font-normal transition w-full"
                        )}
                      >
                        <div className="shadow-blue ">
                          {" "}
                          <FaPlus />
                        </div>
                        Create Room
                      </button>
                    )}

                    {!!members?.length && (
                      <div className="mb-2">
                        <div className="space-y-[2px]">
                          {members.map((member: any) => (
                            <ServerMember
                              key={member.id}
                              member={member}
                              server={server}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </ScrollArea>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/*

       

      */
