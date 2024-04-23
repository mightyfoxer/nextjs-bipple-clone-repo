"use client";
import NextButton from "@/app/(main)/(routes)/marketplace/pagination/marketTrending/nextButton";
import PrevButton from "@/app/(main)/(routes)/marketplace/pagination/marketTrending/prevButton";
import { useState, useRef, useEffect } from "react";
import { marketCards } from "./Cards";
import { MarketCard } from "./market-card";

// Data

const LastSold = () => {
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
    <div className="carousel my-[30px] overflow-hidden">
      <div className="w-full flex flex-row justify-between">
        <div className="font-sans text-[25px] pl-[30px]">LastSold</div>

        <div className="flex flex-row-reverse">
          <NextButton moveNext={moveNext} isDisabled={isDisabled} />
          <PrevButton movePrev={movePrev} isDisabled={isDisabled} />
        </div>
      </div>
      <div
        ref={carousel}
        className="carousel relative flex gap-16 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0 w-full ml-1 mt-8"
      >
        {marketCards.map((item, index) => (
          <div
            key={index}
            className="carousel-item text-center snap-start relative w-32 h-[328px] md:w-40 lg:w-56  xl:w-56  rounded-[25px]"
          >
            <MarketCard
              imageURL={item.imageURL}
              followers={item.followers}
              avatar={item.avatar}
              userName={item.userName}
              nameFollow={item.nameFollow}
              val={item.val}
              state={item.state}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastSold;
