import { IoInformationCircleOutline } from "react-icons/io5";
import { useState } from "react";

export interface Activity {
  seller: string;
  status: string;
  buyer: string;
  price: number;
  order: number;
  time: string;
}

interface Props {
  activities: Activity[];
}

export default function Activities({ activities }: Props) {
  return (
    <div>
      <div className="flex justify-between items-center pl-12 pr-20  m-2 text-[15px] text-[#6D6D6D]   w-full lg:w-1/2 sm:invisible md:visible">
        <p className="w-4/9 mr-6">Seller</p>
        <p className="w-1/9">Status</p>
        <p className="w-2/9">Buyer</p>
        <p className="w-1/9">Price</p>
      </div>
      {activities.map((item, index) => (
        <ActivityItem key={index} activity={item} />
      ))}
    </div>
  );
}

function ActivityItem({ activity }: { activity: Activity }) {
  const [infoIndex, setInfoIndex] = useState();
  const handleClick = (e: any) => {
    console.log(e);
    infoIndex===e.order?setInfoIndex(e):setInfoIndex(e.order);
  };

  return (
    <div className="flex gap-3 items-center">
      <div
        className="flex bg-[#101010F7] opacity-95 items-center justify-between p-6 border rounded-[15px] my-3   w-full lg:w-1/2"
      >
        <div className="flex items-center justify-center w-4/9">
          <img
            className="w-4 h-4 border rounded-[10px] mb-1"
            src="/images/market/Avatar.svg"
            alt="Avatar"
          />
          <div className="text-[18px] text-center">{activity.seller}</div>
        </div>
        {activity.status === "Sale" && (
          <div className="block w-1/9 text-[#4DE265] text-[14px] bg-[#ffffff]  bg-opacity-5 border rounded-[30px] py-0.5 px-5">
            {activity.status}
          </div>
        )}
        {activity.status === "List" && (
          <div className="block w-1/9 text-[#50FFFF] text-[14px] bg-[#ffffff]  bg-opacity-5 border rounded-[30px] py-0.5 px-5">
            {activity.status}
          </div>
        )}
        {activity.status !== "Sale" && activity.status !== "List" && (
          <div className="block text-[14px] w-1/9 bg-[#ffffff]  bg-opacity-5 border rounded-[30px] py-0.5 px-2">
            {activity.status}
          </div>
        )}
        <div className="flex items-center justify-center w-2/9">
          <img
            className="w-4 h-4 border rounded-[10px]"
            src="/images/market/Avatar.svg"
            alt="Avatar"
          />
          <div className="text-[18px] text-center">{activity.buyer}</div>
        </div>
        <div className="flex items-center justify-center w-1/9">
          <img
            className="w-4 h-4 mb-1"
            src="/images/market/Mark.svg"
            alt="Mark"
          />
          <div className="text-[18px] text-center">{activity.price}</div>
        </div>
        <button
          className="flex items-center justify-center w-1/9"
          onClick={() => handleClick(activity)}
        >
          <IoInformationCircleOutline />
        </button>
      </div>
      {infoIndex === activity.order && <div className="relative flex w-1/6 bg-[#101010F7] opacity-95 items-center gap-6 py-4 border rounded-[15px] text-[15px] text-center">
        <div className="bg-[#50FFFF] w-1 h-8 m-0 p-0" />
        {activity.time}
      </div>}
    </div>
  );
}
