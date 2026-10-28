import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Partners = () => {
  const partnerLogos = [
    { name: 'ISPON', image: '/images/brand1.jpeg' },
    { name: 'OSHAssociation UK', image: '/images/brand2.jpeg' },
    { name: 'NIMASA', image: '/images/brand3.jpeg' },
    { name: 'ISO', image: '/images/brand4.jpeg' },
    { name: 'IADC', image: '/images/brand5.jpeg' },
    { name: 'NEBOSH', image: '/images/brand1.jpeg' },
    { name: 'IOSH', image: '/images/brand2.jpeg' },
    { name: 'OPITO', image: '/images/brand3.jpeg' },
  ];

  const accreditations = [
    { name: 'ISO 9001:2015', description: 'Quality Management Systems' },
    { name: 'ISO 45001:2018', description: 'Occupational Health and Safety Management Systems' },
    { name: 'ISPON Certification', description: 'Institute of Safety Professionals of Nigeria' },
    { name: 'OSHAssociation UK', description: 'Occupational Safety and Health Association' },
    { name: 'IADC Accreditation', description: 'International Association of Drilling Contractors' },
    { name: 'NIMASA Approval', description: 'Nigerian Maritime Administration and Safety Agency' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Accreditations Section */}
          <div>
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-primary-700 mb-4">Our Accreditations</h2>
              <div className="w-20 h-1 bg-primary-500 mb-6"></div>
              <p className="text-neutral-600">
                Alpha Beta Safety Academy is proud to be accredited by leading national and international safety organizations, ensuring our training meets the highest standards.
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-4"
            >
              {accreditations.map((accreditation, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-shadow hover:border-primary-200 bg-white"
                >
                  <div className="bg-primary-50 rounded-full p-3 mr-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-primary-100 rounded-full text-primary-700 font-bold">
                      {accreditation.name.substring(0, 2)}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-700">{accreditation.name}</h3>
                    <p className="text-sm text-neutral-600">{accreditation.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-8">
              <a
                href="/about"
                className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium"
              >
                Learn more about our certifications <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Partners Section */}
          <div>
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-primary-700 mb-4">Our Partners</h2>
              <div className="w-20 h-1 bg-primary-500 mb-6"></div>
              <p className="text-neutral-600">
                We collaborate with industry-leading organizations to deliver cutting-edge safety training and certification programs.
          </p>
        </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {partnerLogos.map((partner, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-shadow flex items-center justify-center h-28"
                >
                  <div className="relative h-16 sm:h-20 md:h-24 overflow-hidden">
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="w-full h-full object-contain p-2"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-10 p-6 bg-primary-50 rounded-lg border border-primary-100">
              <h3 className="text-xl font-semibold text-primary-700 mb-3">Industry Trusted</h3>
              <p className="text-neutral-600 mb-4">
                Our training programs are trusted by leading companies in oil & gas, construction, manufacturing, and maritime industries across Africa.
              </p>
              <a
                href="/why-choose-us"
                className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium"
              >
                Why companies choose us <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
