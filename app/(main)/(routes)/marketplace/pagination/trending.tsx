import { useState, useRef, useEffect } from "react";

// Data
import data from "./data.json";

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
    if (
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
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
      carousel.current.scrollLeft =
        carousel.current.offsetWidth* currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <div className="carousel my-12 mx-auto sm:max-w-[400px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px] 2xl:max-w-[1550px]">
      <div className="relative overflow-hidden">
        <div className="w-full flex flex-row">
          <div className="font-sans text-xl w-1/2">Trending</div>

          <div className="flex flex-row-reverse w-1/2">
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
          </div>
        </div>
        <div
          ref={carousel}
          className="carousel relative flex gap-10 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0 w-full"
        >
          {data.resources.map((resource, index) => {
            return (
              <div
                key={index}
                className="carousel-item text-center snap-start relative w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-52 xl:h-52 bg-white/5 rounded-[25px]"
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Trending;
