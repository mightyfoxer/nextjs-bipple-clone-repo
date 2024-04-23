interface Props {
  onChange: (value: string) => void;
}

export default function ItemTab({ onChange }: Props) {
  return (
    <div className="flex flex-row mt-7">
      <button
        onClick={() => onChange("overview")}
        className="px-4 py-2 border-cyan-900 text-white  focus:border-b-4 focus:outline-none focus:border-cyan-300 dark:focus:ring-cyan-800"
      >
        Overwiew
      </button>
      <button
        onClick={() => onChange("properties")}
        className="px-4 py-2  border-cyan-900 text-white  focus:border-b-4 focus:outline-none focus:border-cyan-300 dark:focus:ring-cyan-800"
      >
        Preperties
      </button>
      <button
        onClick={() => onChange("offers")}
        className="px-4 py-2  border-cyan-900 text-white  focus:border-b-4 focus:outline-none focus:border-cyan-300 dark:focus:ring-cyan-800"
      >
        Offers
      </button>
      <button
        onClick={() => onChange("activity")}
        className="px-4 py-2 border-cyan-900 text-white  focus:border-b-4 focus:outline-none focus:border-cyan-300 dark:focus:ring-cyan-800"
      >
        Activity
      </button>
    </div>
  );
}
