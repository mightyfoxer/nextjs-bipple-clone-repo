import Values from "./Offers.json";

export default function Offers() {
  return (
    <div>
      <div className="flex justify-between items-center px-5 m-2">
        <p className="w-1/7">Price</p>
        <p className="w-2/7">From</p>
        <p className="w-2/7">Expires</p>
        <p className="w-1/7">Floor</p>
      </div>
      <div>
        {Values.Offers.map((item, index) => {
          return (
            <div key={index} className="flex bg-[#101010F7] opacity-95 items-center justify-between p-5 border rounded-[15px] my-2">
              <div className="flex items-center justify-center w-1/7">
                <img className="w-5 h-5" src="/images/market/Mark.svg" alt="Mark" />
                <p className="text-[18px] text-center">{item.Price}</p>
              </div>
              <div className="flex justify-left items-center w-2/7">
                <img className="w-5 h-5 border rounded-[10px]" src="/images/market/Avatar.svg" alt="Avatar" />
                <p className="text-[18px] text-center">{item.From}</p>
              </div>
              <p className="text-[18px] text-center w-2/7">{item.Expires}</p>
              {item.State === 0 && (
                <div className="flex items-center justify-center w-1/7 gap-1 bg-[#ffffff]  bg-opacity-5 border rounded-[30px] py-0.5 px-2">
                  <img className="w-3 h-3" src="/images/market/-.svg" alt="Avatar" />
                  <p className="text-[18px] text-center">{item["Floor difference"]}</p>
                </div>
              )}
              {item.State === 1 && (
                <div className="flex justify-center items-center w-1/7 gap-1 bg-[#ffffff]  bg-opacity-5 border rounded-[30px] py-0.5 px-2">
                  <img className="w-3 h-3" src="/images/market/Arrow-up.svg" alt="increase" />
                  <p className="text-[#77FF8D] text-[18px] text-center">{item["Floor difference"]}</p>
                </div>
              )}
              {item.State === 2 && (
                <div className="flex items-center justify-center w-1/7 gap-1 bg-[#ffffff]  bg-opacity-5 border rounded-[30px] py-0.5 px-2">
                  <img className="w-3 h-3" src="/images/market/Arrow-down.svg" alt="decrease" />
                  <p className="text-[#FF5C5C] text-[18px] text-center">{item["Floor difference"]}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
