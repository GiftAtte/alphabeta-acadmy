import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { BookOpen, Award, MessageCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center bg-primary" >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "linear-gradient(rgba(10, 36, 99, 0.85), rgba(10, 36, 99, 0.85)), url('https://images.pexels.com/phohrefs/8851636/pexels-phohref-8851636.jpeg?auhref=compress&cs=tinysrgb&w=1920')",
        }}
      />

      <div className="container mx-auhref px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6"
          >
            Empowering Safety. <br />
            <span className="text-secondary-600">Enabling Excellence.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-100 mb-8"
          >
            ALPHA BETA SAFETY ACADEMY is a world-class safety training institute with globally recognized certifications and diverse training programs tailored href modern industry needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/courses"
              className="flex items-center bg-secondary-600 hover:bg-secondary-700 text-white py-3 px-6 rounded-md transition-colors font-medium"
            >
              <BookOpen size={20} className="mr-2" />
              View Courses
            </Link>
            <Link
              href="/certifications"
              className="flex items-center bg-transparent hover:bg-white hover:bg-opacity-10 text-white py-3 px-6 rounded-md border-2 border-white transition-colors font-medium"
            >
              <Award size={20} className="mr-2" />
              Get Certified
            </Link>
            <Link
              href="/contact"
              className="flex items-center bg-white text-primary-900 hover:bg-neutral-100 py-3 px-6 rounded-md transition-colors font-medium"
            >
              <MessageCircle size={20} className="mr-2" />
              Contact Us
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;