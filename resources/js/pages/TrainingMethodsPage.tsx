import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PageHeader from '@/components/PageHeader';
import { Users, BookOpen, Monitor, Lightbulb, BarChart3, Target, Zap, GraduationCap } from 'lucide-react';

const TrainingMethodsPage = () => {
  return (
    <>
      <PageHeader 
        title="Training Methods" 
        subtitle="Discover our innovative approaches to safety education that maximize engagement and knowledge retention."
        backgroundImage="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      
      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-900 mb-6">
                Modern <span className="text-secondary-600">Training Methods</span>
              </h2>
              <p className="text-neutral-700 mb-6">
                At ALPHA BETA SAFETY ACADEMY, we understand that effective learning requires engaging, practical, and relevant training methods. Our approach combines traditional classroom instruction with innovative techniques that cater to different learning styles.
              </p>
              <p className="text-neutral-700">
                We continuously refine our teaching methodologies based on educational research and industry feedback to ensure our students receive the most effective safety training available. Our focus is on developing practical skills that can be immediately applied in the workplace.
              </p>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Training session at ALPHA BETA SAFETY ACADEMY" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Training Approaches */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-900 mb-4">
              Our Training <span className="text-secondary-600">Approaches</span>
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              We employ a variety of teaching methods to ensure knowledge retention and skill development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trainingApproaches.map((approach, index) => (
              <MethodCard 
                key={index}
                icon={approach.icon}
                title={approach.title}
                description={approach.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Interactive Learning */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <SimulationShowcase />
            </div>
            
            <motion.div 
              className="lg:w-1/2 order-1 lg:order-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-900 mb-6">
                Interactive <span className="text-secondary-600">Learning</span>
              </h2>
              <p className="text-neutral-700 mb-6">
                Our simulations and interactive scenarios place students in realistic safety situations without the associated risks. This hands-on approach helps develop critical thinking and decision-making skills essential for safety professionals.
              </p>
              <ul className="space-y-4">
                {interactiveLearningFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-secondary-600 p-1 rounded-full text-white mr-3 mt-1">
                      <Check />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-primary-900 text-lg mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-neutral-600">
                        {feature.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Learning Outcomes */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Learning <span className="text-secondary-600">Outcomes</span>
            </h2>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              Our training methods are designed to achieve specific educational outcomes that enhance your safety expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {learningOutcomes.map((outcome, index) => (
              <motion.div 
                key={index}
                className="bg-primary-800 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="mb-4">
                  {outcome.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">
                  {outcome.title}
                </h3>
                <p className="text-neutral-300">
                  {outcome.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

interface MethodCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const MethodCard = ({ icon, title, description, delay }: MethodCardProps) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="w-16 h-16 bg-primary-900 rounded-full flex items-center justify-center text-white mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-heading font-semibold text-primary-900 mb-3">
        {title}
      </h3>
      <p className="text-neutral-600">
        {description}
      </p>
    </motion.div>
  );
};

const SimulationShowcase = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div 
      ref={ref} 
      className="relative h-96 rounded-lg overflow-hidden shadow-lg"
    >
      <img 
        src="https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
        alt="Interactive safety simulation" 
        className="w-full h-full object-cover"
      />
      
      {inView && (
        <>
          <motion.div 
            className="absolute top-4 left-4 bg-white bg-opacity-90 p-3 rounded-lg shadow-md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-primary-900 font-semibold">Hazard Identified</div>
            <div className="text-secondary-600 text-sm">Exposed wiring</div>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-4 right-4 bg-primary-900 bg-opacity-90 p-3 rounded-lg shadow-md text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="font-semibold">Recommended Action</div>
            <div className="text-sm">Isolate area and report to supervisor</div>
          </motion.div>
          
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-secondary-600 rounded-full flex items-center justify-center text-white cursor-pointer"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            whileHover={{ scale: 1.1 }}
          >
            <Zap size={32} />
          </motion.div>
        </>
      )}
    </div>
  );
};

const Check = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Sample data
const trainingApproaches = [
  {
    icon: <Users size={24} />,
    title: 'Interactive Sessions',
    description: 'Engaging classroom discussions and group activities that encourage knowledge sharing and collaborative problem-solving.'
  },
  {
    icon: <Lightbulb size={24} />,
    title: 'Simulations',
    description: 'Realistic scenarios and simulations that allow students to apply safety principles in controlled environments.'
  },
  {
    icon: <Monitor size={24} />,
    title: 'Online Platforms',
    description: 'Digital learning tools and virtual classrooms that provide flexible access to course materials and instructor support.'
  },
  {
    icon: <BookOpen size={24} />,
    title: 'Hands-on Training',
    description: 'Practical exercises that develop physical skills and familiarity with safety equipment and procedures.'
  }
];

const interactiveLearningFeatures = [
  {
    title: 'Virtual Reality Safety Drills',
    description: 'Experience emergency scenarios in a safe virtual environment, developing quick decision-making skills.'
  },
  {
    title: 'Case Study Analysis',
    description: 'Examine real-world safety incidents to identify causes and prevention strategies.'
  },
  {
    title: 'Role-Playing Exercises',
    description: 'Simulate workplace safety conversations and interventions to develop communication skills.'
  },
  {
    title: 'Gamified Learning',
    description: 'Engage with safety concepts through interactive games that make learning enjoyable and memorable.'
  }
];

const learningOutcomes = [
  {
    icon: <Target className="h-10 w-10 text-secondary-600" />,
    title: 'Hazard Recognition',
    description: 'Develop the ability to identify potential safety hazards in various workplace environments before incidents occur.'
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-secondary-600" />,
    title: 'Risk Assessment',
    description: 'Learn systematic approaches to evaluating risks and determining appropriate control measures based on severity and probability.'
  },
  {
    icon: <GraduationCap className="h-10 w-10 text-secondary-600" />,
    title: 'Technical Knowledge',
    description: 'Gain comprehensive understanding of safety regulations, standards, and best practices relevant to your industry.'
  },
  {
    icon: <Users className="h-10 w-10 text-secondary-600" />,
    title: 'Leadership Skills',
    description: 'Develop the ability to influence and guide others in implementing safety protocols and fostering a safety culture.'
  },
  {
    icon: <Monitor className="h-10 w-10 text-secondary-600" />,
    title: 'Digital Proficiency',
    description: 'Become competent with safety management software, documentation systems, and digital reporting tools.'
  },
  {
    icon: <Zap className="h-10 w-10 text-secondary-600" />,
    title: 'Emergency Response',
    description: 'Build confidence and competence in managing crisis situations through practiced response protocols.'
  }
];

export default TrainingMethodsPage;