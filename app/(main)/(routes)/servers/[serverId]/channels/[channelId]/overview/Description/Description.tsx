interface Props {
  description: React.ReactNode;
}

export default function Description({ description }: Props) {
  return (
    <div className="mt-5 w-1/2">
      <div className="w-full font-mono font-thin text-white text-[150%]">
        Description
      </div>
      <div className="w-full font-TT Firs Neue text-white text-[15px] ">
        {description}
      </div>
    </div>
  );
}
