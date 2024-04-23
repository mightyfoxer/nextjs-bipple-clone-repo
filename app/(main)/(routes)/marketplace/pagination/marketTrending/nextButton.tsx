interface Props{
  moveNext: () => void;
  isDisabled: (string:"next") => any;

}
export default function NextButton({moveNext,isDisabled}:Props) {
  return (
    <div>
      <button
        type="button"
        className="px-2 py-1 text-xs font-medium text-center inline-flex items-center text-white "
        disabled={isDisabled("next")}
        onClick={moveNext}
      >
        <svg
          className="h-6 w-8 text-white"
          width="20"
          height="20"
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
          <line x1="13" y1="18" x2="19" y2="12" />{" "}
          <line x1="13" y1="6" x2="19" y2="12" />
        </svg>

        <span className="sr-only">Prev</span>
      </button>
    </div>
  );
}
