import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Sparkles, Send, Award, BookOpen, Calendar, Clock } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const benefits = [
  'Internationally recognized certifications',
  'Expert instructors with industry experience',
  'Hands-on practical training sessions',
  'Flexible scheduling options',
  'Comprehensive learning materials',
  'Post-training support and resources'
];

const upcomingCourses = [
  {
    title: 'HSE Level 1',
    date: 'June 15, 2023',
    spots: '4 spots left'
  },
  {
    title: 'Fire Safety & Prevention',
    date: 'June 22, 2023',
    spots: '6 spots left'
  },
  {
    title: 'First Aid & CPR',
    date: 'July 5, 2023',
    spots: '8 spots left'
  }
];

const CallToAction = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary to-primary-600 z-0"></div>

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white/20 transform -translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-white/10 transform -translate-y-1/2"></div>
      </div>

      {/* Subtle diagonal pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiA2aDZ2Nmgtdi0xMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

      {/* Floating particles */}
      <motion.div
        className="absolute top-1/4 left-1/4 text-white/30"
        animate={{
          y: [0, -15, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }}
      >
        <Sparkles size={24} />
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-1/4 text-white/30"
        animate={{
          y: [0, 15, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut"
        }}
      >
        <Sparkles size={20} />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-4 px-4 py-1.5 bg-white/20 text-white border-0 backdrop-blur-sm">
            Start Your Safety Career
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Advance Your Safety Career?</h2>
          <p className="text-white/90 max-w-2xl mx-auto text-lg">
            Join thousands of professionals who have transformed their careers with our industry-leading safety training programs.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border-0 rounded-xl p-8 md:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Request Information</h3>
                  <p className="text-gray-600 mt-2 text-sm">Fill out the form and we'll contact you shortly</p>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="full-name"
                      className="w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">
                      Course Interest
                    </label>
                    <select
                      id="interest"
                      className="w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
                    >
                      <option value="">Select a course</option>
                      <option value="hse">HSE Levels 1-3</option>
                      <option value="fire">Fire Safety & Prevention</option>
                      <option value="firstaid">First Aid & CPR</option>
                      <option value="offshore">Offshore Safety Training</option>
                      <option value="confined">Confined Space Entry</option>
                      <option value="hazmat">HAZMAT Handling</option>
                    </select>
                  </div>

                  <Button
                    className="w-full rounded-lg py-6 font-medium"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Get Started
                  </Button>

                  <div className="text-center">
                    <p className="text-xs text-gray-500">
                      We respect your privacy. No spam, ever.
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <Award className="mr-3 h-6 w-6 text-white/80" />
                    Why Choose Alpha Beta Safety Academy?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <div className="bg-white/20 p-1.5 mt-0.5 rounded-full mr-3 flex-shrink-0">
                          <CheckCircle className="text-white w-4 h-4" />
                        </div>
                        <span className="text-white/90 font-medium">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-white/80" />
                    Upcoming Course Schedule
                  </h4>
                  <div className="space-y-3">
                    {upcomingCourses.map((course, index) => (
                      <div
                        key={index}
                        className={`flex justify-between items-center ${index < upcomingCourses.length - 1 ? 'border-b border-white/10 pb-3' : ''}`}
                      >
                        <div className="flex items-center">
                          <span className="text-white font-medium">{course.title}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center text-white/80 text-sm">
                            <Clock className="mr-1 h-3 w-3" />
                            {course.date}
                          </div>
                          <span className="text-amber-300/90 text-xs">{course.spots}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    className="bg-white hover:bg-white/90 text-primary rounded-full px-8 border-0"
                  >
                    <Link
                      href="/courses"
                      className="flex items-center justify-center"
                    >
                      Explore All Courses <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="bg-transparent text-white border-white/40 rounded-full px-8 hover:bg-white/10 hover:border-white/60"
                  >
                    <Link
                      href="/contact"
                      className="flex items-center justify-center"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Contact Us
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
