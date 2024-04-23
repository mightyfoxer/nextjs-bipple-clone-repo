
export default function Profile(){
  return(
    <div className="sm:w-full lg:flex lg:flex-row lg:mt-5">
        <div className="lg:w-1/2 rounded-[25px] ">
          <img
            src="/images/market/community.png"
            className="w-full h-[465px] xl:w-[600px] mx-auto"
          />
        </div>
        <div className="lg:w-1/2 mt-5 px-9">
          {/* name */}
          <div className="flex flex-row items-center w-full">
            <img
              src="/images/market/TopRight.png"
              className="lg:w-6 xl:w-8"
            ></img>

            <div className="ml-1">
              <div className="w-3/4 font-mono font-thin text-white text-[100%] ">
                Claynopsaurz
              </div>
              <div className="pt-1 w-3/4 font-mono font-thin text-[#6D6D6D] text-[70%] ">
                @Claynopsaurz
              </div>
            </div>
          </div>

          <div className="flex flex-row w-full items-center">
            <div className="w-1/2 font-sans font-thin text-white pt-5 text-[250%] lg:text-[180%] xl:text-[250%] ">
              Claynopsaurz
            </div>
            <div className="bg-zinc-900 rounded-[15px] w-1/5 h-[30px] items-center ml-10 mt-8">
              <div className="w-full font-sans font-thin text-white text-center text-[100%] ">
                #2341
              </div>
            </div>
          </div>
          <hr className="mt-2 pt-0.5 w-full dark:bg-cyan-950" />

          {/* owner */}
          <div className="flex flex-row mt-4 lg:flex lg:flex-col xl:flex xl:flex-row w-full items-center">
            <div className="flex flex-row items-center w-full gap-1">
              <img
                src="/images/market/TopRight.png"
                className="w-8 h-8 mt-0.5 border-none  rounded-[20px]"
              />
              <div className="flex flex-col">
                <p className="pt-1 w-full font-mono font-thin text-[#6D6D6D] text-[80%] ">
                  Owner
                </p>
                <p className="w-full font-mono font-thin text-white text-[100%] ">
                  Andrew Jackson
                </p>
              </div>
            </div>

            <div className="flex flex-row items-center w-full gap-1">
              <img
                src="/images/market/Avatar.svg"
                className="w-8 h-8 mt-0.5 border-none rounded-[25px] "
              />
              <div className="flex flex-col">
                <p className="pt-1 w-full font-mono font-thin text-[#6D6D6D] text-[80%] ">
                  Owner
                </p>
                <p className="w-full font-mono font-thin text-white text-[100%] ">
                  Andrew Jackson
                </p>
              </div>
            </div>
          </div>
          {/* price */}
          <div className="bg-zinc-900 mt-5 rounded-[15px] w-full p-10">
            <div className="pt-1 w-3/4 font-mono font-thin text-[#6D6D6D] text-[100%] ">
              Price
            </div>

            <div className="flex flex:row lg:flex lg:flex-col xl:flex xl:flex-row w-full font-mono font-thin m-5 items-center">
              <div className="flex flex-row w-1/2 items-center">
                <img
                  className="w-[35px] h-[35px] mb-1"
                  src="/images/market/Mark.svg"
                />
                <div className="w-1/4 ml-3 font-thin text-white text-[170%] ">
                  225.31
                </div>
              </div>
              <div className="w-1/2 flex flex-row-reverse items-center">
                <div className="w-1/5 font-mono font-thin text-[#6D6D6D] text-[100%] ">
                  155
                </div>
                <img
                  className="w-4 h-4 border rounded-[10px]"
                  src="/images/market/Mark-gr.svg"
                  alt="Mark"
                />
                <div className="pr-1 w-3/4 font-mono font-thin text-right text-[#6D6D6D] text-[100%] ">
                  Floor price
                </div>
              </div>
            </div>
          </div>
        {/* button */}
          <div className="flex flex-row w-full justify-between xl:justify-around items-center mt-5">
            <button className="w-4/5 xl:[430px] h-[50px] text-black bg-gradient-to-r bg-cyan-400 items-center hover:bg-blue-500 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-[30px] text-center rounded-[20px]">
              Buy now
            </button>
            <button type="button">
              <img
                className="w-[55px] h-[55px] p-[10px] border border-none rounded-[17px] bg-[#ffffff] bg-opacity-5 border-0 hover:bg-blue-700 hover:text-white text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500"
                src="/images/market/hammer-wh.svg"
                alt="Mark"
              />
            </button>
          </div>
        </div>
      </div>
  )
}