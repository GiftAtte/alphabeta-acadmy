import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';
import { Award, Users, BookOpen, TrendingUp, Shield } from 'lucide-react';
import Layout from '@/layouts/web-layout';

const WhyChooseUsPage = () => {
  return (
 <Layout>
      <PageHeader
        title="Why Choose Us"
        subtitle="Discover what sets ALPHA BETA SAFETY ACADEMY apart as a world-class safety training institute."
        backgroundImage="https://images.pexels.com/photos/3760818/pexels-photo-3760818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />

      {/* Core Advantages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-900 mb-6">
                Our <span className="text-secondary-600">Core Advantages</span>
              </h2>
              <p className="text-neutral-700">
                At ALPHA BETA SAFETY ACADEMY, we've established ourselves as leaders in safety training through our commitment to excellence, innovation, and real-world relevance. Here's what makes us different:
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {advantages.map((advantage, index) => (
              <AdvantageCard
                key={index}
                icon={advantage.icon}
                title={advantage.title}
                description={advantage.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-900 mb-4">
              How We <span className="text-secondary-600">Compare</span>
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              See how ALPHA BETA SAFETY ACADEMY stands out against other safety training providers.
            </p>
          </div>

          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-4 text-left bg-primary-900 text-white rounded-tl-lg">Features</th>
                  <th className="p-4 text-center bg-primary-900 text-white">
                    <div className="flex items-center justify-center">
                      <Shield size={20} className="text-secondary-600 mr-2" />
                      <span>ALPHA BETA SAFETY</span>
                    </div>
                  </th>
                  <th className="p-4 text-center bg-primary-900 text-white rounded-tr-lg">Other Providers</th>
                </tr>
              </thead>
              <tbody>
                {comparisonItems.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-100'}>
                    <td className="p-4 font-medium text-primary-900">{item.feature}</td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          item.alphabeta ? 'bg-secondary-600 text-white' : 'bg-neutral-300'
                        }`}>
                          {item.alphabeta ? '✓' : '✕'}
                        </span>
                        {item.alphabetaNote && (
                          <span className="ml-2 text-sm text-neutral-600">{item.alphabetaNote}</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          item.others ? 'bg-green-500 text-white' : 'bg-neutral-300'
                        }`}>
                          {item.others ? '✓' : '✕'}
                        </span>
                        {item.othersNote && (
                          <span className="ml-2 text-sm text-neutral-600">{item.othersNote}</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-900 mb-4">
              What Our <span className="text-secondary-600">Clients Say</span>
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from organizations that have benefited from our training.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-neutral-50 p-6 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-primary-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      {testimonial.position}, {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-neutral-700 italic mb-4">
                  "{testimonial.quote}"
                </p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Ready to Experience the <span className="text-secondary-600">ALPHA BETA Difference</span>?
            </h2>
            <p className="text-neutral-300 mb-8">
              Join thousands of safety professionals who have advanced their careers through our world-class training programs. Take the first step toward excellence in safety.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/courses"
                className="bg-white text-primary-900 hover:bg-neutral-100 py-3 px-8 rounded-md transition-colors font-medium"
              >
                Explore Our Courses
              </a>
              <a
                href="/contact"
                className="bg-secondary-600 hover:bg-secondary-700 text-white py-3 px-8 rounded-md transition-colors font-medium"
              >
                Contact Us Today
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

interface AdvantageCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const AdvantageCard = ({ icon, title, description, delay }: AdvantageCardProps) => {
  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="mb-4">
        <div className="w-14 h-14 bg-primary-900 rounded-lg flex items-center justify-center text-white">
          {icon}
        </div>
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

// Sample data
const advantages = [
  {
    icon: <Award size={28} />,
    title: "Globally Recognized Certifications",
    description: "Our certifications are accredited by leading international safety organizations, ensuring your credentials are recognized worldwide and enhance your professional standing."
  },
  {
    icon: <Users size={28} />,
    title: "Expert Instructors",
    description: "Learn from industry professionals with extensive real-world experience who bring practical insights to theoretical concepts, enhancing your understanding of safety applications."
  },
  {
    icon: <BookOpen size={28} />,
    title: "Modern Training Methods",
    description: "Our innovative approach combines traditional classroom instruction with simulations, case studies, and hands-on exercises to maximize engagement and knowledge retention."
  },
  {
    icon: <TrendingUp size={28} />,
    title: "Practical Skills Focus",
    description: "Beyond theory, we emphasize practical skills that can be immediately applied in your workplace, making you a more effective safety professional from day one."
  },
  {
    icon: <Shield size={28} />,
    title: "Industry-Specific Training",
    description: "Our specialized programs address the unique safety challenges of different industries, providing you with targeted knowledge relevant to your specific work environment."
  },
  {
    icon: <Award size={28} />,
    title: "Continuous Improvement",
    description: "We regularly update our curriculum to reflect the latest safety standards, regulations, and best practices, ensuring you receive the most current information."
  }
];

const comparisonItems = [
  {
    feature: "Globally Recognized Certifications",
    alphabeta: true,
    others: true,
    othersNote: "Limited"
  },
  {
    feature: "Industry-Specific Training Programs",
    alphabeta: true,
    others: false
  },
  {
    feature: "Instructors with 10+ Years Experience",
    alphabeta: true,
    others: true,
    othersNote: "Varies"
  },
  {
    feature: "Hands-on Practical Training",
    alphabeta: true,
    others: true,
    othersNote: "Limited"
  },
  {
    feature: "State-of-the-Art Training Facilities",
    alphabeta: true,
    others: false
  },
  {
    feature: "Interactive Simulations & Scenarios",
    alphabeta: true,
    others: false
  },
  {
    feature: "Customized Corporate Programs",
    alphabeta: true,
    others: true,
    othersNote: "Basic only"
  },
  {
    feature: "Free Post-Training Support",
    alphabeta: true,
    alphabetaNote: "6 months",
    others: false
  },
  {
    feature: "Online & Blended Learning Options",
    alphabeta: true,
    others: true
  },
  {
    feature: "Training in Multiple Languages",
    alphabeta: true,
    others: false
  }
];

const testimonials = [
  {
    name: "Chioma Adeyemi",
    position: "HSE Manager",
    company: "Nigerian Petroleum",
    image: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    quote: "The training our team received from ALPHA BETA has transformed our safety culture. Their industry-specific approach addressed the unique challenges we face in oil and gas operations."
  },
  {
    name: "Ibrahim Hassan",
    position: "Site Manager",
    company: "BuildWell Construction",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    quote: "Their practical approach to construction safety training has had a measurable impact on our incident rates. The hands-on exercises prepared our workers for real-world challenges."
  },
  {
    name: "Stella Okafor",
    position: "EHS Director",
    company: "Pan-African Manufacturing",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    quote: "What sets ALPHA BETA apart is their commitment to continuous improvement. Their training programs are regularly updated to reflect the latest safety standards and best practices."
  }
];

export default WhyChooseUsPage;