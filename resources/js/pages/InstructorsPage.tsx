import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '@/components/PageHeader';
import { User, Award, Users, X, Mail, Linkedin } from 'lucide-react';

const InstructorsPage = () => {
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);

  return (
    <>
      <PageHeader 
        title="Our Instructors" 
        subtitle="Meet our team of experienced safety professionals who bring real-world expertise to the classroom."
        backgroundImage="https://images.pexels.com/photos/6326377/pexels-photo-6326377.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
                Expert <span className="text-secondary-600">Instructors</span>
              </h2>
              <p className="text-neutral-700 mb-6">
                Our instructors are not just teachers; they are industry professionals with extensive experience in their respective fields. Their real-world expertise enriches the learning experience and provides practical insights that go beyond theoretical knowledge.
              </p>
              <div className="flex justify-center">
                <Users className="h-16 w-16 text-secondary-600" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Instructors Grid */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.map((instructor, index) => (
              <InstructorCard 
                key={instructor.id}
                instructor={instructor}
                delay={index * 0.1}
                onClick={() => setSelectedInstructor(instructor)}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Instructor Modal */}
      <AnimatePresence>
        {selectedInstructor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedInstructor(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end p-4">
                <button
                  className="text-neutral-500 hover:text-neutral-700"
                  onClick={() => setSelectedInstructor(null)}
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="px-6 pb-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="rounded-lg overflow-hidden shadow-md">
                      <img
                        src={selectedInstructor.image}
                        alt={selectedInstructor.name}
                        className="w-full h-auto"
                      />
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-primary-900">
                        <Award size={18} className="mr-2 text-secondary-600" />
                        <span className="font-medium">Certifications:</span>
                      </div>
                      <ul className="ml-6 text-sm text-neutral-600 space-y-1">
                        {selectedInstructor.certifications.map((cert, index) => (
                          <li key={index}>{cert}</li>
                        ))}
                      </ul>
                      
                      <div className="flex space-x-2 mt-4">
                        <a
                          href={`mailto:${selectedInstructor.email}`}
                          className="bg-primary-900 text-white p-2 rounded-full hover:bg-primary-800 transition-colors"
                        >
                          <Mail size={18} />
                        </a>
                        {selectedInstructor.linkedin && (
                          <a
                            href={selectedInstructor.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#0077B5] text-white p-2 rounded-full hover:bg-opacity-90 transition-colors"
                          >
                            <Linkedin size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-heading font-bold text-primary-900 mb-2">
                      {selectedInstructor.name}
                    </h2>
                    <p className="text-secondary-600 font-medium mb-4">
                      {selectedInstructor.position}
                    </p>
                    
                    <div className="prose prose-sm prose-neutral max-w-none">
                      <p className="mb-4 text-neutral-700">
                        {selectedInstructor.bio}
                      </p>
                      
                      <h3 className="text-lg font-heading font-semibold text-primary-900 mt-6 mb-3">
                        Areas of Expertise
                      </h3>
                      <ul className="space-y-2 text-neutral-700">
                        {selectedInstructor.expertise.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-secondary-600 mr-2">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                      
                      <h3 className="text-lg font-heading font-semibold text-primary-900 mt-6 mb-3">
                        Teaching Philosophy
                      </h3>
                      <p className="text-neutral-700">
                        {selectedInstructor.philosophy}
                      </p>
                      
                      {selectedInstructor.testimonial && (
                        <>
                          <h3 className="text-lg font-heading font-semibold text-primary-900 mt-6 mb-3">
                            Student Testimonial
                          </h3>
                          <blockquote className="border-l-4 border-secondary-600 pl-4 italic text-neutral-600">
                            "{selectedInstructor.testimonial.quote}"
                            <footer className="mt-2 text-sm text-neutral-500">
                              — {selectedInstructor.testimonial.author}, {selectedInstructor.testimonial.position}
                            </footer>
                          </blockquote>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Join Our Team */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Join Our <span className="text-secondary-600">Teaching Team</span>
            </h2>
            <p className="text-neutral-300 mb-8">
              We're always looking for experienced safety professionals to join our team of instructors. If you have industry expertise and a passion for teaching, we'd love to hear from you.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-primary-900 py-3 px-8 rounded-md hover:bg-neutral-100 transition-colors font-medium"
            >
              Apply to Teach
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

interface Instructor {
  id: number;
  name: string;
  position: string;
  image: string;
  bio: string;
  certifications: string[];
  expertise: string[];
  philosophy: string;
  email: string;
  linkedin?: string;
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
}

interface InstructorCardProps {
  instructor: Instructor;
  delay: number;
  onClick: () => void;
}

const InstructorCard = ({ instructor, delay, onClick }: InstructorCardProps) => {
  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, amount: 0.3 }}
      onClick={onClick}
    >
      <div className="aspect-w-4 aspect-h-3">
        <img
          src={instructor.image}
          alt={instructor.name}
          className="w-full h-60 object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-heading font-semibold text-primary-900 mb-1">
          {instructor.name}
        </h3>
        <p className="text-secondary-600 font-medium mb-3">
          {instructor.position}
        </p>
        <p className="text-neutral-600 mb-4 line-clamp-3">
          {instructor.bio.substring(0, 120)}...
        </p>
        <div className="flex items-center text-primary-900 font-medium">
          <span>View Profile</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1"
          >
            <path
              d="M7.5 15L12.5 10L7.5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

// Sample data
const instructors: Instructor[] = [
  {
    id: 1,
    name: "Dr. Adebayo Johnson",
    position: "Lead Safety Instructor",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bio: "Dr. Johnson brings over 15 years of experience in occupational health and safety across multiple industries. He has worked as a safety consultant for major oil and gas companies in Nigeria and internationally, implementing comprehensive safety management systems and conducting risk assessments. His practical approach to safety education has made him a favorite among students.",
    certifications: ["NEBOSH International Diploma", "Certified Safety Professional (CSP)", "ISO 45001 Lead Auditor"],
    expertise: [
      "Oil and Gas Safety Management",
      "Process Safety",
      "Safety Leadership Development",
      "Risk Assessment Methodologies"
    ],
    philosophy: "Safety education must bridge theory and practice. I believe in creating learning experiences that challenge students to apply safety principles to real-world scenarios, developing both their technical knowledge and critical thinking skills.",
    email: "adebayo.johnson@alphabetasafety.com",
    linkedin: "https://linkedin.com",
    testimonial: {
      quote: "Dr. Johnson's extensive field experience brought the course material to life with relevant examples. His teaching style made complex safety concepts accessible and practical.",
      author: "Samuel Okafor",
      position: "HSE Manager, Lagos Energy"
    }
  },
  {
    id: 2,
    name: "Amina Kareem",
    position: "Environmental Safety Specialist",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bio: "Amina specializes in environmental management systems and sustainability practices. With a background in environmental engineering and 10 years of field experience, she has helped numerous organizations implement effective environmental protection measures while maintaining operational efficiency. Her courses emphasize the integration of environmental considerations into overall safety management.",
    certifications: ["Master's in Environmental Engineering", "ISO 14001 Lead Implementer", "IEMA Certified Environmental Practitioner"],
    expertise: [
      "Environmental Impact Assessment",
      "Waste Management Systems",
      "Environmental Compliance",
      "Sustainable Business Practices"
    ],
    philosophy: "Environmental protection and business success can and must coexist. I teach my students to identify solutions that protect our natural resources while supporting organizational goals and objectives.",
    email: "amina.kareem@alphabetasafety.com",
    linkedin: "https://linkedin.com"
  },
  {
    id: 3,
    name: "Chinedu Okonkwo",
    position: "Construction Safety Expert",
    image: "https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bio: "Chinedu has dedicated his 12-year career to improving safety standards in the construction industry. He has overseen safety operations for major infrastructure projects across West Africa, including high-rise buildings, bridges, and industrial facilities. His practical knowledge of construction hazards and control measures makes his courses especially valuable for professionals in this high-risk sector.",
    certifications: ["NEBOSH Construction Certificate", "Certified Construction Health and Safety Technician", "Advanced Scaffold Safety"],
    expertise: [
      "Construction Site Safety Management",
      "Temporary Works Design",
      "Fall Protection Systems",
      "Heavy Equipment Safety"
    ],
    philosophy: "Construction sites present unique and dynamic safety challenges. I teach my students to anticipate hazards before they materialize and to implement practical controls that protect workers without impeding project progress.",
    email: "chinedu.okonkwo@alphabetasafety.com",
    testimonial: {
      quote: "Mr. Okonkwo's course completely transformed how I approach safety on my construction sites. His practical exercises and real-world examples prepared me for challenges I encounter daily.",
      author: "Ibrahim Hassan",
      position: "Site Manager, BuildWell Construction"
    }
  },
  {
    id: 4,
    name: "Dr. Fatima Bello",
    position: "Industrial Hygiene Specialist",
    image: "https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bio: "Dr. Bello is an expert in industrial hygiene with particular focus on chemical exposure assessment and control. With a Ph.D. in Occupational Health and 8 years of industry experience, she has helped numerous manufacturing facilities implement effective exposure monitoring programs and control strategies. Her research on local ventilation systems has been published in international journals.",
    certifications: ["Certified Industrial Hygienist (CIH)", "Ph.D. in Occupational Health", "Hazardous Materials Management"],
    expertise: [
      "Chemical Exposure Assessment",
      "Ventilation System Design",
      "Respiratory Protection Programs",
      "Occupational Health Monitoring"
    ],
    philosophy: "Preventing occupational illness requires both technical knowledge and effective communication. I teach my students not only how to identify and measure hazards but also how to effectively communicate risks to all stakeholders, from workers to executives.",
    email: "fatima.bello@alphabetasafety.com",
    linkedin: "https://linkedin.com"
  },
  {
    id: 5,
    name: "Emmanuel Osei",
    position: "Emergency Response Coordinator",
    image: "https://images.pexels.com/photos/2128807/pexels-photo-2128807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bio: "Emmanuel brings 14 years of experience in emergency management and response planning. His background includes working with fire services and as an emergency coordinator for multinational corporations. He has managed responses to several significant incidents, giving him valuable insights that he shares with his students. His courses combine theoretical principles with hands-on practice.",
    certifications: ["FEMA Incident Command System", "Advanced First Aid Instructor", "Fire Safety Manager"],
    expertise: [
      "Emergency Response Planning",
      "Crisis Management",
      "Fire Safety Systems",
      "Evacuation Procedures"
    ],
    philosophy: "In emergencies, people don't rise to the occasion; they fall to their level of training. My teaching focuses on developing both the knowledge and practical skills needed to respond effectively when seconds count.",
    email: "emmanuel.osei@alphabetasafety.com",
    testimonial: {
      quote: "Emmanuel's emergency response course was incredibly practical. The simulations were challenging and realistic, preparing us for actual emergency situations. This training has been invaluable to our organization.",
      author: "Grace Adeyemi",
      position: "Facility Manager, Global Manufacturing"
    }
  },
  {
    id: 6,
    name: "Ngozi Eze",
    position: "Process Safety Specialist",
    image: "https://images.pexels.com/photos/4946604/pexels-photo-4946604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bio: "Ngozi specializes in process safety management for high-hazard industries. With 11 years of experience in petrochemical and manufacturing settings, she has led process hazard analyses, developed safety instrumented systems, and implemented comprehensive process safety programs. Her courses emphasize systematic approaches to preventing catastrophic incidents.",
    certifications: ["Certified Process Safety Professional", "Six Sigma Black Belt", "Hazard and Operability Study Leader"],
    expertise: [
      "Process Hazard Analysis",
      "Layer of Protection Analysis",
      "Management of Change",
      "Human Factors in Process Safety"
    ],
    philosophy: "Process safety requires both technical excellence and organizational discipline. I teach my students to develop robust safety systems that can withstand the pressures of production demands and organizational change.",
    email: "ngozi.eze@alphabetasafety.com",
    linkedin: "https://linkedin.com"
  }
];

export default InstructorsPage;