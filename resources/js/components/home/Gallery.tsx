'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const images = [
    '/images/img1.jpeg',
    '/images/img2.jpeg',
    '/images/img3.jpeg',
    '/images/img4.jpeg',
    '/images/img5.jpeg',
    '/images/img6.jpeg',
    '/images/img7.jpeg',
    '/images/img8.jpeg',
    '/images/img10.jpeg',
    '/images/img11.jpeg',
    '/images/img12.jpeg',
    '/images/img13.jpeg',
    '/images/img14.jpeg',
    '/images/img15.jpeg',
    '/images/img16.jpeg',
    '/images/img17.jpeg',
    '/images/img18.jpeg',
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
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
