"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper"
import Image from "next/image"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"

export default () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={5}
      slidesPerView={1}
      speed={2000}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={true}
      style={{
        "--swiper-pagination-color": "#FFBA08",
        "--swiper-pagination-bullet-inactive-color": "#999999",
        "--swiper-pagination-bullet-inactive-opacity": "1",
        "--swiper-pagination-bullet-size": "5px",
        "--swiper-pagination-bullet-horizontal-gap": "6px",
        "width" : "300px"
      }}
    >
      <SwiperSlide>
        <Image
          src={"/buddha.jpg"}
          width={300}
          height={200}
          alt="dish01"
        ></Image>
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={"/chicken.jpg"}
          width={300}
          height={200}
          alt="dish02"
        ></Image>
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={"/hamburger.jpg"}
          width={300}
          height={200}
          alt="dish03"
        ></Image>
      </SwiperSlide>
    </Swiper>
  )
}
