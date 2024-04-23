import Image from "next/image";

interface CommunityCardProps {
  imageURL: string;
  followers: number;
  avatar: string;
  userName: string;
}

export const MarketCard = ({
  imageURL,
  followers,
  avatar,
  userName,
}: CommunityCardProps) => {
  return (
    <div className="relative w-[200px] h-[200px]">
      <Image
        src={imageURL}
        alt=""
        fill
        objectFit="contain"
        className="absolute"
      />

      <div className="flex flex-row justify-between absolute bottom-1 w-full">
        <div className="flex flex-row gap-2 ml-4">
          <Image src={avatar} alt="" width={26} height={26} />
          {userName}
        </div>
        <div className="mr-6">
          <Image
            src="/images/home/community-arrow-icon.svg"
            alt=""
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
  );
};
