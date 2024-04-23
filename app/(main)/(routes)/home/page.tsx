"use client";
import { CommunityCard } from "@/components/cards/community-card";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import Image from "next/image";
import React from "react";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import { communityCards } from "./home-communitycards";

const MyNFTsPage: React.FC = () => {
  return (
    <div className="bg-white/5 border rounded-[25px] flex h-[820px] w-full z-30 flex-col p-5 overflow-y-auto">
      <div className="relative w-full min-h-[234px] aspect-auto">
        <Image
          src="/images/home/search-box-background.svg"
          alt=""
          fill
          objectFit="cover"
          className="absolute border rounded-[25px]"
        />
        <div className="absolute mt-12 text-center w-full text-[40px] flex flex-col items-center justify-around gap-2">
          <p> Start your journey</p>
          <div className="cursor-pointer hover:opacity-80 flex items-center p-3 text-primary ">
            <input
              className="relative bg-zinc-950 bg-opacity-75 w-[430px]  2xl:w-full p-3 pl-10 border rounded-[10px] focus:border-sky-300 border-[0.75px] text-[18px] text-[#6D6D6D]"
              placeholder="Search community"
            />
            <img
              src="/images/market/Vector.svg"
              alt="Search"
              className="absolute w-5 h-5 ml-[15px] cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="text-2xl my-4">Featured Communities</div>
      <div className="flex flex-row flex-wrap justify-around gap-8">
        {communityCards.map((item, index) => (
          <CommunityCard
            key={index}
            imageURL={item.imageURL}
            followers={item.followers}
            avatar={item.avatar}
            userName={item.userName}
          />
        ))}
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <div className="w-[220px] h-0" key={i} />
          ))}
      </div>
    </div>
  );
};

export default MyNFTsPage;
