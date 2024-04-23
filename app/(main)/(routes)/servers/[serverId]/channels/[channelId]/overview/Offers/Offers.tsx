export interface Offer {
  price: number;
  from: string;
  expires: string;
  status: number;
  floorDiff: string;
};

interface Props {
  offers: Offer[];
}

export default function Offers({ offers }: Props) {
  return (
    <div>
      <div className="flex justify-between items-center px-5 m-2 text-[15px] text-[#6D6D6D]">
        <p className="w-1/7">Price</p>
        <p className="w-2/7">From</p>
        <p className="w-2/7">Expires</p>
        <p className="w-1/7">Floor</p>
      </div>
      <div>
        {offers.map((item, index) => (
          <OfferItem key={index} offer={item} />
        ))}
      </div>
    </div>
  );
}

function OfferItem({ offer }: { offer: Offer }) {
  return (
    <div className="flex bg-[#101010F7] opacity-95 items-center justify-between p-5 border rounded-[15px] my-3">
      <div className="flex items-center justify-center w-1/7">
        <img className="w-4 h-4 mb-1" src="/images/market/Mark.svg" alt="Mark" />
        <p className="text-[18px] text-center">{offer.price}</p>
      </div>
      <div className="flex justify-left items-center w-2/7">
        <img className="w-4 h-4 border rounded-[10px] mb-1" src="/images/market/Avatar.svg" alt="Avatar" />
        <p className="text-[18px] text-center">{offer.from}</p>
      </div>
      <p className="text-[18px] text-center w-2/7">{offer.expires}</p>
      {offer.status === 0 && (
        <div className="flex items-center justify-center w-1/7 gap-1 bg-[#ffffff]  bg-opacity-5 border rounded-[30px] py-0.5 px-2">
          <img className="w-3 h-3 mb-1" src="/images/market/-.svg" alt="Avatar" />
          <p className="text-[18px] text-center">{offer.floorDiff}</p>
        </div>
      )}
      {offer.status === 1 && (
        <div className="flex justify-center items-center w-1/7 gap-1 bg-[#ffffff]  bg-opacity-5 border rounded-[30px] py-0.5 px-2">
          <img className="w-3 h-3 mb-1" src="/images/market/Arrow-up.svg" alt="increase" />
          <p className="text-[#77FF8D] text-[18px] text-center">{offer.floorDiff}</p>
        </div>
      )}
      {offer.status === 2 && (
        <div className="flex items-center justify-center w-1/7 gap-1 bg-[#ffffff]  bg-opacity-5 border rounded-[30px] py-0.5 px-2">
          <img className="w-3 h-3 mb-1" src="/images/market/Arrow-down.svg" alt="decrease" />
          <p className="text-[#FF5C5C] text-[18px] text-center">{offer.floorDiff}</p>
        </div>
      )}
    </div>
  )
}
