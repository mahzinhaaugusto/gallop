import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper";
import image1 from "../Assets/Images/bella.png";
import image2 from "../Assets/Images/flash.png";
import image3 from "../Assets/Images/titan.png";
import image4 from "../Assets/Images/rosie.png";

export function CarouselMain() {
  return (
    <div className="carouselMain">
      <Swiper
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        modules={[EffectCreative]}
        className="mySwiper"
      >
        <SwiperSlide><img alt="Horse 1" src={image1} /></SwiperSlide>
        <SwiperSlide><img alt="Horse 2" src={image2} /></SwiperSlide>
        <SwiperSlide><img alt="Horse 3" src={image3} /></SwiperSlide>
        <SwiperSlide><img alt="Horse 4" src={image4} /></SwiperSlide>
      </Swiper>
    </div>
  );
}
