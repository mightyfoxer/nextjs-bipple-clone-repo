"use client";
import React from "react";
import Trending from "./pagination/marketTrending";
import TopCollect from "./pagination/TopCollect";
import { NavigationMarketPlaceSidebar } from "@/components/navigation/navigation-sidebar-maketplace";
import SeeAll from "./pagination/seeAll";
import MarketCollect from "./pagination/marketCollect";
const MyNFTsPage: React.FC = () => {
  return (
    <div>
      <div className="bg-white/5 border rounded-[25px] border-[#283643] flex h-fit sm:w-[100%] md:w-[100%] xl:w-[1050px] 2xl:w-[1600px] xl:w-4/5 z-30 flex-col mb-5">
        <NavigationMarketPlaceSidebar />
      </div>
      <div className="bg-white/5 border rounded-[25px] h-fit sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[1050px] 2xl:w-[1600px] z-30 flex-col sm:pl-4 md:pl-8 lg:pl-5">
        <Trending />
        <TopCollect />
        <MarketCollect />
        <SeeAll />
      </div>
    </div>
  );
};

export default MyNFTsPage;
