import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import Layout from '@/layouts/web-layout';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Head } from '@inertiajs/react';
import PageHeader from '../components/PageHeader';

interface ContactHighlight {
  icon: React.ReactNode;
  title: string;
  text: string;
}

interface ContactInfoItemProps {
  icon: React.ReactNode;
  title: string;
  content: string[];
}

// Contact Info Item Component
const ContactInfoItem = ({ icon, title, content }: ContactInfoItemProps) => (
  <div className="flex items-start space-x-3">
    <div className="text-white/90 mt-1 flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="font-semibold text-white">{title}</h3>
      <div className="space-y-1">
        {content.map((item, index) => (
          <p key={index} className="text-white/80 text-sm">{item}</p>
        ))}
      </div>
    </div>
  </div>
);

// Contact Highlights Data
const contactHighlights: ContactHighlight[] = [
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Phone Support",
    text: "Call us directly for immediate assistance"
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email Support",
    text: "Send us an email for detailed inquiries"
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Quick Response",
    text: "We typically respond within 24 hours"
  }
];

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
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        toast.error('Please correct the errors in the form.');
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Structured data for organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Alpha Beta Safety Academy",
    "url": "https://alphabetacademy.org",
    "logo": "/images/logo.jpeg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+2348033404197",
      "contactType": "customer service",
      "email": "info@alphabetasafetyacademy.org",
      "areaServed": "Nigeria",
      "availableLanguage": ["English"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Road 5 Eliparanwo New-Layout off Ada Geroge",
      "addressLocality": "Port Harcourt",
      "addressRegion": "Rivers State",
      "addressCountry": "Nigeria"
    },
    "openingHours": "Mo-Fr 08:00-17:00, Sa 09:00-13:00"
  };

  return (
    <Layout>
      <Head>
        <title>Contact Us | Alpha Beta Safety Academy - Safety Training Institute</title>
        <meta name="description" content="Get in touch with Alpha Beta Safety Academy for professional safety training courses. Contact us for inquiries about our accredited safety certification programs in Nigeria." />
        <meta name="keywords" content="safety training contact, safety certification inquiry, training institute contact, safety courses Nigeria" />
        <meta property="og:title" content="Contact Alpha Beta Safety Academy - Safety Training Institute" />
        <meta property="og:description" content="Contact us for professional safety training courses and certification programs. We're here to help with your training needs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alphabetacademy.org/contact" />
        <meta property="og:image" content="https://alphabetacademy.org/images/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://alphabetacademy.org/contact" />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Head>

      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with our team to learn more about our courses or to discuss your training needs."
        backgroundImage="/images/marine.jpeg"
      />

      {/* Highlights Section */}
      <section className="py-10 bg-slate-50" aria-label="Contact options">
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
                <div className="mr-5 bg-primary/10 p-3 rounded-full text-primary" aria-hidden="true">
                  {highlight.icon}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{highlight.title}</h2>
                  <p className="text-slate-600">{highlight.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="py-16 bg-white" aria-label="Contact form and information">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Get in Touch</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-4" aria-hidden="true"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions about our safety training programs? Our team is ready to help you find the right solution for your organization.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 h-full rounded-xl p-8 md:p-10 shadow-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiA2aDZ2Nmgtdi0xMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30 z-0" aria-hidden="true"></div>

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 z-0" aria-hidden="true"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 z-0" aria-hidden="true"></div>

                <div className="relative z-10">
                  <h2 className="text-3xl font-bold text-white mb-3">
                    Contact Information
                  </h2>
                  <p className="text-white/80 mt-2 mb-8">
                    We're here to help with any questions about our training programs.
                  </p>

                  <div className="space-y-6">
                    <ContactInfoItem
                      icon={<MapPin className="text-white/90" />}
                      title="Our Location"
                      content={[
                        "Road 5 Eliparanwo New-Layout off Ada Geroge, Port Harcourt",
                        "Rivers State, Nigeria"
                      ]}
                    />

                    <div className="flex items-start space-x-3">
                      <Phone className="text-white/90 mt-1 flex-shrink-0" size={20} aria-hidden="true" />
                      <div>
                        <h3 className="font-semibold text-white">Call Us</h3>
                        <div className="space-y-1">
                          <a href="tel:+2348033404197" className="text-white/80 hover:text-white transition-colors text-sm block">
                            +234 803 340 4197
                          </a>
                          <a href="tel:+2349157452720" className="text-white/80 hover:text-white transition-colors text-sm block">
                            +234 915 745 2720
                          </a>
                          <a href="tel:+2349027660870" className="text-white/80 hover:text-white transition-colors text-sm block">
                            +234 902 766 0870
                          </a>
                        </div>
                      </div>
                    </div>

                    <ContactInfoItem
                      icon={<Mail className="text-white/90" />}
                      title="Email Address"
                      content={[
                        "info@alphabetasafetyacademy.org",
                        "training@alphabetasafetyacademy.org"
                      ]}
                    />

                    <ContactInfoItem
                      icon={<Clock className="text-white/90" />}
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
                      <div className="flex gap-2 flex-wrap">
                        <a
                          href="https://facebook.com/alphabetacademy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-white/10 text-white/90 hover:text-white flex items-center justify-center rounded-full hover:bg-blue-600 transition-colors"
                          aria-label="Follow us on Facebook"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                          </svg>
                        </a>

                        <a
                          href="https://twitter.com/alphabetacademy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-white/10 text-white/90 hover:text-white flex items-center justify-center rounded-full hover:bg-black transition-colors"
                          aria-label="Follow us on Twitter"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                        </a>

                        <a
                          href="https://linkedin.com/company/alphabetacademy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-white/10 text-white/90 hover:text-white flex items-center justify-center rounded-full hover:bg-blue-700 transition-colors"
                          aria-label="Follow us on LinkedIn"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                          </svg>
                        </a>

                        <a
                          href="https://instagram.com/alphabetacademy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-white/10 text-white/90 hover:text-white flex items-center justify-center rounded-full hover:bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-600 transition-colors"
                          aria-label="Follow us on Instagram"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
                    <MessageSquare className="h-6 w-6 text-primary" aria-hidden="true" />
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
                    role="alert"
                  >
                    <div className="bg-green-100 p-1.5 rounded-full mr-3" aria-hidden="true">
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

                <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
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
                      placeholder="Tell us about your inquiry..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full md:w-auto"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-5 w-5" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
