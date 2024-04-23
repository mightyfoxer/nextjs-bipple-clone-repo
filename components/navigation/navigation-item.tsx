"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

export const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative items-center border  hover:border-[#50FFFF]/80 transition-all w-[165px] rounded-[15px]",
        params?.serverId === id ? "border-[#50FFFF]/10" : "border-[#50FFFF]/10"
      )}
    >
      <div
        className={cn(
          "absolute bottom-0 bg-[#50FFFF] rounded-t-full transition-all w-1/2 left-1/2 -translate-x-1/2",
          params?.serverId !== id && "group-hover:border",
          params?.serverId === id ? "h-[3px]" : "h-0"
        )}
      />
      <div
        className={
          "relative group flex justify-center items-center gap-2.5 mx-3 h-[48px] rounded-[16px] transition-all overflow-hidden $"
        }
      >
        {/* <Icon
          icon="solar:verified-check-bold"
          color="#42a5f5"
          className="absolute h-2.5 w-2.5 top-1 right-0"
        /> */}
        <Image
          className="rounded-full aspect-square w-[20px] h-[20px] object-cover"
          src={imageUrl}
          width={20}
          height={20}
          alt="Channel"
        />
        <p className="text-sm font-medium">{name}</p>
      </div>
    </button>
  );
};
