import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Award, ShieldCheck, GraduationCap } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const stats = [
  {
    icon: <GraduationCap className="w-10 h-10 text-primary-500" />,
    title: 'Certified Graduates',
    value: 5000,
    suffix: '+',
    description: 'Safety professionals trained and certified'
  },
  {
    icon: <Award className="w-10 h-10 text-primary-500" />,
    title: 'Accreditations',
    value: 12,
    suffix: '',
    description: 'National and international accrediting bodies'
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-primary-500" />,
    title: 'Course Offerings',
    value: 30,
    suffix: '+',
    description: 'Specialized safety training programs'
  },
  {
    icon: <Users className="w-10 h-10 text-primary-500" />,
    title: 'Industry Partners',
    value: 85,
    suffix: '+',
    description: 'Corporate clients across diverse industries'
  }
];

const Stats = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 bg-primary-50 border-y border-primary-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-4">
            Our Impact in Numbers
          </h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-neutral-600">
            For over a decade, Alpha Beta Safety Academy has been setting the standard for safety
            training excellence across Nigeria and beyond.
          </p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow border border-neutral-100 flex flex-col items-center text-center"
            >
              <div className="bg-primary-50 p-4 rounded-full mb-6">
                {stat.icon}
              </div>
              <h3 className="text-lg font-semibold text-neutral-600 mb-2">{stat.title}</h3>
              <div className="flex items-baseline justify-center">
                <span className="text-4xl font-bold text-primary-700">
                  {inView ? (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      separator=","
                    />
                  ) : (
                    0
                  )}
                </span>
                <span className="text-4xl font-bold text-primary-700">{stat.suffix}</span>
              </div>
              <p className="text-neutral-500 mt-2 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Our success is measured by the achievements of our graduates and their contributions to creating
            safer workplaces across various industries. Join us to be part of this impactful journey.
          </p>
          <div className="mt-8">
            <a
              href="/about"
              className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium"
            >
              Learn more about our achievements
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
