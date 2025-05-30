import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import { Droplet, HardHat, Factory, Anchor, CheckCircle, Users } from 'lucide-react';

const IndustryFocusPage = () => {
  return (
    <>
      <PageHeader
        title="Industry Focus"
        subtitle="Specialized safety training programs tailored to the unique challenges of different industries."
        backgroundImage="https://images.pexels.com/photos/754301/pexels-photo-754301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-900 mb-6">
                Industry-Specific <span className="text-secondary-600">Training</span>
              </h2>
              <p className="text-neutral-700 mb-6">
                At ALPHA BETA SAFETY ACADEMY, we understand that different industries face unique safety challenges. Our specialized training programs are designed to address the specific hazards, regulations, and best practices relevant to each sector, ensuring that our graduates are thoroughly prepared for their specific work environments.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industry Sections */}
      {industries.map((industry, index) => (
        <IndustrySection
          key={industry.id}
          industry={industry}
          isEven={index % 2 === 0}
        />
      ))}

      {/* Client Success Stories */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Client <span className="text-secondary-600">Success Stories</span>
            </h2>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              Organizations that have transformed their safety performance through our industry-focused training programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                className="bg-primary-800 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-white p-2 rounded-full mr-4">
                    <img
                      src={story.logo}
                      alt={story.company}
                      className="h-10 w-10 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold">
                      {story.company}
                    </h3>
                    <p className="text-neutral-300 text-sm">
                      {story.industry}
                    </p>
                  </div>
                </div>
                <p className="text-neutral-300 mb-4">
                  {story.challenge}
                </p>
                <div className="mb-4">
                  <div className="text-secondary-600 font-medium mb-2">Our Solution:</div>
                  <p className="text-neutral-300">
                    {story.solution}
                  </p>
                </div>
                <div>
                  <div className="text-secondary-600 font-medium mb-2">Results:</div>
                  <ul className="space-y-2">
                    {story.results.map((result, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle size={16} className="text-secondary-600 mr-2 mt-1 flex-shrink-0" />
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Programs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-900 mb-4">
                Custom Training <span className="text-secondary-600">Programs</span>
              </h2>
              <p className="text-neutral-600">
                We can develop tailored training solutions to address your organization&apos;s specific safety challenges.
              </p>
            </div>

            <div className="bg-neutral-50 rounded-lg p-8 shadow-sm border border-neutral-200">
              <div className="flex justify-center mb-6">
                <Users className="h-16 w-16 text-secondary-600" />
              </div>

              <p className="text-neutral-700 mb-6 text-center">
                Our team of safety experts works closely with your organization to understand your unique needs, workplace environment, and specific industry challenges. We then design customized training programs that address these requirements while ensuring compliance with relevant regulations.
              </p>

              <h3 className="text-xl font-heading font-semibold text-primary-900 mb-4 text-center">
                Our Custom Program Development Process
              </h3>

              <div className="space-y-4 mb-6">
                {customProgramSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="flex"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, amount: 0.8 }}
                  >
                    <div className="mr-4 flex-shrink-0">
                      <div className="w-8 h-8 bg-primary-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-primary-900 mb-1">
                        {step.title}
                      </h4>
                      <p className="text-neutral-600 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <a
                  href="/contact"
                  className="inline-block bg-secondary-600 hover:bg-secondary-700 text-white py-3 px-8 rounded-md transition-colors font-medium"
                >
                  Inquire About Custom Programs
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

interface Industry {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  keyFocusAreas: string[];
}

interface IndustrySectionProps {
  industry: Industry;
  isEven: boolean;
}

const IndustrySection = ({ industry, isEven }: IndustrySectionProps) => {
  return (
    <section className={`py-16 ${isEven ? 'bg-white' : 'bg-neutral-50'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div
            className={`lg:w-1/2 ${!isEven && 'lg:order-2'}`}
            initial={{ opacity: 0, x: isEven ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary-900 rounded-full flex items-center justify-center text-white mr-4">
                {industry.icon}
              </div>
              <h2 className="text-3xl font-heading font-bold text-primary-900">
                {industry.name}
              </h2>
            </div>

            <p className="text-neutral-700 mb-6">
              {industry.description}
            </p>

            <h3 className="text-xl font-heading font-semibold text-primary-900 mb-4">
              Key Focus Areas
            </h3>

            <ul className="space-y-3 mb-6">
              {industry.keyFocusAreas.map((area, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle size={18} className="text-secondary-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-neutral-700">{area}</span>
                </li>
              ))}
            </ul>

            <a
              href="/courses"
              className="inline-block bg-secondary-600 hover:bg-secondary-700 text-white py-3 px-6 rounded-md transition-colors font-medium"
            >
              View Related Courses
            </a>
          </motion.div>

          <motion.div
            className={`lg:w-1/2 ${!isEven && 'lg:order-1'}`}
            initial={{ opacity: 0, x: isEven ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src={industry.image}
              alt={industry.name}
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Sample data
const industries: Industry[] = [
  {
    id: 1,
    name: "Oil & Gas",
    description: "The oil and gas industry presents unique hazards due to the nature of its operations, including exploration, production, refining, and distribution. Our specialized training programs address the specific safety challenges faced by workers in this high-risk sector, from offshore drilling platforms to onshore processing facilities.",
    icon: <Droplet size={24} />,
    image: "https://images.pexels.com/photos/4217/hotel-industry-travel.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    keyFocusAreas: [
      "Process safety management",
      "Hydrocarbon fire prevention and control",
      "Confined space entry in petrochemical environments",
      "H2S safety procedures",
      "Offshore platform evacuation",
      "Safe drilling operations",
    ]
  },
  {
    id: 2,
    name: "Construction",
    description: "Construction sites are dynamic environments with constantly changing hazards. Our construction safety programs address the leading causes of injuries and fatalities in this industry, providing workers and supervisors with the knowledge and skills to create and maintain safe work sites throughout all phases of construction projects.",
    icon: <HardHat size={24} />,
    image: "https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    keyFocusAreas: [
      "Fall protection systems",
      "Scaffold safety and temporary works",
      "Excavation and trenching safety",
      "Heavy equipment operations",
      "Electrical safety on construction sites",
      "Construction site traffic management",
    ]
  },
  {
    id: 3,
    name: "Manufacturing",
    description: "Manufacturing facilities present a range of safety challenges, from machine hazards to chemical exposures. Our manufacturing safety programs focus on identifying and controlling these risks while maintaining operational efficiency. We address both the technical and behavioral aspects of creating a safe manufacturing environment.",
    icon: <Factory size={24} />,
    image: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    keyFocusAreas: [
      "Machine guarding and lockout/tagout procedures",
      "Industrial ergonomics",
      "Chemical handling and storage",
      "Noise exposure control",
      "Production line safety",
      "Safe material handling practices",
    ]
  },
  {
    id: 4,
    name: "Marine, Port & Terminal Safety",
    description: "Maritime operations involve unique hazards related to vessel movement, cargo handling, and the marine environment. Our specialized programs address safety in ports, terminals, and aboard vessels, helping to prevent incidents in these complex and often challenging work environments.",
    icon: <Anchor size={24} />,
    image: "https://images.pexels.com/photos/753331/pexels-photo-753331.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    keyFocusAreas: [
      "Cargo handling safety",
      "Container terminal operations",
      "Marine firefighting",
      "Man overboard procedures",
      "Safe mooring operations",
      "Vessel traffic management",
    ]
  },
];

const successStories = [
  {
    company: "Lagos Energy Partners",
    industry: "Oil & Gas",
    logo: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=100",
    challenge: "Faced increasing incident rates at their offshore facilities despite having safety programs in place.",
    solution: "Implemented our comprehensive Offshore Safety Leadership program for 120 supervisors and managers, followed by process safety management training.",
    results: [
      "70% reduction in recordable incidents within 12 months",
      "Improved safety culture scores in employee surveys",
      "Successfully passed ISO 45001 certification audit"
    ]
  },
  {
    company: "BuildWell Construction",
    industry: "Construction",
    logo: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=100",
    challenge: "Multiple fall protection violations and near-misses on high-rise projects threatening contract cancellation.",
    solution: "Custom height safety program with practical scaffolding and fall arrest training for all 200+ workers and supervisors.",
    results: [
      "Zero fall-related incidents for 18 consecutive months",
      "Regulatory compliance achieved across all projects",
      "Secured new major contract due to improved safety record"
    ]
  },
  {
    company: "Global Manufacturing",
    industry: "Manufacturing",
    logo: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=100",
    challenge: "High rate of hand injuries and machine-related incidents affecting production and worker morale.",
    solution: "Comprehensive machine guarding and lockout/tagout training combined with safety leadership development for supervisors.",
    results: [
      "85% reduction in machine-related injuries",
      "Improved production efficiency due to fewer stoppages",
      "Developed internal safety champions program"
    ]
  },
];

const customProgramSteps = [
  {
    title: "Needs Assessment",
    description: "We conduct a thorough assessment of your organization&apos;s safety needs, challenges, and objectives."
  },
  {
    title: "Program Design",
    description: "Our experts design a tailored training program that addresses your specific requirements and industry context."
  },
  {
    title: "Content Development",
    description: "We develop customized training materials, practical exercises, and assessment tools relevant to your workplace."
  },
  {
    title: "Implementation",
    description: "Our experienced instructors deliver the training, either at your facility or our training center."
  },
  {
    title: "Evaluation & Refinement",
    description: "We assess the effectiveness of the training and make necessary adjustments for continuous improvement."
  }
];

export default IndustryFocusPage;
