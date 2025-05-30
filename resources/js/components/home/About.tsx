import { motion } from 'framer-motion';
import { CheckCircle, Users, Award, Clock, Globe, BookOpen } from 'lucide-react';
import { Link } from '@inertiajs/react';

const About = () => {
  const features = [
    {
      icon: <Users className="h-6 w-6 text-primary-600" />,
      title: 'Expert Instructors',
      description: 'Learn from certified professionals with extensive industry experience'
    },
    {
      icon: <Award className="h-6 w-6 text-primary-600" />,
      title: 'Accredited Programs',
      description: 'Internationally recognized certifications to enhance your career'
    },
    {
      icon: <Clock className="h-6 w-6 text-primary-600" />,
      title: 'Flexible Schedules',
      description: 'Training options that fit your busy professional calendar'
    },
    {
      icon: <Globe className="h-6 w-6 text-primary-600" />,
      title: 'Global Standards',
      description: 'Training that meets international safety standards and best practices'
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-primary-600" />,
      title: 'Practical Training',
      description: 'Hands-on exercises that prepare you for real-world scenarios'
    },
    {
      icon: <BookOpen className="h-6 w-6 text-primary-600" />,
      title: 'Comprehensive Resources',
      description: 'Access to detailed learning materials and reference guides'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary-100 rounded-full opacity-70"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary-100 rounded-full opacity-70"></div>

              <div className="relative z-10 grid grid-cols-2 gap-4">
                <div className="aspect-[4/3] overflow-hidden rounded-lg">
                  <img
                    src="/images/img10.jpeg"
                    alt="Safety training"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] overflow-hidden rounded-lg mt-8">
                  <img
                    src="/images/img11.jpeg"
                    alt="Practical session"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] overflow-hidden rounded-lg">
                  <img
                    src="/images/img12.jpeg"
                    alt="Certification ceremony"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] overflow-hidden rounded-lg mt-8">
                  <img
                    src="/images/img13.jpeg"
                    alt="Safety equipment"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="absolute -z-10 inset-0 bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg transform rotate-3"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-6">
              World-Class Safety Training Academy
            </h2>

            <div className="w-20 h-1 bg-primary-500 mb-6"></div>

            <p className="text-neutral-600 mb-8">
              Alpha Beta Safety Academy is a premier safety training institution dedicated to empowering
              individuals and organizations with essential safety knowledge and skills. With a focus on
              quality education, practical training, and industry-recognized certifications, we prepare
              professionals for success in the oil & gas, construction, and manufacturing industries.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="bg-primary-50 p-2 rounded-md mt-0.5">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-700">{feature.title}</h3>
                    <p className="text-sm text-neutral-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/about"
                className="bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-md font-medium transition-colors text-center"
              >
                Learn More About Us
              </Link>
              <Link
                href="/courses"
                className="border border-primary-600 text-primary-600 hover:bg-primary-50 py-3 px-6 rounded-md font-medium transition-colors text-center"
              >
                Explore Our Courses
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
