interface Props {
  movePrev: () => void;
  isDisabled: (string: "prev") => any;
}
export default function PrevButton({ movePrev, isDisabled }: Props) {
  return (
    <div>
      <button
        type="button"
        className="px-2 py-1 text-xs font-medium text-center inline-flex items-center text-white "
        disabled={isDisabled("prev")}
        onClick={movePrev}
      >
        <svg
          className="h-6 w-8 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          {" "}
          <line x1="19" y1="12" x2="5" y2="12" />{" "}
          <polyline points="12 19 5 12 12 5" />
        </svg>
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
}
