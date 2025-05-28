import PageHeader from '@/components/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/layouts/web-layout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { Award, ChevronRight, CheckCircle, Shield } from 'lucide-react';
import { useState } from 'react';

interface CertificateDetails {
  name: string;
  course: string;
  issueDate: string;
  certificateId: string;
  status: 'Verified' | 'Invalid' | 'Pending';
}

const CertificationsPage = () => {
  const [certificateId, setCertificateId] = useState('');
  const [userData, setUserData] = useState<CertificateDetails | null>(null);


  const handleVerify = () => {
    // Simulate verification
    if (certificateId.trim() !== '') {
      setUserData({
        name: 'John Doe',
        course: 'NEBOSH International General Certificate',
        issueDate: 'March 15, 2024',
        certificateId: certificateId,
        status: 'Verified'
      });
      setCertificateId('')
    } else {
      setUserData(null);
    }
  };
  return (
    <>
      <Layout>
        <PageHeader
          title="Certifications"
          subtitle="Obtain globally recognized safety certifications that enhance your career prospects worldwide."
          backgroundImage="/images/img10.jpeg"
          content={
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl mt-5">
             
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Input
                  placeholder="Enter Certificate ID"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  className="w-full h-14 text-gray-800 bg-white"
                />
                <Button onClick={handleVerify} size={'lg'} className="w-full sm:w-auto h-14 ">
                  Verify Certificate
                </Button>
              </div>

              {/* Dummy Card */}
              {userData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8"
                >
                  <Card className="text-left bg-white shadow-md rounded-xl border border-primary-100">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-primary-900 mb-2">{userData.name}</h3>
                      <p className="text-neutral-700 mb-1"><strong>Course:</strong> {userData.course}</p>
                      <p className="text-neutral-700 mb-1"><strong>Certificate ID:</strong> {userData.certificateId}</p>
                      <p className="text-neutral-700 mb-1"><strong>Issued on:</strong> {userData.issueDate}</p>
                      <p className="text-green-600 font-semibold mt-2 flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2" /> {userData.status}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

          }
        />

        {/* Intro Section */}




        {/* Certification Process */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-900 mb-4">
                Certification <span className="text-secondary-600">Process</span>
              </h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Our streamlined process ensures that you receive your certification in a timely manner after completing the necessary requirements.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {certificationSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex mb-8 relative"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="mr-6 relative">
                    <div className="w-12 h-12 bg-primary-900 rounded-full flex items-center justify-center text-white font-bold text-lg z-10 relative">
                      {index + 1}
                    </div>
                    {index < certificationSteps.length - 1 && (
                      <div className="absolute top-12 bottom-0 left-1/2 w-1 bg-primary-200 -translate-x-1/2 h-full"></div>
                    )}
                  </div>
                  <div className="bg-neutral-50 rounded-lg p-6 flex-grow">
                    <h3 className="text-xl font-heading font-semibold text-primary-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-primary-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Benefits of Our <span className="text-secondary-600">Certifications</span>
              </h2>
              <p className="text-neutral-300 max-w-2xl mx-auto">
                Our certifications provide numerous advantages that enhance your professional growth and career opportunities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certificationBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-primary-800 p-6 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <CheckCircle className="h-10 w-10 text-secondary-600 mb-4" />
                  <h3 className="text-xl font-heading font-semibold mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-neutral-300">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

// Sample data
const certifications = [
  {
    id: 1,
    name: 'NEBOSH International General Certificate',
    description: 'A globally recognized qualification for individuals with health and safety responsibilities. Covers risk assessment, hazard control, and health and safety management systems.',
    logo: 'https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 2,
    name: 'IOSH Managing Safely',
    description: 'A flexible course covering key health and safety issues, designed for managers and supervisors from any sector. Practical and interactive approach to learning.',
    logo: 'https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 3,
    name: 'ISO 45001 Lead Auditor',
    description: 'Training for professionals responsible for auditing organizational management systems for occupational health and safety against ISO 45001 requirements.',
    logo: 'https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 4,
    name: 'HAZWOPER Certification',
    description: 'Hazardous Waste Operations and Emergency Response training required for workers involved in hazardous substance clean-up operations or emergency response.',
    logo: 'https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 5,
    name: 'OPITO Approved Basic Offshore Safety',
    description: 'Essential safety training for personnel working in offshore environments, covering survival at sea, firefighting, first aid, and helicopter safety.',
    logo: 'https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 6,
    name: 'Construction Site Safety Management',
    description: 'Specialized training for managing safety on construction sites, covering legal requirements, risk assessment, and practical implementation of safety measures.',
    logo: 'https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];

const certificationSteps = [
  {
    title: 'Course Enrollment',
    description: 'Register for your chosen certification program through our website or in person at our facility.'
  },
  {
    title: 'Training Completion',
    description: 'Attend all required classes and complete practical exercises to gain the necessary knowledge and skills.'
  },
  {
    title: 'Assessment',
    description: 'Undergo evaluation through written exams, practical demonstrations, or project work as required by the certification standards.'
  },
  {
    title: 'Certification Issuance',
    description: 'Upon successful completion of all requirements, receive your official certification from the relevant accrediting body.'
  },
  {
    title: 'Continuous Professional Development',
    description: 'Maintain your certification through ongoing learning and periodic recertification as required.'
  }
];

const certificationBenefits = [
  {
    title: 'Global Recognition',
    description: 'Our certifications are recognized by employers and safety organizations worldwide, enhancing your international employability.'
  },
  {
    title: 'Career Advancement',
    description: 'Certified safety professionals are in high demand, commanding higher salaries and access to senior positions.'
  },
  {
    title: 'Practical Skills',
    description: 'Our certifications focus on applicable skills that you can immediately implement in your workplace.'
  },
  {
    title: 'Legal Compliance',
    description: 'Ensure your organization meets regulatory requirements by having certified safety personnel.'
  },
  {
    title: 'Networking Opportunities',
    description: 'Join a global community of safety professionals, sharing knowledge and best practices.'
  },
  {
    title: 'Continuous Learning',
    description: 'Access to ongoing education and updates to keep your knowledge current with evolving safety standards.'
  }
];

export default CertificationsPage;