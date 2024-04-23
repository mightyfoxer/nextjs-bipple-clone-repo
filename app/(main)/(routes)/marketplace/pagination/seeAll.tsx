export default function SeeAll() {
  return (
    <div className="flex flex-row-reverse w-[98%] pt-3 pb-5">
      <div>
        <svg
          className="h-6 w-6 text-cyan-300 font-thin"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          {" "}
          <path stroke="none" d="M0 0h24v24H0z" />{" "}
          <line x1="5" y1="12" x2="19" y2="12" />{" "}
          <line x1="15" y1="16" x2="19" y2="12" />{" "}
          <line x1="15" y1="8" x2="19" y2="12" />
        </svg>
      </div>
      <div className="ml-5 font-mono font-light text-cyan-300 text-[100%]">
        See All
      </div>
    </div>
  );
}
