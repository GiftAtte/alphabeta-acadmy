import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';
import { ChevronRight, Clipboard, FileCheck, CreditCard, GraduationCap, Star, Quote, ArrowRight, Award, BookOpen } from 'lucide-react';
import Layout from '@/layouts/web-layout';
import CourseList from '@/components/course-list';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

      {/* Testimonials Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              What Our Students Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from professionals who have completed our safety training programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg relative shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <Quote className="h-10 w-10 text-primary/20 absolute -top-2 -left-2" />
                <div className="flex items-center mb-4">
                  <div className="flex text-amber-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">5.0</span>
                </div>
                <p className="text-foreground italic mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center mt-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary font-medium">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              How to <span className="text-secondary">Enroll</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow these simple steps to start your journey toward a globally recognized safety certification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {enrollmentSteps.map((step, index) => (
              <motion.div
                key={index}
                className="bg-card p-6 rounded-lg text-center relative shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <div className="mb-4">
                  {getStepIcon(index)}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>

                {index < enrollmentSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ChevronRight size={24} className="text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/student/enroll">
                Enroll Now
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary to-primary/80 z-0"></div>

        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/20"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white/20 transform translate-x-1/4 translate-y-1/4"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-white/10 transform -translate-y-1/2"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 px-4 py-1.5 bg-white/20 text-white border-0 backdrop-blur-sm">
              Certification Programs
            </Badge>
            <h2 className="text-4xl font-bold mb-6 text-white">Ready to Advance Your Safety Career?</h2>
            <p className="mb-8 text-white/90 text-lg max-w-2xl mx-auto">
              Join thousands of professionals who have enhanced their careers with our industry-recognized safety certifications.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 border-0 rounded-full px-8">
                <Link href="/student/enroll" className="flex items-center">
                  Enroll Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent text-white border-white rounded-full px-8 hover:bg-white/10">
                <Link href="/contact" className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Request Information
                </Link>
              </Button>
            </div>

            <div className="flex justify-center mt-12 space-x-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <p className="text-white text-sm">Globally Recognized</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <p className="text-white text-sm">Expert Instructors</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3">
                  <FileCheck className="h-8 w-8 text-white" />
                </div>
                <p className="text-white text-sm">Industry Compliant</p>
              </div>
            </div>
          </div>
        </div>
      </section>
     </Layout>
    </>
  );
};

const getStepIcon = (index: number) => {
  const icons = [
    <Clipboard key="clipboard" className="h-8 w-8 text-primary mx-auto" />,
    <FileCheck key="filecheck" className="h-8 w-8 text-primary mx-auto" />,
    <CreditCard key="creditcard" className="h-8 w-8 text-primary mx-auto" />,
    <GraduationCap key="graduation" className="h-8 w-8 text-primary mx-auto" />
  ];
  return icons[index];
};

const testimonials = [
  {
    quote: "The HSE Management course completely transformed my approach to workplace safety. The instructors were knowledgeable and the content was directly applicable to my job.",
    name: "Michael Johnson",
    role: "Safety Manager, Global Engineering"
  },
  {
    quote: "The practical training in Fire Fighting and Prevention was invaluable. I feel confident in my ability to respond effectively in emergency situations.",
    name: "Sarah Williams",
    role: "Operations Supervisor, Manufacturing"
  },
  {
    quote: "As someone new to the industry, the Introduction to HSE course provided me with a solid foundation. The certification helped me secure my current position.",
    name: "David Chen",
    role: "HSE Coordinator, Construction"
  }
];

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
