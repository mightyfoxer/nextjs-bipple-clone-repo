import dataCollect1 from "./dataCollect.json";
import dataCollect2 from "./dataCollect2.json";
import MarketCollectName from "./marketCollectName";
import MarketCollectPrice from "./marketCollectPrice";
import MarketCollectVolume from "./marketCollectVolum";
export default function MarketCollect() {
  return (
    <div className="bg-zinc-900 mt-5 rounded-[25px] z-30 lg:flex lg:flex-row lg:gap-4 sm:max-w-[95%] md:max-w-[95%] lg:max-w-[98%]  xl:max-w-[98%]">
      <div className="pt-10  pb-5 lg:w-1/2 md:w-full">
        <div>
          {dataCollect1.map((resource, index) => (
            <div
              key={index}
              className="grid grid-cols-9 gap-3 items-center w-full h-[36px] mb-5"
            >
              <div className="grid grid-start-1 col-span-1 font-sans w-1/5 font-thin text-white text-[100%] px-9">
                {resource.id}
              </div>
              <MarketCollectName name={resource.name} image={resource.imageUrl}/>
              <MarketCollectVolume volume={resource.volume} />
              <MarketCollectPrice price={resource.price} />
            </div>
          ))}
        </div>
      </div>
      <div className="hidden lg:block inline-block lg:h-[280px] lg:min-h-[4em] mt-8 w-0.5 self-stretch bg-cyan-950 opacity-100 dark:opacity-50"></div>
      <div className="pt-10 lg:w-1/2 md:w-full">
        <div>
          {dataCollect2.map((resource, index) => (
            <div
              key={index}
              className="grid grid-cols-9 gap-3 items-center w-full  mb-5 h-[36px]"
            >
              <div className="grid grid-start-1 col-span-1 font-sans w-1/5 font-thin text-white text-[100%] px-9">
                {resource.id}
              </div>
              <MarketCollectName name={resource.name} image={resource.imageUrl} />
              <MarketCollectVolume volume={resource.volume} />
              <MarketCollectPrice price={resource.price} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
