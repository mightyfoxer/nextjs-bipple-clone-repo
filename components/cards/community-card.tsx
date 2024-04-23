import Image from "next/image";

interface CommunityCardProps {
  imageURL: string;
  followers: number;
  avatar: string;
  userName: string;
}

export const CommunityCard = ({
  imageURL,
  followers,
  avatar,
  userName
}: CommunityCardProps) => {
  return (
    <div className="relative w-[220px] h-[236px] bg-opacity-5  hover:bg-opacity-0 bg-[#ffffff] hover:animate-bounce hover:p-0 rounded-[25px]">
      <Image
        src={imageURL}
        alt=""
        fill
        objectFit="contain"
        className="absolute border rounded-[30px]"
      />
      <div className="flex flex-row absolute bg-[#6D6D6D] rounded-full w-fit mt-6 ml-4 px-2 py-1 gap-1 bg-opacity-40 text-sm">
        <Image
          src="/images/home/person-icon.svg"
          alt=""
          width={16}
          height={14}
        />
        {followers}
      </div>
      <div className="flex flex-row justify-between absolute bottom-6 w-full">
        <div className="flex flex-row gap-2 ml-4">
          <Image
            src={avatar}
            alt=""
            width={26}
            height={26}
          />
          {userName}
        </div>
        <div className="mr-6">
          <Image
            src='/images/home/community-arrow-icon.svg'
            alt=""
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
  );
};
