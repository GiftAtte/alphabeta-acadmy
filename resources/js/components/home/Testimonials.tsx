import { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'David Okonkwo',
    role: 'HSE Manager, Petrogas Ltd',
    image: '/images/img1.jpeg',
    rating: 5,
    text: 'The training I received at Alpha Beta Safety Academy was exceptional. The instructors were knowledgeable and the practical sessions were incredibly valuable. After completing my HSE Level 3 certification, I was able to implement significant safety improvements at my company.'
  },
  {
    name: 'Amina Ibrahim',
    role: 'Construction Safety Officer',
    image: '/images/img2.jpeg',
    rating: 5,
    text: 'Alpha Beta\'s fire safety training program is comprehensive and thorough. I appreciate how they blend theoretical knowledge with hands-on practice. The certification is well-recognized in the industry and has helped me advance my career significantly.'
  },
  {
    name: 'Emmanuel Adeyemi',
    role: 'Operations Manager, Marine Services',
    image: '/images/img3.jpeg',
    rating: 5,
    text: 'Having trained our entire offshore team with Alpha Beta, I can confidently say they deliver world-class safety training. The customized offshore safety program they developed for us addressed our specific needs and has resulted in zero incidents over the past year.'
  },
  {
    name: 'Grace Nwachukwu',
    role: 'Quality Assurance Director',
    image: '/images/img4.jpeg',
    rating: 4,
    text: 'The ISO 45001 implementation training I received was exceptionally well-structured. The instructors\' expertise and the detailed course materials made a complex subject accessible. I successfully led our company through certification thanks to Alpha Beta\'s training.'
  },
  {
    name: 'Michael Oladele',
    role: 'Site Safety Supervisor',
    image: '/images/img5.jpeg',
    rating: 5,
    text: 'As someone who\'s attended multiple safety courses over my 15-year career, I can say that Alpha Beta\'s training stands out for its practical approach and attention to detail. Their confined space entry course is the most comprehensive I\'ve experienced.'
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-4">
            What Our Students Say
          </h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-neutral-600">
            Discover how our training programs have helped professionals enhance their skills,
            advance their careers, and improve workplace safety.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Large quote icon */}
          <div className="absolute -top-10 -left-6 text-primary-200 opacity-50 z-0">
            <Quote size={80} strokeWidth={1} />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1 flex flex-col items-center">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary-100 shadow-md mb-4">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-primary-700 text-center">
                  {testimonials[currentIndex].name}
                </h3>
                <p className="text-neutral-500 text-sm mb-3 text-center">
                  {testimonials[currentIndex].role}
                </p>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${i < testimonials[currentIndex].rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>

              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="md:col-span-2"
              >
                <blockquote className="text-neutral-700 text-lg font-light italic mb-6 relative">
                  "{testimonials[currentIndex].text}"
                </blockquote>
              </motion.div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-primary-600' : 'bg-neutral-300 hover:bg-primary-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-primary-50 hover:bg-primary-100 text-primary-700 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-primary-50 hover:bg-primary-100 text-primary-700 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Background decorative elements */}
          <div className="absolute top-1/3 -right-6 w-12 h-12 bg-primary-200 rounded-full opacity-50"></div>
          <div className="absolute bottom-1/4 -left-10 w-20 h-20 bg-primary-200 rounded-full opacity-30"></div>
        </div>

        <div className="mt-16 text-center">
          <a
            href="/contact"
            className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-md font-medium transition-colors"
          >
            Share Your Experience
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
