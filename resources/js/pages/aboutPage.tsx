    import { motion } from 'framer-motion';
    import PageHeader from '../components/PageHeader';
    import { CheckCircle, Flag, Target, Heart, Award, Shield ,
      Globe,
      BadgeCheck,
      BookOpenCheck,
      Building2,
      ClipboardCheck,} from 'lucide-react';
    import Layout from '@/layouts/web-layout';

    const AboutPage = () => {
      return (
        <>
        <Layout>
          
          <PageHeader 
            title="About Us" 
            subtitle="Learn more about ALPHA BETA SAFETY ACADEMY and our commitment to world-class safety training."
            backgroundImage="/images/img3.jpeg"
          />
          
        
        <section className="py-16">
  <div className="px-4 lg:px-8">
    <div className="flex flex-col gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-900 mb-6 text-center">
          ALPHA BETA <span className="text-secondary-600">SAFETY ACADEMY</span>
        </h2>

        <div className="text-neutral-700 space-y-6">
          <p>
            <strong>ALPHA BETA SAFETY ACADEMY</strong> is a world-class safety training institute offering comprehensive, globally recognized certifications. We utilize modern training methods and provide a strong foundation for professional development in safety and risk management. We stand out for our quality and global accreditations, including <strong>OSHAssociation UK</strong> and the <strong>Institute of Marine, Port and Terminal Management Professionals, USA</strong>.
          </p>

          <p>
            As a world-class safety training institute, we pride ourselves on a comprehensive curriculum. Our course offerings cover:
          </p>
          <ul className="list-disc list-inside pl-4">
            <li>Occupational health</li>
            <li>Environmental management</li>
            <li>Emergency response</li>
            <li>Industry-specific safety for oil & gas, construction, and manufacturing</li>
          </ul>

          <p>Our key strengths include:</p>
          <ul className="list-disc list-inside pl-4 space-y-1">
            <li><strong>Globally Recognized Certifications</strong>: Training programs lead to certifications that are internationally accepted and valued.</li>
            <li><strong>Modern Training Methods</strong>: We use interactive learning, simulations, and online tools for engaging, effective instruction.</li>
            <li><strong>Experienced Instructors</strong>: Our faculty includes experts who bring industry experience and professionalism.</li>
            <li><strong>Focus on Practical Skills</strong>: Emphasis is placed on real-world application and hands-on experience.</li>
            <li><strong>Continuous Improvement</strong>: We regularly upgrade our programs and facilities to remain industry-leading.</li>
            <li><strong>Strong Industry Partnerships</strong>: Collaboration with top organizations ensures our training remains current and impactful.</li>
          </ul>

          <p>
            <strong>ALPHA BETA SAFETY ACADEMY</strong> stands as a premier example of a world-class safety training institute in Nigeria. We are internationally accredited and provide a wide range of certifications and consulting services, especially in the oil & gas, construction, and manufacturing sectors.
          </p>

          <p>
            We deliver practical, comprehensive, and globally respected training programs to equip individuals with the knowledge and skills required to excel in safety and risk management.
          </p>
        </div>
      </motion.div>
    </div>
  </div>
</section>

      
          <section className="py-16 bg-neutral-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-900 mb-4">
                  Our Foundation
                </h2>
                <p className="text-neutral-600 max-w-2xl mx-auto">
                  The principles that guide our operations and decision-making.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <MVVCard 
                  title="Mission"
                  icon={<Flag className="h-12 w-12 text-secondary-600" />}
                  content="To empower individuals and organizations with comprehensive safety knowledge and skills that prevent workplace incidents and create safer environments globally."
                />
                
                <MVVCard 
                  title="Vision"
                  icon={<Target className="h-12 w-12 text-secondary-600" />}
                  content="To be the foremost safety training institute, recognized worldwide for excellence in safety education and certification, contributing to incident-free workplaces across all industries."
                />
                
                <MVVCard 
                  title="Values"
                  icon={<Heart className="h-12 w-12 text-secondary-600" />}
                  content="Excellence, Integrity, Innovation, Practical Application, and Continuous Improvement form the cornerstone of our approach to safety training."
                />
              </div>
            </div>
          </section>
          
        
          {/* <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-900 mb-4">
                  International Accreditations
                </h2>
                <p className="text-neutral-600 max-w-2xl mx-auto">
                  Our training programs are recognized by leading global safety organizations, ensuring that our certifications hold value worldwide.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {accreditations.map((accreditation) => (
                  <AccreditationCard 
                    key={accreditation.id}
                    name={accreditation.name}
                    description={accreditation.description}
                    icon={accreditation.icon}
                  />
                ))}
              </div>
            </div>
          </section> */}
          
        
          <section className="py-16  ">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                  What Makes Us <span className="text-secondary-600">World-Class</span>
                </h2>
                <p className="text-neutral-600 max-w-2xl mx-auto">
                  Our unique approach to safety training sets us apart from other institutions.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                {worldClassFeatures.map((feature) => (
                  <motion.div 
                    key={feature.id}
                    className="flex items-start p-6 bg-gray-100  rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <CheckCircle className="text-secondary-600 h-6 w-6 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-heading font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-neutral-600">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          </Layout>
        </>
      );
    };

    interface MVVCardProps {
      title: string;
      icon: React.ReactNode;
      content: string;
    }

    const MVVCard = ({ title, icon, content }: MVVCardProps) => {
      return (
        <motion.div 
          className="bg-white p-8 rounded-lg shadow-md text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex justify-center mb-4">
            {icon}
          </div>
          <h3 className="text-2xl font-heading font-semibold text-primary-900 mb-4">
            {title}
          </h3>
          <p className="text-neutral-600">
            {content}
          </p>
        </motion.div>
      );
    };

    // interface AccreditationCardProps {
    //   name: string;
    //   description: string;
    //   icon: any;
    // }

    // const AccreditationCard = ({ name, description, icon }: AccreditationCardProps) => {
    //   return (
    //     <motion.div 
    //       className="bg-neutral-50 p-6 rounded-lg border border-neutral-200 flex flex-col items-center"
    //       initial={{ opacity: 0, y: 20 }}
    //       whileInView={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.5 }}
    //       viewport={{ once: true, amount: 0.3 }}
    //     >
    //       {icon}
    //       <h3 className="text-xl font-heading font-semibold text-primary-900 mb-2 text-center">
    //         {name}
    //       </h3>
    //       <p className="text-neutral-600 text-center">
    //         {description}
    //       </p>
    //     </motion.div>
    //   );
    // };

    // const accreditations = [
    //   {
    //     id: 1,
    //     name: 'OSHAssociation UK',
    //     description: 'Corporate International Membership No: 54080. Recognized body for Occupational Safety and Health professionals globally.',
    //     icon: <Shield className="h-12 w-12 text-primary-900" />,
    //   },
    //   {
    //     id: 2,
    //     name: 'NEBOSH',
    //     description: 'National Examination Board in Occupational Safety and Health.',
    //     icon: <Award className="h-12 w-12 text-primary-900" />,
    //   },
    //   {
    //     id: 3,
    //     name: 'IMPTMP USA',
    //     description: 'Chartered Institute of Marine, Port & Terminal Management Professionals USA, Membership No: C5200500-XXIII.',
    //     icon: <CheckCircle className="h-12 w-12 text-primary-900" />,
    //   },
    //   {
    //     id: 4,
    //     name: 'Institute of Safety Professionals of Nigeria (ISPON)',
    //     description: 'Corporate Membership No: 9476. National authority in professional safety standards and education.',
    //     icon: <ClipboardCheck className="h-12 w-12 text-primary-900" />,
    //   },
    //   {
    //     id: 5,
    //     name: 'Nigeria Red Cross Society',
    //     description: 'Corporate Membership No: NRCS/RSB/NHQ/CT0104390. Emergency response and humanitarian training.',
    //     icon: <Globe className="h-12 w-12 text-primary-900" />,
    //   },
    //   {
    //     id: 6,
    //     name: 'Nigeria Upstream Petroleum Regulatory Commission (NUPRC)',
    //     description: 'Permit No: NUPRC/OGISP/23/5663058/N327188. Regulatory permit for safety training and consulting.',
    //     icon: <Building2 className="h-12 w-12 text-primary-900" />,
    //   },
    //   {
    //     id: 7,
    //     name: 'Nigeria Social Insurance Trust Fund (NSITF)',
    //     description: 'National Social Insurance certification for workplace health and safety compliance.',
    //     icon: <BookOpenCheck className="h-12 w-12 text-primary-900" />,
    //   },
    //   {
    //     id: 8,
    //     name: 'Federal Government Permit',
    //     description: 'Authorized training provider by the Federal Government of Nigeria.',
    //     icon: <BadgeCheck className="h-12 w-12 text-primary-900" />,
    //   },
    //   {
    //     id: 9,
    //     name: 'Onshore and Offshore Safety Institute',
    //     description: 'Training institute for safety standards in onshore and offshore environments.',
    //     icon: <Award className="h-12 w-12 text-primary-900" />,
    //   },
    // ];

    const worldClassFeatures = [
      {
        id: 1,
        title: 'Globally Recognized Certifications',
        description: 'Our certifications are recognized by leading safety organizations worldwide, providing our graduates with credentials that enhance their employability across borders.'
      },
      {
        id: 2,
        title: 'Experienced Instructors',
        description: 'Our trainers have extensive industry experience and are certified by international safety organizations, bringing real-world insights to the classroom.'
      },
      {
        id: 3,
        title: 'Comprehensive Curriculum',
        description: 'Our courses cover both theoretical knowledge and practical applications, ensuring graduates are prepared to implement safety protocols effectively.'
      },
      {
        id: 4,
        title: 'State-of-the-Art Facilities',
        description: 'Our training centers are equipped with modern technology and simulation equipment to provide hands-on experience in a controlled environment.'
      },
      {
        id: 5,
        title: 'Industry Partnerships',
        description: 'We collaborate with leading organizations across various sectors to ensure our training programs address current industry challenges and requirements.'
      },
      {
        id: 6,
        title: 'Continuous Updates',
        description: 'Our curriculum is regularly updated to reflect changes in safety regulations, industry best practices, and emerging hazards.'
      }
    ];

    export default AboutPage;