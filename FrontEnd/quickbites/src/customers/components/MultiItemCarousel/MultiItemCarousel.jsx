import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import CarouselItem from "./CarouselItem";
import { topMeels } from "../../../Data/topMeels";
import { Autoplay } from "swiper/modules";

const MultipleItemsCarousel = () => {
  return (
    <div>
      <Swiper
        spaceBetween={20}
        slidesPerView={5}
        breakpoints={{
          1024: { slidesPerView: 5 },
          900: { slidesPerView: 3 },
          600: { slidesPerView: 2 },
          480: { slidesPerView: 1 },
        }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        modules={[Autoplay]}
      >
        {topMeels.map((item, index) => (
          <SwiperSlide key={index}>
            <CarouselItem image={item.image} title={item.title} />
          </SwiperSlide>
        ))} 
      </Swiper>
    </div>
  );
};

export default MultipleItemsCarousel;
