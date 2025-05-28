import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Layout from '@/layouts/web-layout';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    console.log(formData);
    setSubmitted(true);
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
  };

  return (
    <>
      <Layout>
        <PageHeader 
        title="Contact Us" 
        subtitle="Get in touch with our team to learn more about our courses or to discuss your training needs."
        backgroundImage="/images/marine.jpeg"
      />
      
      {/* Contact Information and Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact Information */}
            <motion.div 
              className="lg:w-1/3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-heading font-bold text-primary-900 mb-6">
                Contact <span className="text-secondary-600">Information</span>
              </h2>
              
              <div className="space-y-6">
                <ContactInfoItem 
                  icon={<MapPin className="text-secondary-600" />}
                  title="Our Location"
                  content={[
                    "123 Safety Drive, Victoria Island",
                    "Lagos, Nigeria"
                  ]}
                />
                
                <ContactInfoItem 
                  icon={<Phone className="text-secondary-600" />}
                  title="Phone Number"
                  content={[
                    "+234 123 456 7890",
                    "+234 987 654 3210"
                  ]}
                />
                
                <ContactInfoItem 
                  icon={<Mail className="text-secondary-600" />}
                  title="Email Address"
                  content={[
                    "info@alphabetasafety.com",
                    "training@alphabetasafety.com"
                  ]}
                />
                
                <ContactInfoItem 
                  icon={<Clock className="text-secondary-600" />}
                  title="Working Hours"
                  content={[
                    "Monday - Friday: 8:00 AM - 5:00 PM",
                    "Saturday: 9:00 AM - 1:00 PM"
                  ]}
                />
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-heading font-semibold text-primary-900 mb-4">
                  Connect With Us
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#1877F2] text-white flex items-center justify-center rounded-full hover:opacity-90 transition-opacity"
                    aria-label="Facebook"
                  >
                    <i className="fab fa-facebook-f"></i>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#1DA1F2] text-white flex items-center justify-center rounded-full hover:opacity-90 transition-opacity"
                    aria-label="Twitter"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#0A66C2] text-white flex items-center justify-center rounded-full hover:opacity-90 transition-opacity"
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
                    className="w-10 h-10 bg-[#E4405F] text-white flex items-center justify-center rounded-full hover:opacity-90 transition-opacity"
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
            </motion.div>
            
            {/* Contact Form */}
            <motion.div 
              className="lg:w-2/3"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-neutral-50 rounded-lg p-8 shadow-sm">
                <h2 className="text-3xl font-heading font-bold text-primary-900 mb-6">
                  Send Us a <span className="text-secondary-600">Message</span>
                </h2>
                
                {submitted ? (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    <p>Thank you for your message! We will get back to you soon.</p>
                  </div>
                ) : null}
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-neutral-700 font-medium mb-2">
                        Your Name *
                      </label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-900"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-neutral-700 font-medium mb-2">
                        Your Email *
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-900"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-neutral-700 font-medium mb-2">
                        Phone Number
                      </label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-900"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-neutral-700 font-medium mb-2">
                        Subject *
                      </label>
                      <select 
                        id="subject" 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-900"
                      >
                        <option value="">Select a subject</option>
                        <option value="Course Inquiry">Course Inquiry</option>
                        <option value="Corporate Training">Corporate Training</option>
                        <option value="Certification">Certification</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-neutral-700 font-medium mb-2">
                      Your Message *
                    </label>
                    <textarea 
                      id="message" 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-900"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="bg-secondary-600 hover:bg-secondary-700 text-white py-3 px-6 rounded-md transition-colors font-medium flex items-center"
                  >
                    <Send className="mr-2" size={18} />
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Map */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-900 mb-4">
              Our <span className="text-secondary-600">Location</span>
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Visit our state-of-the-art training facility in Lagos, Nigeria.
            </p>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-md h-96">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.655193673626!2d3.4198495755824164!3d6.437490093544037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf53280e7648f%3A0x3b23b20dcc7c678e!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1685536246202!5m2!1sen!2sng" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="ALPHA BETA SAFETY ACADEMY Location"
            ></iframe>
          </div>
        </div>
      </section>
      </Layout>
    </>
  );
};

interface ContactInfoItemProps {
  icon: React.ReactNode;
  title: string;
  content: string[];
}

const ContactInfoItem = ({ icon, title, content }: ContactInfoItemProps) => {
  return (
    <div className="flex">
      <div className="mr-4 mt-1">
        {icon}
      </div>
      <div>
        <h3 className="font-heading font-semibold text-primary-900 mb-1">
          {title}
        </h3>
        {content.map((line, index) => (
          <p key={index} className="text-neutral-600">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ContactPage;