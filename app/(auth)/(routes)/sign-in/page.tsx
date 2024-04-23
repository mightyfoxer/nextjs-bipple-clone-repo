"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import type { WalletName } from "@solana/wallet-adapter-base";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import type { Wallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Signature } from "../../../../lib/signature";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import bs58 from "bs58";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import dynamic from "next/dynamic";
import LeftSidebarMenu from "@/components/left-sidebar-menu";
import { redirect } from "next/navigation";

const DynamicComponentWithNoSSR = dynamic(
  () => import("@/components/top-header-wallet-icons"),
  { ssr: false }
);

export default function Page() {
  const { wallets, select, wallet, publicKey, signMessage } = useWallet();
  const { data: session } = useSession();
  const [username, setUsername] = useState("");
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    // This will set isClient to true only when the component is mounted in the browser
    setIsClient(true);
  }, []);

  const user = session?.user;

  useEffect(() => {
    if (session) {
      console.log(session);
      redirect("/");
    }
  }, [session]);

  const onConnect = async (username: string) => {
    console.log("onConnect", username);
    if (!wallet) return;
    try {
      const csrf = await getCsrfToken();
      if (wallet && csrf) {
        const noneUnit8 = Signature.create(csrf);
        const signature = await signMessage!(noneUnit8);
        const serializedSignature = bs58.encode(signature);
        const message = {
          host: window.location.host,
          publicKey: publicKey?.toBase58(),
          nonce: csrf,
          username,
        };
        const response = await signIn("credentials", {
          message: JSON.stringify(message),
          signature: serializedSignature,
          username,
          redirect: false,
        });
        if (response?.error) {
          console.log("Error occured:", response.error);
          return;
        }
        console.log("Signed in!");
      } else {
        console.log("Could not connect to wallet");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    wallet?.adapter.disconnect();
    await signOut();
  };

  const [listedWallets, collapsedWallets] = useMemo(() => {
    const installed: Wallet[] = [];
    const loadable: Wallet[] = [];
    const notDetected: Wallet[] = [];

    for (const wallet of wallets) {
      if (wallet.readyState === WalletReadyState.NotDetected) {
        notDetected.push(wallet);
      } else if (wallet.readyState === WalletReadyState.Loadable) {
        loadable.push(wallet);
      } else if (wallet.readyState === WalletReadyState.Installed) {
        installed.push(wallet);
      }
    }

    let listed: Wallet[] = [];
    let collapsed: Wallet[] = [];

    if (installed.length) {
      listed = installed;
      collapsed = [...loadable, ...notDetected];
    } else if (loadable.length) {
      listed = loadable;
      collapsed = notDetected;
    } else {
      collapsed = notDetected;
    }

    return [listed, collapsed];
  }, [wallets, isClient]);

  const handleWalletClick = useCallback(
    (event: React.MouseEvent, walletName: WalletName) => {
      select(walletName);
    },
    [select]
  );
  const handleWalletConnect = (event: any, walletContext: any) => {
    handleWalletClick(event, walletContext);
    wallet?.adapter.connect();
  };

  return (
    <>
      <div className="flex relative w-full h-full flex-col mx-auto bg-[#111214] gap-5">
        <div className="relative flex flex-col items-center justify-center flex-1 min-h-full px-6 py-12 shadow-2xl lg:px-8">
          <div className="relative flex items-center justify-center mb-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="w-[200px] mx-auto"
              src="/logo-text.png"
              alt="Biples"
            />
          </div>

          <div className="w-auto p-10 space-y-5 border shadow-xl rounded-xl login-box min-w-[500px]">
            <div className="text-xl font-[500] text-center capitalize">
              {publicKey ? <>Finish sign up</> : <>Connect</>}
            </div>
            {publicKey ? (
              <>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 mb-4 text-white rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-[#50FFFF]"
                />

                <button
                  onClick={() => onConnect(username)}
                  className="bg-[#50FFFF] w-full text-black rounded-lg px-10 py-2 font-bold"
                >
                  Sign ownership
                </button>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-5">
                  {!isClient ? (
                    <>
                      <div className="w-full h-[130px] rounded-lg bg-white/5 animate-pulse"></div>
                      <div className="w-full h-[130px] rounded-lg bg-white/5 animate-pulse"></div>
                      <div className="w-full h-[130px] rounded-lg bg-white/5 animate-pulse"></div>
                      <div className="w-full h-[130px] rounded-lg bg-white/5 animate-pulse"></div>
                    </>
                  ) : (
                    <>
                      {listedWallets && (
                        <>
                          {listedWallets.slice(0, 4).map((wallet) => (
                            <>
                              <div
                                key={wallet.adapter.name}
                                onClick={(event) => {
                                  handleWalletConnect(
                                    event,
                                    wallet.adapter.name
                                  );
                                }}
                                className="bg-[rgba(255, 255, 255, 0.05)]"
                              >
                                <div className="flex flex-col justify-center transition-all delay-75 items-center gap-5 p-5 w-[200px] h-[130px] wallet-box cursor-pointer">
                                  {wallet && (
                                    <img
                                      src={wallet.adapter.icon}
                                      alt={`${wallet.adapter.name} icon`}
                                      className="w-10 h-10"
                                    />
                                  )}
                                  <div className="text-lg font-bold">
                                    {wallet.adapter.name}
                                  </div>
                                </div>
                              </div>
                            </>
                          ))}
                        </>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="absolute flex items-center gap-1 text-xs leading-[0px] bottom-5">
            <img src="/logo-icon.png" alt="Biples" className="w-4 h-4 -mt-1" />
            Biples v0.01 © 2023. All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
}
