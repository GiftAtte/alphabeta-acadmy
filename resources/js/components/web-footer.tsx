
import { Link } from '@inertiajs/react';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, ChevronRight, Send } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4">ALPHA BETA SAFETY ACADEMY</h3>
            <p className="mb-6 text-neutral-300">
              A world-class safety training institute dedicated to empowering individuals and organizations with essential safety knowledge and skills.
            </p>
            <div className="flex items-center space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white hover:text-secondary-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-white hover:text-secondary-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white hover:text-secondary-600 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white hover:text-secondary-600 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Courses', path: '/courses' },
                { name: 'Certifications', path: '/certifications' },
               
              ].map((link) => (
                <li key={link.name} className="flex items-center">
                  <ChevronRight size={16} className="text-secondary-100 mr-2" />
                  <Link href={link.path} className="text-neutral-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-secondary-200 mr-3 mt-1 flex-shrink-0" size={20} />
                <span className="text-neutral-300">123 Safety Drive, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-secondary-200 mr-3 flex-shrink-0" size={20} />
                <a href="tel:+2341234567890" className="text-neutral-300 hover:text-white transition-colors">
                  +234 123 456 7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="text-secondary-200 mr-3 flex-shrink-0" size={20} />
                <a href="mailto:info@alphabetasafety.com" className="text-neutral-300 hover:text-white transition-colors">
                  info@alphabetasafety.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4">Newsletter</h3>
            <p className="mb-4 text-neutral-300">Subscribe to our newsletter for the latest updates and safety tips.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="p-2 text-sm flex-grow bg-white border border-white focus:outline-none focus:ring-2 focus:ring-primary-100 rounded-l-md text-primary-900"
                required
              />
              <button
                type="submit"
                className="bg-primary-500 hover:bg-primary-700 p-2 rounded-r-md flex items-center justify-center transition-colors"
                aria-label="Subscribe"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-primary-100 mt-10 pt-6 text-center text-neutral-400">
          <p>&copy; {currentYear} ALPHA BETA SAFETY ACADEMY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;