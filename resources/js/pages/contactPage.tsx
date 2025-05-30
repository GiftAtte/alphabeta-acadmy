import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, ArrowRight, Building, MessageSquare } from 'lucide-react';
import Layout from '@/layouts/web-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await axios.post('/api/contacts', formData);

      if (response.data.success) {
        setSubmitted(true);
        toast.success('Your message has been sent successfully!');

        // Reset form after submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });

        // Reset submission status after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        toast.error('Please correct the errors in the form.');
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Hero section */}
      <section className="relative bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/marine.jpeg"
            alt="Safety Training"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-primary-800"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-4 px-4 py-1.5 bg-white/20 text-white border-0">
              Get In Touch
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Get in touch with our team to learn more about our courses or to discuss your training needs.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-10 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="flex items-center p-6 bg-white rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mr-5 bg-primary/10 p-3 rounded-full text-primary">
                  {highlight.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{highlight.title}</h3>
                  <p className="text-slate-600">{highlight.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Get in Touch</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions about our safety training programs? Our team is ready to help you find the right solution for your organization.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-primary-700 to-primary-900 text-white h-full rounded-xl p-8 md:p-10 shadow-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiA2aDZ2Nmgtdi0xMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30 z-0"></div>

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 z-0"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 z-0"></div>

                <div className="relative z-10">
                  <h2 className="text-3xl font-bold text-white mb-3">
                    Contact Information
                  </h2>
                  <p className="text-white/80 mt-2 mb-8">
                    We're here to help with any questions about our training programs.
                  </p>

                  <div className="space-y-6">
                    <ContactInfoItem
                      icon={<MapPin className="text-white" />}
                      title="Our Location"
                      content={[
                        "123 Safety Drive, Victoria Island",
                        "Lagos, Nigeria"
                      ]}
                    />

                    <ContactInfoItem
                      icon={<Phone className="text-white" />}
                      title="Phone Number"
                      content={[
                        "+234 123 456 7890",
                        "+234 987 654 3210"
                      ]}
                    />

                    <ContactInfoItem
                      icon={<Mail className="text-white" />}
                      title="Email Address"
                      content={[
                        "info@alphabetacademy.org",
                        "training@alphabetacademy.org"
                      ]}
                    />

                    <ContactInfoItem
                      icon={<Clock className="text-white" />}
                      title="Working Hours"
                      content={[
                        "Monday - Friday: 8:00 AM - 5:00 PM",
                        "Saturday: 9:00 AM - 1:00 PM"
                      ]}
                    />
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/20">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Connect With Us
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {/* WhatsApp */}


                      {/* Social Media Links */}
                      <div className="flex gap-2 flex-wrap">
                        <a
                          href="https://facebook.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-white/10 text-white flex items-center justify-center rounded-full hover:bg-blue-600 transition-colors"
                          aria-label="Facebook"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                          </svg>
                        </a>



                        <a
                          href="https://twitter.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-white/10 text-white flex items-center justify-center rounded-full hover:bg-black transition-colors"
                          aria-label="Twitter/X"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                        </a>

                        <a
                          href="https://linkedin.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-white/10 text-white flex items-center justify-center rounded-full hover:bg-blue-700 transition-colors"
                          aria-label="LinkedIn"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                          </svg>
                        </a>

                        <a
                          href="https://instagram.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-white/10 text-white flex items-center justify-center rounded-full hover:bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-600 transition-colors"
                          aria-label="Instagram"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white shadow-lg rounded-xl p-8">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold flex items-center gap-3 text-gray-900">
                    <MessageSquare className="h-6 w-6 text-primary" />
                    Send Us a Message
                  </h2>
                  <p className="text-gray-500 mt-2">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg mb-6 flex items-start"
                  >
                    <div className="bg-green-100 p-1.5 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Thank you for your message!</p>
                      <p className="text-sm">We've received your inquiry and will respond shortly.</p>
                    </div>
                  </motion.div>
                ) : null}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-primary'} focus:outline-none focus:ring-2 focus:border-transparent shadow-sm`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                        Your Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-primary'} focus:outline-none focus:ring-2 focus:border-transparent shadow-sm`}
                        placeholder="johndoe@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-primary'} focus:outline-none focus:ring-2 focus:border-transparent shadow-sm`}
                        placeholder="+234 123 456 7890"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="block text-sm font-medium text-slate-700">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 rounded-lg border ${errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-primary'} focus:outline-none focus:ring-2 focus:border-transparent shadow-sm`}
                        placeholder="e.g. Training Inquiry"
                      />
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-primary'} focus:outline-none focus:ring-2 focus:border-transparent shadow-sm`}
                      placeholder="Tell us about your training needs or any questions you have..."
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>

                  <div className="flex items-start flex-wrap gap-4">
                    <Button
                      type="submit"
                      className="px-6 py-3 flex items-center gap-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>


                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Find Us</h2>
            <p className="text-gray-500 mt-2">Visit our training center in Lagos</p>
          </div>

          <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63427.97620795932!2d3.364980535506093!3d6.4515393669227755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf4cc9b07f215%3A0x4c66d98482997d01!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1626299955065!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Alpha Beta Academy Location"
            ></iframe>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const contactHighlights = [
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Talk to Us",
    text: "Have questions? Call us directly for immediate assistance."
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Chat Support",
    text: "Connect with our support team via WhatsApp or live chat."
  },
  {
    icon: <Building className="h-6 w-6" />,
    title: "Visit Our Center",
    text: "Come see our state-of-the-art training facilities in Lagos."
  },
];

interface ContactInfoItemProps {
  icon: React.ReactNode;
  title: string;
  content: string[];
}

const ContactInfoItem = ({ icon, title, content }: ContactInfoItemProps) => {
  return (
    <div className="flex items-start">
      <div className="mr-3 text-white">{icon}</div>
      <div>
        <h4 className="font-semibold text-white">{title}</h4>
        <div className="mt-1 space-y-1">
          {content.map((line, i) => (
            <p key={i} className="text-white/80 text-sm">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
