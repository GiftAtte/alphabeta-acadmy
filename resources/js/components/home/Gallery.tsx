'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const images = [
    '/images/img/img1.jpg',
    '/images/img/img2.jpg',
    '/images/img/img3.jpg',
    '/images/img/img4.jpg',
    '/images/img/img5.jpg',
    '/images/img/img6.jpg',
    '/images/img/img7.jpg',
    '/images/img/img8.jpg',
    '/images/img/img9.jpg',
    '/images/img/img10.jpg',
    '/images/img/img11.jpg',
    '/images/img/img12.jpg',
    '/images/img/img13.jpg',
    '/images/img/img14.jpg',
    '/images/img/img15.jpg',
    '/images/img/img16.jpg',
    '/images/img/img17.jpg',
]

export default function SlideOpacity() {
    return (
        <div className="container mx-auto mt-8">
            <div className="flex flex-col text-center w-full mb-10">
                <h2 className="text-slate-900 text-3xl font-bold mb-6">
                    Gallery
                </h2>
            </div>

            <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                autoplay={{ delay: 1000, disableOnInteraction: false }}
                loop={true}
                spaceBetween={16}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 5 },
                }}
                className="!px-2"
            >
                {images.map((src, index) => (
                    <SwiperSlide key={index}>
                        <div className="overflow-hidden rounded-xl shadow-md">
                            <img
                                src={src}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-64 object-cover"
                                loading="lazy"
                                width="400"
                                height="256"
                                decoding="async"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
