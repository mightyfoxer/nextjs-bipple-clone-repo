"use client";

import { useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";

export const BackBtn = () => {

  const router = useRouter();

  const handleClick =(e : any) => {
    router.back();
    e.preventDefault();
  };

  return (
    <div className="icon-box w-[50px] transition-all delay-100 h-[50px] flex items-center justify-center cursor-pointer hover:opacity-80 hover:animate-ping">
      <MdArrowBack onClick={handleClick} />
    </div>
  );
};
