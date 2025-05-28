import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from '@inertiajs/react';

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
        className="bg-primary-50 text-primary-700 w-9 h-9  rounded-md transition-colors grid place-items-center cursor-pointer"
      >
        <ChevronLeft/>
      </button>
      <button
        id="next-slide"
        className="bg-primary-50 text-primary-700 w-9 h-9  rounded-md transition-colors grid place-items-center cursor-pointer"
      >
        <ChevronRight/>
      </button>
    </div>
  );
};

const Carousel = () => {
  return (
    <section className="relative h-screen">
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
        className="h-full"
      >
        {slides.map((slide, index) => (
         <SwiperSlide key={index}>
  <div className="relative h-full">
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.6)), url('${slide.image}')`,
      }}
    />
    <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="text-center text-white max-w-4xl w-full mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          {slide.title}
        </h2>
        <p className="text-base text-neutral-200 max-w-2xl mx-auto">
          {slide.description}
        </p>
        <div className="flex items-center gap-2 lg:gap-4 justify-center mt-5  flex-col sm:flex-row ">
          <Link href='courses'>
          <Button  className="text-lg cursor-pointer h-12 w-full">
            Explore Course
          </Button>
          </Link>
        <Link href='certifications'>
          <Button
            variant="ghost"
            className="bg-black/50 text-lg cursor-pointer h-12 w-full"
            
          >
            Verify Certificate
          </Button>
        </Link>
        </div>
      </div>
    </div>
  </div>
</SwiperSlide>

        ))}
        <NavigationButtons />
      </Swiper>
    </section>
  );
};

export default Carousel;