"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper"
import Image from "next/image"

import "swiper/css"
import "swiper/css/pagination"

export default () => {
  return (
    <Swiper
    className="rounded-3xl object-none"
      modules={[Autoplay, Pagination]}
      spaceBetween={5}
      slidesPerView={1}
      speed={3000}
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
        "width" : "400px"
      }}
    >
      <SwiperSlide>
        <Image
          src={"/buddha.jpg"}
          width={400}
          height={267}
          alt={"dish01"}
          priority={true}
        ></Image>
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={"/chicken.jpg"}
          width={400}
          height={267}
          alt={"dish02"}
          priority={true}
        ></Image>
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={"/hamburger.jpg"}
          width={400}
          height={267}
          alt={"dish03"}
          priority={true}
        ></Image>
      </SwiperSlide>
    </Swiper>
  )
}
