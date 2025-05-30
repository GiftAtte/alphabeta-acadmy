import { HardHat, Flame, Briefcase, Shield, Award, BookOpen, Users, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Industrial Safety',
    description: 'Comprehensive safety programs tailored for manufacturing and industrial environments to reduce workplace hazards.',
    icon: <HardHat className="w-10 h-10 text-primary-500" />,
    link: '#',
  },
  {
    title: 'Fire Safety',
    description: 'Fire prevention, protection, and emergency response training to minimize fire risks and improve response times.',
    icon: <Flame className="w-10 h-10 text-secondary-500" />,
    link: '#',
  },
  {
    title: 'Occupational Health',
    description: 'Programs designed to identify, evaluate and control workplace factors that may affect employee health and wellbeing.',
    icon: <HeartPulse className="w-10 h-10 text-primary-500" />,
    link: '#',
  },
  {
    title: 'Environmental Safety',
    description: 'Training on environmental compliance, hazardous waste management, and sustainable workplace practices.',
    icon: <Shield className="w-10 h-10 text-secondary-500" />,
    link: '#',
  },
  {
    title: 'Professional Certification',
    description: 'Internationally recognized safety certifications that enhance your professional credentials and career prospects.',
    icon: <Award className="w-10 h-10 text-primary-500" />,
    link: '#',
  },
  {
    title: 'Custom Training Solutions',
    description: 'Tailored training programs developed specifically for your organization\'s unique needs and industry requirements.',
    icon: <BookOpen className="w-10 h-10 text-secondary-500" />,
    link: '#',
  },
  {
    title: 'Corporate Training',
    description: 'On-site corporate safety training that minimizes downtime while maximizing employee safety knowledge.',
    icon: <Briefcase className="w-10 h-10 text-primary-500" />,
    link: '#',
  },
  {
    title: 'Safety Consulting',
    description: 'Expert consultation on safety management systems, risk assessment, and regulatory compliance.',
    icon: <Users className="w-10 h-10 text-secondary-500" />,
    link: '#',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const OurServices = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Our Training Services</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-secondary-700 mx-auto mb-6 animate-pulse-slow"></div>
          <p className="text-neutral-600 text-lg">
            Alpha Beta Safety Academy offers a comprehensive range of safety training services
            designed to meet the diverse needs of industries and professionals worldwide.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 group hover:-translate-y-1 border border-neutral-100 relative overflow-hidden hover-glow"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <motion.div
                whileHover={{ rotate: [0, 5, -5, 0], transition: { duration: 0.5 } }}
                className="mb-4 bg-neutral-50 w-16 h-16 rounded-lg flex items-center justify-center group-hover:bg-white transition-colors z-10"
              >
                {service.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-primary-700 mb-3">{service.title}</h3>
              <p className="text-neutral-600 mb-4">{service.description}</p>
              <a
                href={service.link}
                className="inline-block text-primary-600 font-medium hover:text-secondary-600 transition-colors group-hover:underline"
              >
                Learn more &rarr;
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="/training-methods"
            className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white py-3 px-8 rounded-md font-medium transition-all hover-lift hover:shadow-lg"
          >
            Explore All Services
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default OurServices;
