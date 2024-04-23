export const NavigationMarketSidebar = async () => {
  return (
    <div className="flex items-center w-full h-full p-3 text-primary justify-between">
      <div className="invisible lg:visible lg:flex justify-start lg:gap-4 lg:ml-4">
        {dropDown.map((item, index) => (
          <select
            key={index}
            data-te-select-init
            className="cursor-pointer flex bg-white/5 justify-center items-center gap-3 border rounded-[15px] dark:border-cyan-950 p-2"
          >
            <option value="1">{item.title}</option>
          </select>
        ))}
      </div>
      <div className="w-full flex items-center cursor-pointer hover:opacity-80 lg:hidden xl:flex xl:items-center xl:w-[20%]">
        <input
          className="relative bg-[#101010F7] w-full h-[46px] p-3 pl-10 border rounded-[15px] focus:border-sky-700"
          placeholder="Search"
        />
        <img
          src="/images/market/Vector.svg"
          alt="Search"
          className="absolute ml-5 w-4 h-4"
        />
      </div>
    </div>
  );
};

const dropDown = [
  { title: "Background" },
  { title: "Body" },
  { title: "Face" },
  { title: "Hair" },
  { title: "Piercing" },
];
