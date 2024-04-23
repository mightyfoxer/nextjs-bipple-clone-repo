import properties from "./dataPropertes.json";

export default function Properties() {
  return (
    <div>
      {properties.map((resource, index) => (
        <div
          key={index}
          className="flex bg-[#101010F7] opacity-95 items-center justify-around p-5 border rounded-[15px] my-3"
        >
          <div className="w-1/4 font-mono font-thin text-white text-[18px]">
            {resource.section}
          </div>
          <div className="w-1/4 font-mono font-thin text-center text-white text-[18px]">
            {resource.color}
          </div>
          <div className="w-1/4 flex justify-end">
            <button
              type="button"
              className="items-center text-cyan-400 bg-cyan-950 hover:bg-gradient-to-br focus:bg-cyan-400 focus:text-black  focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800  font-medium rounded-[15px] h-[30px] w-[60px] text-sm  text-center focus:bg-gradient-to-br focus:from-green-400 focus:to-blue-600 text-[18px]"
            >
              {resource.percent}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
