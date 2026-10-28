import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, ChevronRight, Send, Clock, Award, CheckCircle, Shield } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import WhatsAppButton from './WhatsAppButton';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/contacts', formData);

      if (response.data.success) {
        setSuccess(true);
        toast.success('Your message has been sent successfully!');

        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          phone: ''
        });

        // Reset success state after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer>
      {/* Top Footer with Contact Form - Gray Background */}
      <div className="bg-gray-100 text-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Get in Touch</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions about our safety training programs? Our team is ready to help you find the right solution for your organization.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-3 p-6">
                  <Phone className="text-primary mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-semibold text-gray-900">Call Us</h3>
                    <div className="space-y-1">
                      <a href="tel:+2348033404197" className="text-gray-600 hover:text-primary transition-colors text-sm block">
                        +234 803 340 4197
                      </a>
                      <a href="tel:+2349157452720" className="text-gray-600 hover:text-primary transition-colors text-sm block">
                        +234 915 745 2720
                      </a>
                      <a href="tel:+2349027660870" className="text-gray-600 hover:text-primary transition-colors text-sm block">
                        +234 902 766 0870
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-6">
                  <Mail className="text-primary mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Us</h3>
                    <a href="mailto:info@alphabetasafetyacademy.org" className="text-gray-600 hover:text-primary transition-colors text-sm">
                      info@alphabetasafetyacademy.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-6">
                  <MapPin className="text-primary mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-semibold text-gray-900">Our Location</h3>
                    <p className="text-gray-600 text-sm">Road 5 Eliparanwo New-Layout off Ada Geroge, Port Harcourt, Rivers State, Nigeria</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-6">
                  <Clock className="text-primary mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-semibold text-gray-900">Office Hours</h3>
                    <p className="text-gray-600 text-sm">Mon-Fri: 8am - 5pm</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Contact Button */}
              <div className="mt-4 p-6">
                <WhatsAppButton
                  phoneNumber="+2348033404197"
                  message="Hello, I'm interested in learning more about your training programs."
                />
              </div>
            </div>

            <div className="lg:col-span-3 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>

              {success && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p>Thank you for your message! We'll contact you shortly.</p>
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1 block">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-300 rounded-md p-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-300 rounded-md p-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your email"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700 mb-1 block">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-md p-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Subject"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-medium text-gray-700 mb-1 block">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full bg-gray-50 border border-gray-300 rounded-md p-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Your message"
                    required
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
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-primary shadow-sm">
                  <img
                    src='/images/logo.jpeg'
                    className="w-full h-full object-cover"
                    alt="Alpha Beta Safety Academy Logo"
                    loading="lazy"
                    width="64"
                    height="64"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold">ALPHA BETA</h3>
                  <p className="text-xs text-primary-foreground/80">SAFETY ACADEMY</p>
                </div>
              </div>

              <p className="mb-6 text-primary-foreground/80 text-sm">
                A world-class safety training institute dedicated to empowering individuals and organizations with essential safety knowledge and skills through innovative and comprehensive training programs.
              </p>

            <div className="flex items-center space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="bg-white/10 p-2.5 rounded-full hover:bg-white/20 transition-colors">
                  <Facebook size={18} />
              </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="bg-white/10 p-2.5 rounded-full hover:bg-white/20 transition-colors">
                  <Twitter size={18} />
              </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="bg-white/10 p-2.5 rounded-full hover:bg-white/20 transition-colors">
                  <Linkedin size={18} />
              </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="bg-white/10 p-2.5 rounded-full hover:bg-white/20 transition-colors">
                  <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
              <h3 className="text-xl font-bold mb-5">Quick Links</h3>
              <ul className="space-y-3 text-sm">
              {[
                { name: 'About Us', path: '/about' },
                  { name: 'Our Courses', path: '/courses' },
                { name: 'Certifications', path: '/certifications' },
                  { name: 'Training Methods', path: '/training-methods' },
                  { name: 'Why Choose Us', path: '/why-choose-us' },
                  { name: 'Contact Us', path: '/contact' },
              ].map((link) => (
                  <li key={link.name} className="flex items-center group">
                    <ChevronRight size={16} className="text-secondary mr-2 group-hover:translate-x-1 transition-transform" />
                    <Link href={link.path} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

            {/* Our Courses */}
          <div>
              <h3 className="text-xl font-bold mb-5">Popular Courses</h3>
              <ul className="space-y-3 text-sm">
                {[
                  { name: 'HSE Level 1-3', path: '/courses' },
                  { name: 'First Aid & CPR', path: '/courses' },
                  { name: 'Fire Safety & Prevention', path: '/courses' },
                  { name: 'Offshore Safety Training', path: '/courses' },
                  { name: 'Confined Space Entry', path: '/courses' },
                  { name: 'Material Handling', path: '/courses' },
                ].map((course, index) => (
                  <li key={index} className="flex items-center group">
                    <CheckCircle size={16} className="text-secondary mr-2" />
                    <Link href={course.path} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                      {course.name}
                    </Link>
              </li>
                ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
              <h3 className="text-xl font-bold mb-5">Newsletter</h3>
              <p className="mb-4 text-primary-foreground/80 text-sm">Subscribe to our newsletter for the latest updates, safety tips, and exclusive offers.</p>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                    className="p-2.5 text-sm flex-grow bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-secondary rounded-l-md text-primary-foreground"
                required
              />
              <button
                type="submit"
                    className="bg-secondary hover:bg-secondary/90 p-2.5 rounded-r-md flex items-center justify-center transition-colors"
                aria-label="Subscribe"
              >
                <Send size={18} />
              </button>
                </div>
            </form>

              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="font-semibold mb-3 flex items-center">
                  <Award className="mr-2" size={18} />
                  Certifications
                </h4>
                <div className="flex flex-wrap justify-center gap-4 items-center">
                  <img src="/images/brand1.jpeg" alt="Certification" className="h-8 sm:h-10 md:h-12 w-auto bg-white p-1 rounded" loading="lazy" />
                  <img src="/images/brand2.jpeg" alt="Certification" className="h-8 sm:h-10 md:h-12 w-auto bg-white p-1 rounded" loading="lazy" />
                  <img src="/images/brand3.jpeg" alt="Certification" className="h-8 sm:h-10 md:h-12 w-auto bg-white p-1 rounded" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>

      {/* Bottom Footer */}
      <div className="bg-gray-900 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">&copy; {currentYear} ALPHA BETA SAFETY ACADEMY (ABSA) RC # 6874094. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookie-policy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
