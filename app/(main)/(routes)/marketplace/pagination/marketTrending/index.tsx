import { useState, useRef, useEffect } from "react";

// Data
import data from "./data.json";
import NextButton from "./nextButton";
import PrevButton from "./prevButton";

const Trending = () => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef<any>(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 0.3);
    }
  };

  const moveNext = () => {
    if (carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current) {
      setCurrentIndex((prevState) => prevState + 0.3);
    }
  };

  const isDisabled = (direction: any) => {
    if (direction === "prev") {
      return currentIndex <= 0;
    }

    if (direction === "next" && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <div className="carousel my-12  sm:max-w-[95%] md:max-w-[95%] lg:max-w-[98%]  xl:max-w-[98%]">
      <div className="relative overflow-hidden">
        <div className="w-full flex flex-row">
          <div className="font-sans text-xl w-1/2">Trending</div>

          <div className="flex flex-row-reverse w-1/2">
            <NextButton moveNext={moveNext} isDisabled={isDisabled} />
            <PrevButton movePrev={movePrev} isDisabled={isDisabled} />
          </div>
        </div>
        <div
          ref={carousel}
          className="carousel relative flex gap-5 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0 w-full mt-8"
        >
          {data.map((resource, index) => (
            <div
              key={index}
              className="carousel-item text-center snap-start relative w-32 h-32 md:w-40 md:h-40 lg:w-56 lg:h-56 xl:w-56 xl:h-56 bg-white/5 rounded-[25px]"
            >
              <div className="h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0">
                <img
                  src={resource.imageUrl || ""}
                  alt=" "
                  className="w-full aspect-square"
                />
                <div className="absolute flex flex-row w-full bottom-2 ml-5 items-center">
                  <img
                    src={resource.imageL}
                    className="hidden lg:block w-6"
                  ></img>
                  <div className="hidden md:block ml-5  font-sans  font-thin  text-white  w-1/2 md:text-[50%] md: lg:text-[80%]  xl:text-[100%]">
                    Claynosaurz
                  </div>
                  <div className="hidden xl:block  xl:w-1/2">
                    <img src={resource.imageR} className="w-1/4 ml-1 "></img>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;
