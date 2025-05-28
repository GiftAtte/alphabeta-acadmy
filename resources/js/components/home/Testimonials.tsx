import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Johnson Adebayo',
    position: 'HSE Manager at Lagos Oil & Gas',
    quote: 'The training I received at Alpha Beta Safety Academy has been instrumental in my career growth. The practical approach and global certifications have opened doors to international opportunities.',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 2,
    name: 'Amina Kareem',
    position: 'EHS Consultant',
    quote: 'What sets Alpha Beta apart is their commitment to staying current with industry standards. Their training methods are innovative and the instructors are top-notch professionals with real-world experience.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 3,
    name: 'Samuel Okonkwo',
    position: 'Safety Director, Manufacturing Sector',
    quote: 'The globally recognized certification I earned has significantly improved safety practices at our facility. My team now looks to me for guidance based on the comprehensive knowledge I gained.',
    image: 'https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <section className="py-16 bg-primary relative overflow-hidden mt-16">
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <Quote className="text-white w-48 h-48 absolute -top-10 -left-10 transform rotate-180" />
        <Quote className="text-white w-48 h-48 absolute -bottom-10 -right-10" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            What Our <span className="text-secondary-600">Students</span> Say
          </h2>
          <p className="text-neutral-300 max-w-2xl mx-auto">
            We take pride in the success of our graduates and their impact in promoting safety standards across industries.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-xl p-8 md:p-10"
            >
              <div className="flex flex-col md:flex-row items-center">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-secondary-600">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div>
                  <Quote className="text-secondary-600 h-10 w-10 mb-4" />
                  <p className="text-neutral-700 text-lg mb-6 italic">
                    {testimonials[currentIndex].quote}
                  </p>
                  <div>
                    <h4 className="text-primary-900 font-heading font-semibold text-xl">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-neutral-600">
                      {testimonials[currentIndex].position}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={handlePrev}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-primary-900 p-2 rounded-full transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-primary-900 p-2 rounded-full transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
