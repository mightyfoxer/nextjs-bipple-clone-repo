"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import { ChevronDown, Trash } from "lucide-react";
import { FaCheckCircle, FaCog } from "react-icons/fa";
import { IoCloseSharp, IoCopy } from "react-icons/io5";
import { useModal } from "@/hooks/use-modal-store";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";
import { Button } from "../ui/button";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { SocketIndicator } from "../socket-indicator";
import { useDetectClickOutside } from "react-detect-click-outside";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal();
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;
  const [open, setOpen] = useState(false);
  const [textCopied, setTextCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setTextCopied(true);
        setTimeout(() => {
          setTextCopied(false);
        }, 5000);
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const ref = useDetectClickOutside({ onTriggered: closeMenu });

  const toggleOpen = () => {
    setOpen(!open);
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="relative flex items-center gap-10">
      <button
        onClick={toggleOpen}
        className="flex items-center justify-center gap-2 px-4 py-2 font-normal transition server-card"
      >
        <img
          src={server.imageUrl}
          className=" rounded-full h-[36px] w-[36px] "
        />
        {server.name}
        {open ? (
          <ChevronDown className="w-5 h-5 ml-auto rotate-180" />
        ) : (
          <ChevronDown className="w-5 h-5 ml-auto transform " />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              ref={ref}
              variants={variants}
              transition={{ duration: 0.5 }}
              className="absolute server-box w-[210px]  h-auto top-0 z-50"
            >
              <div className="relative z-50 flex items-center justify-between w-full p-3">
                <div className="cursor-pointer hover:opacity-80">
                  <FaCog />
                </div>
                <div
                  onClick={() => setOpen(false)}
                  className="cursor-pointer hover:opacity-80"
                >
                  <IoCloseSharp size="23" />
                </div>
              </div>
              <div className="relative z-10 flex flex-col items-center gap-2 p-3 -mt-8">
                <img
                  src={server.imageUrl}
                  className=" rounded-full h-[58px] w-[58px] "
                />
                <div className="font-500">{server.name}</div>
                <div className="flex items-center justify-between w-full gap-5">
                  <div className="flex-1 px-3 py-2 font-light rounded-full bg-white/5">
                    <div className="flex items-center gap-2 text-xs font-medium text-white">
                      <FaUser />

                      {server.members.length}
                    </div>
                  </div>
                  <div className="flex-1 px-3 py-2 font-light rounded-full bg-white/5">
                    <div className="flex items-center gap-2 text-xs font-medium text-white">
                      <div className="w-3 h-3 bg-green-700 rounded-full"></div>
                      200
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full gap-5 border-y border-[#53ACFF] border-opacity-20 py-3 my-2 flex items-center justify-center">
                <a
                  href="https://twitter.com/"
                  className="cursor-pointer hover:opacity-80"
                >
                  <BsTwitterX />
                </a>
                <a
                  href="https://twitter.com/"
                  className="cursor-pointer hover:opacity-80"
                >
                  <TbWorld />
                </a>
              </div>
              <div className="flex items-center justify-center p-4 pt-2">
                <div className="flex items-center justify-between w-full px-3 py-2 rounded-full bg-white/5">
                  <div className="w-[125px]  overflow-x-scroll text-sm font-light">
                    bp.me/claynosaurz
                  </div>
                  <div
                    onClick={() => copyToClipboard("bp.me/claynosaurz")}
                    className="cursor-pointer hover:opacity-80"
                  >
                    {textCopied ? (
                      <>
                        <FaCheckCircle />
                      </>
                    ) : (
                      <>
                        <IoCopy />
                      </>
                    )}
                  </div>
                </div>
              </div>
              {isModerator && (
                <button
                  onClick={() => onOpen("invite", { server })}
                  className="px-3 py-2 text-sm text-indigo-600 cursor-pointer dark:text-indigo-400"
                >
                  Invite People
                </button>
              )}
              {isAdmin && (
                <button
                  onClick={() => onOpen("deleteServer", { server })}
                  className="px-3 py-2 text-sm cursor-pointer text-rose-500"
                >
                  Delete Server
                  <Trash className="w-4 h-4 ml-auto" />
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

{
  /*
   <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none" asChild>
          <button className="flex items-center justify-center gap-2 px-4 py-2 font-normal transition server-card">
            <img
              src={server.imageUrl}
              className=" rounded-full h-[36px] w-[36px] "
            />
            {server.name}
            <ChevronDown className="w-5 h-5 ml-auto" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
          {isModerator && (
            <DropdownMenuItem
              onClick={() => onOpen("invite", { server })}
              className="px-3 py-2 text-sm text-indigo-600 cursor-pointer dark:text-indigo-400"
            >
              Invite People
              <UserPlus className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem
              onClick={() => onOpen("editServer", { server })}
              className="px-3 py-2 text-sm cursor-pointer"
            >
              Server Settings
              <Settings className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem
              onClick={() => onOpen("members", { server })}
              className="px-3 py-2 text-sm cursor-pointer"
            >
              Manage Members
              <Users className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isModerator && (
            <DropdownMenuItem
              onClick={() => onOpen("createChannel")}
              className="px-3 py-2 text-sm cursor-pointer"
            >
              Create Channel
              <PlusCircle className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isModerator && <DropdownMenuSeparator />}
          {isAdmin && (
            <DropdownMenuItem
              onClick={() => onOpen("deleteServer", { server })}
              className="px-3 py-2 text-sm cursor-pointer text-rose-500"
            >
              Delete Server
              <Trash className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {!isAdmin && (
            <DropdownMenuItem
              onClick={() => onOpen("leaveServer", { server })}
              className="px-3 py-2 text-sm cursor-pointer text-rose-500"
            >
              Leave Server
              <LogOut className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    */
}
