"use client";

import { DoorOpen, PenSquare, Plus } from "lucide-react";

import { ActionTooltip } from "@/components/action-tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";
import { Icon } from "@iconify/react";
export const NavigationAction = () => {
  const { onOpen } = useModal();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="flex group mr-3 h-[48px] w-fit hover:text-[#50FFFF] text-[#50FFFF]/40 cursor-pointer rounded-[16px] transition-all overflow-hidden items-center justify-center bg-trasparent border border-[#50FFFF]/40  hover:border-[#50FFFF]/80 "
        >
          <Plus className=" transition-all  p-2.5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52 border-0 rounded-[14px] bg-black/60 backdrop-blur-md">
          <DropdownMenuItem
            onClick={() => onOpen("createServer")}
            className="cursor-pointer flex items-center rounded-[10px] pl-[20px] gap-2.5 font-medium relative py-[14px] hover:bg-transparent group"
          >
            <div className="absolute left-0 rounded-r-full bg-[#50FFFF] transition-all h-5 w-0 group-hover:w-[0.2rem]" />

            <Icon
              icon="solar:pen-new-square-bold-duotone"
              className="h-4 w-4 group-hover:text-[#50FFFF]"
            />
            <p className="text-xs font-normal">Create a Community</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onOpen("createServer")}
            className="cursor-pointer flex items-center rounded-[10px] pl-[20px] gap-2.5 font-medium relative py-[14px] hover:bg-transparent group"
          >
            <div className="absolute left-0 rounded-r-full bg-[#50FFFF] transition-all h-5 w-0 group-hover:w-[0.2rem]" />
            <Icon
              icon="solar:login-2-bold-duotone"
              className="h-4 w-4 group-hover:text-[#50FFFF]"
            />

            <p className="text-xs font-normal">Join the Community</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
