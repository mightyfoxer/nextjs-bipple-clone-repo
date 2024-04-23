export default function TopCollect() {
  return (
    <div className="sm:max-w-[100%] md:max-w-[100%] lg:max-w-[100%]  xl:max-w-[100%] flex flex-row mt-10 pr-5">
      <div className="font-sans text-xl w-1/2">Top Collections</div>
      <div className=" flex flex-row-reverse w-1/2">
        <button
          id="states-button"
          data-dropdown-toggle="dropdown-states"
          className="h-8 flex-shrink-0 z-10 inline-flex justify-between items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-zinc-900 border border-white/5 rounded-lg hover:bg-white/5 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-white/5 dark:hover:bg-white/5 dark:focus:ring-gray-700 dark:text-white dark:border-white/5"
          type="button"
        >
          <svg
            className="h-4 w-5 text-indigo-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <div className="font-sans font-thin text-white w-1/2 text-[100%]">
            Last30days
          </div>
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
