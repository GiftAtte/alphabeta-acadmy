import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import VerifyModal from './VerifyModal';

const slides = [
  {
    image: "/images/img1.jpg",
    title: "World-Class Safety Training Institute",
    description: "Delivering globally recognized safety certifications with modern, interactive training for the oil & gas, construction, and manufacturing industries."
  },
  {
    image: "/images/img2.jpg",
    title: "Accredited by National & International Bodies",
    description: "Certified by ISPON, OSHAssociation UK, Chartered Institute of Marine, and more. Our credentials speak safety and quality."
  },
  {
    image: "/images/bgImg2.jpg",
    title: "Specialized Health & Safety Courses",
    description: "From Firefighting and First Aid to Oil Field Rigging and Scaffolding – we train onshore and offshore professionals for safe environments."
  },
  {
    image: "/images/img1.jpg",
    title: "Hands-On Learning with Expert Instructors",
    description: "We focus on real-world skills, simulations, and practical training delivered by industry-leading professionals."
  }
];

const NavigationButtons = () => {
  return (
    <div className="absolute bottom-10 left-0 right-0 z-10 flex justify-center gap-4">
      <button
        id="prev-slide"
        className="bg-white/20 hover:bg-white/30 text-white w-12 h-12 rounded-full transition-colors grid place-items-center cursor-pointer border border-white/30"
      >
        <ChevronLeft className="h-6 w-6"/>
      </button>
      <button
        id="next-slide"
        className="bg-white/20 hover:bg-white/30 text-white w-12 h-12 rounded-full transition-colors grid place-items-center cursor-pointer border border-white/30"
      >
        <ChevronRight className="h-6 w-6"/>
      </button>
    </div>
  );
};

const Carousel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative h-[80vh] w-full">
      <div className="absolute inset-0 w-full">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: '#prev-slide',
            nextEl: '#next-slide',
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.5)), url('${slide.image}')`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10">
                  <div className="text-center text-white max-w-4xl w-full mx-auto">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                      {slide.title}
                    </h2>
                    <p className="text-lg text-neutral-100 max-w-2xl mx-auto mb-8">
                      {slide.description}
                    </p>
                    <div className="flex items-center gap-4 justify-center mt-6 flex-col sm:flex-row">
                      <Link href='courses'>
                        <Button size="lg" className="text-lg cursor-pointer h-14 px-8 bg-secondary-600 hover:bg-secondary-700 transition-colors">
                          Explore Courses
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="lg"
                        className="text-lg cursor-pointer h-14 px-8 bg-transparent border-white text-white hover:bg-white/10 flex items-center"
                        onClick={() => setIsModalOpen(true)}
                      >
                        <Award className="mr-2 h-5 w-5" />
                        Verify Certificate
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <NavigationButtons />
        </Swiper>
      </div>

      <VerifyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Carousel;
