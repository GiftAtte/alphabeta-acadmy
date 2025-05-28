import { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';
import { Clock, Monitor, Users, Filter, ChevronRight, Award } from 'lucide-react';
import Layout from '@/layouts/web-layout';
import CourseList from '@/components/course-list';

const CoursesPage = () => {



  return (
    <>
     <Layout>

       <PageHeader 
        title="Our Courses" 
        subtitle="Explore our comprehensive range of safety training programs designed to meet global standards."
        backgroundImage="/images/bgImg3.avif"
      />
      
      <CourseList/>
   
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-900 mb-4">
              How to <span className="text-secondary-600">Enroll</span>
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Following these simple steps to start your journey toward a globally recognized safety certification.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {enrollmentSteps.map((step, index) => (
              <motion.div
                key={index}
                className="bg-neutral-50 p-6 rounded-lg text-center relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="w-12 h-12 bg-primary-900 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-heading font-semibold text-primary-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-neutral-600">
                  {step.description}
                </p>
                
                {index < enrollmentSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ChevronRight size={24} className="text-secondary-600" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="inline-block bg-secondary-600 hover:bg-secondary-700 text-white py-3 px-8 rounded-md transition-colors font-medium"
            >
              Contact Us to Enroll
            </Link>
          </div>
        </div>
      </section>
     </Layout>
    </>
  );
};





const enrollmentSteps = [
  {
    title: 'Course Selection',
    description: 'Browse our course catalog and select the program that best fits your career goals and requirements.'
  },
  {
    title: 'Application',
    description: 'Complete our simple application form with your personal and professional details.'
  },
  {
    title: 'Payment',
    description: 'Secure your spot by making payment through our flexible payment options.'
  },
  {
    title: 'Start Learning',
    description: 'Receive your course materials and begin your journey to becoming safety certified.'
  }
];

export default CoursesPage;