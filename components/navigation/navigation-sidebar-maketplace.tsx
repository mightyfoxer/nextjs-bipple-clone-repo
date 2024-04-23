"use client";
import { useState } from "react";

export const NavigationMarketPlaceSidebar = () => {
  const [value, setValue] = useState('');
  
  return (
    <div className="cursor-pointer hover:opacity-80 flex items-center justify-center p-3 text-primary ">
      <input
        className="relative bg-[#101010F7] w-[1000px]  2xl:w-full p-3 pl-10 border rounded-[15px] focus:border-sky-700 text-center"
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {!value && (
        <img
          src="/images/market/Vector.svg"
          alt="Search"
          className="absolute w-4 h-4 mr-[60px] cursor-pointer"
        />
      )}
    </div>
  );
};
