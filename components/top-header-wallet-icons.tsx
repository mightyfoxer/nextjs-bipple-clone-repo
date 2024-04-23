"use client";

import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { FaEnvelope } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { arDZ } from "date-fns/locale";
import { TbLogout } from "react-icons/tb";
import { IoCopy } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import { SocketIndicator } from "./socket-indicator";

interface TopHeaderWalletIconsProps {}

function truncateWalletAddress(address: string, length = 8) {
  if (address) {
    if (address?.length <= length * 2) {
      return address;
    }
    return `${address.substring(0, length)}...${address.substring(
      address.length - length
    )}`;
  }
}

const TopHeaderWalletIcons: React.FC<TopHeaderWalletIconsProps> = (props) => {
  const { wallets, select, wallet, publicKey } = useWallet();

  const [textCopied, setTextCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(wallet?.adapter.publicKey?.toBase58()!)
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

  const handleSignOut = async () => {
    wallet?.adapter.disconnect();
    await signOut();
    redirect("/sign-in");
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="icon-box w-[50px] transition-all delay-100 h-[50px] flex items-center justify-center cursor-pointer hover:opacity-80">
            <FaEnvelope />
          </div>
          <div className="icon-box w-[50px] transition-all delay-100 h-[50px] flex items-center justify-center cursor-pointer hover:opacity-80">
            <FaBell />
          </div>
          <div className="icon-box w-[50px] transition-all delay-100 h-[50px] flex items-center justify-center cursor-pointer hover:opacity-80">
            <FaCog />
          </div>
        </div>
        <div className="opacity-10">
          <SocketIndicator />
        </div>

        <div className="flex items-center gap-3">
          {wallet && (
            <div className=" h-[50px] flex gap-3 px-5 py-2 items-center justify-center transition-all delay-100 cursor-pointer icon-box hover:opacity-80">
              <img
                src={wallet.adapter.icon}
                alt={`${wallet.adapter.name} icon`}
                className="w-7 h-7"
              />
              <div className="flex flex-col ">
                <div className="text-[#565A7F] text-xs">Solana</div>
                <div className="text-sm">
                  {truncateWalletAddress(
                    wallet.adapter.publicKey?.toBase58()!,
                    6
                  )}
                </div>
              </div>
              <div
                onClick={() => copyToClipboard()}
                className="bg-[#686868]  transition-all delay-75 ml-10 w-[29px] h-[29px] rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80"
              >
                {textCopied ? (
                  <>
                    <FaCheckCircle />
                  </>
                ) : (
                  <>
                    {" "}
                    <IoCopy />
                  </>
                )}
              </div>
            </div>
          )}
          <div
            onClick={() => handleSignOut()}
            className="icon-box w-[50px] transition-all delay-100 h-[50px] flex items-center justify-center cursor-pointer hover:opacity-80"
          >
            <TbLogout />
          </div>
        </div>
      </div>
    </>
  );
};

export default TopHeaderWalletIcons;
