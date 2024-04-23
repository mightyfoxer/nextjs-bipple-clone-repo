interface Props{
  price: string
}
export default function MarketCollectPrice({price}:Props) {
  return (
    <div className="grid gird-start-8 col-span-2 w-full">
      <div className="flex flex-row w-full h-5">
        <div className=" pt-2.5 w-1/12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 7 6"
            fill="none"
          >
            <path
              d="M5.28918 1.2584H0L1.33813 0H6.62731L5.28918 1.2584ZM5.28918 5.17676H0L1.33813 3.91898H6.62731M1.33813 3.21758H6.62731L5.28918 1.95918H0"
              fill="#50FFFF"
            />
          </svg>
        </div>
        <div className="w-4/5">
          <div className="font-sans font-thin text-white text-[120%] ml-1">
            {price}
          </div>
        </div>
      </div>

      <div className="w-full font-sans font-thin text-gray-500 text-[70%]">
        Floor price
      </div>
    </div>
  );
}
