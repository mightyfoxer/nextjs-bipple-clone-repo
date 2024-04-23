interface Props {
  name: string;
  image: string;
}

export default function MarketCollectName({ name ,image }: Props) {
  return (
    <div className="grid gird-strt 2 col-span-4 w-full">
      <div className="flex flex-row items-center w-full px-9">
        <img
          src={image}
          className="lg:w-6 xl:w-8 xl:h-8"
        ></img>
        <div className="w-3/4 font-sans font-thin text-white  ml-2 lg:text-[70%] xl:text-[100%]">
          {name}
        </div>
      </div>
    </div>
  );
}
