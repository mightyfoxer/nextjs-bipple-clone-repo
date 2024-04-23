"use client";
import Image from "next/image";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
interface MarketCardProps {
  imageURL: string;
  followers: string;
  avatar: string;
  userName: string;
  nameFollow: string;
  val: number;
  state: number;
}

export const MarketCard = ({
  imageURL,
  followers,
  avatar,
  userName,
  nameFollow,
  val,
  state,
}: MarketCardProps) => {
  const { onOpen } = useModal();
  const router = useRouter();
  const pathName = usePathname();
  const handleClick = (e: any) => {
    console.log(router);
    router.push(`${pathName}/overview`);
  };

  const handleBuyCard = (e: any) => {
    onOpen("buyCard");
  };

  return (
    <div className="w-full h-[328px] p-2 border rounded-[30px] bg-opacity-5 hover:bg-opacity-0 bg-[#ffffff] hover:w-[120%] hover:p-0">
      {state === 1 && (
        <img
          src={imageURL}
          alt=""
          className="w-full h-[205px] border rounded-[30px] cursor-pointer"
          onClick={handleClick}
        />
      )}
      {state !== 1 && (
        <img
          src={imageURL}
          alt=""
          className="h-[160px] w-full border rounded-[30px] cursor-pointer"
          onClick={handleClick}
        />
      )}
      <div className="flex flex-col mx-1">
        <div className="flex justify-between items-center my-1 gap-2 sm:text-[40%] ">
          <p className="text-[20px]">{userName}</p>
          <div className="xl:visible md:invisible sm:invisible bg-[#ffffff] rounded-full w-fit px-2 bg-gray-950 text-[13px] text-center">
            {followers}
          </div>
        </div>
        <p className="text-stone-500 text-[16px]">{nameFollow}</p>
      </div>
      <div className="flex flex-row gap-2 ml-4">
        <Image src={avatar} alt="" width={16} height={16} />
        <p className="text-[20px]">{val}</p>
      </div>
      {state === 0 && (
        <div className="flex items-center bg-zinc-700 justify-between w-auto border rounded-[10px] m-2">
          <Image
            src="/images/market/Mark-gr.svg"
            alt=""
            width={16}
            height={16}
            className="relative ml-2"
          />
          <p className="text-[20px]">85</p>
          <p className="text-stone-500 text-[12px]">Floor-155 SOL</p>
          <div className="flex items-center justify-center">
            <Image
              src="/images/market/Rectangle .svg"
              alt=""
              width={40}
              height={40}
              className="relative"
            />
            <Image
              src="/images/market/hammer.svg"
              alt=""
              width={20}
              height={20}
              className="absolute"
            />
          </div>
        </div>
      )}
      {state === 2 && (
        <div className="flex items-center justify-between my-2">
          <button
            className="animate-bounce bg-cyan-400 md:px-[10px] lg:px-[20px] sm:px-0 border rounded-[10px] text-zinc-950 sm:text[8px] text-[20px] py-1 hover:bg-green-600 hover:text-white hover:border-none"
            onClick={handleBuyCard}
          >
            Buy now
          </button>
          <div className="flex items-center justify-center">
            <Image
              src="/images/market/Rectangle-wh.svg"
              alt=""
              width={40}
              height={40}
              className="relative"
            />
            <Image
              src="/images/market/hammer-wh.svg"
              alt=""
              width={20}
              height={20}
              className="absolute"
            />
          </div>
        </div>
      )}
    </div>
  );
};
