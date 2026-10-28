import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Sparkles, Send, Award, BookOpen, Calendar, Clock, AlertCircle, Phone } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface Training {
  id: string;
  name?: string;
  title?: string;
  duration: string;
  date?: string;
  spotsLeft?: number;
}

const benefits = [
  'Internationally recognized certifications',
  'Expert instructors with industry experience',
  'Hands-on practical training sessions',
  'Flexible scheduling options',
  'Comprehensive learning materials',
  'Post-training support and resources'
];

const DynamicCallToAction = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    training_id: '',
    phone: '',
    message: '',
  });
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [upcomingCourses, setUpcomingCourses] = useState<Training[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Fetch trainings from the server when component mounts
  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await axios.get('/api/trainings');
        if (response.data && response.data.data) {
          // Sort by featured first, then alphabetically
          const sortedTrainings = response.data.data.sort((a: Training, b: Training) => {
            // Use title if available (from API) or fallback to name
            const nameA = a.title || a.name || '';
            const nameB = b.title || b.name || '';
            return nameA.localeCompare(nameB);
          });

          // Map to ensure consistent property names
          const processedTrainings = sortedTrainings.map((training: Training) => ({
            ...training,
            name: training.title || training.name // Ensure name is always available
          }));

          setTrainings(processedTrainings);

          // Use the first 3 trainings for upcoming courses with randomized dates and spots
          const currentDate = new Date();
          const upcomingTrainings = processedTrainings.slice(0, 3).map((training: Training) => {
            // Add 7-30 days to current date
            const daysToAdd = Math.floor(Math.random() * 23) + 7;
            const date = new Date(currentDate);
            date.setDate(date.getDate() + daysToAdd);

            // Format date as Month Day, Year
            const formattedDate = date.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            });

            // Random spots left between 2-12
            const spotsLeft = Math.floor(Math.random() * 10) + 2;

            return {
              ...training,
              date: formattedDate,
              spotsLeft
            };
          });

          setUpcomingCourses(upcomingTrainings);
        }
      } catch (error) {
        console.error('Error fetching trainings:', error);
        // Fallback to using mock data if API fails
        setUpcomingCourses([
          {
            id: '1',
            name: 'HSE Level 1',
            duration: '5 days',
            date: 'June 15, 2023',
            spotsLeft: 4
          },
          {
            id: '2',
            name: 'Fire Safety & Prevention',
            duration: '3 days',
            date: 'June 22, 2023',
            spotsLeft: 6
          },
          {
            id: '3',
            name: 'First Aid & CPR',
            duration: '2 days',
            date: 'July 5, 2023',
            spotsLeft: 8
          }
        ]);
      }
    };

    fetchTrainings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.training_id) {
      setError('Please fill out all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // First try to submit as a lead
      const response = await axios.post('/api/leads', formData);

      if (response.data.success) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          training_id: '',
          phone: '',
          message: '',
        });
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      } else {
        setError(response.data.message || 'An error occurred. Please try again.');
      }
    } catch (leadError: unknown) {
      console.error('Error submitting lead:', leadError);

      // If lead submission fails, try to submit as a contact instead
      try {
        // Prepare contact data
        const contactData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: `Training Interest: ${formData.training_id}`,
          message: formData.message || `I'm interested in learning more about your training programs.`,
        };

        const contactResponse = await axios.post('/api/contacts', contactData);

console.log('contact..............',contactResponse)

        if (contactResponse.data.success) {
          setSuccess(true);
          setFormData({
            name: '',
            email: '',
            training_id: '',
            phone: '',
            message: '',
          });
          setTimeout(() => {
            setSuccess(false);
          }, 5000);
        } else {
          setError(contactResponse.data.message || 'An error occurred. Please try again.');
        }
      } catch (contactError: unknown) {
        // Both submission methods failed
        // Check if it's an axios error with response data
        const axiosError = contactError as { response?: { data?: { message?: string } } };
        if (axiosError.response && axiosError.response.data) {
          setError(axiosError.response.data.message || 'An error occurred. Please try again.');
        } else {
          setError('Network error. Please check your connection and try again.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

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

                {success && (
                  <div className="mb-6 bg-green-50 border border-green-100 text-green-700 px-4 py-3 rounded-md flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <p>Thank you for your interest! We'll contact you shortly with more information.</p>
                  </div>
                )}

                {error && (
                  <div className="mb-6 bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-md flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                    <p>{error}</p>
                  </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
                      placeholder="Your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="training_id" className="block text-sm font-medium text-gray-700 mb-1">
                      Course Interest <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="training_id"
                      name="training_id"
                      value={formData.training_id}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
                    >
                      <option value="">Select a course</option>
                      {trainings.map((training) => (
                        <option key={training.id} value={training.id}>
                          {training.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
                      placeholder="Any specific questions or requirements?"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-md font-medium transition-colors w-full md:w-auto flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </button>

                  <div className="mt-4 text-center text-gray-500 text-sm">
                    <p>or</p>

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
                          <span className="text-white font-medium">{course.name}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center text-white/80 text-sm">
                            <Clock className="mr-1 h-3 w-3" />
                            {course.date}
                          </div>
                          <span className="text-amber-300/90 text-xs">{course.spotsLeft} spots left</span>
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

export default DynamicCallToAction;
