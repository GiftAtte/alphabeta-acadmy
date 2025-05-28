import { useState, useEffect } from 'react';
import { Link as InertiaLink, usePage } from '@inertiajs/react';
import { Menu, X, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { url } = usePage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Certifications', path: '/certifications' },
    // { name: 'Training Methods', path: '/training-methods' },
    // { name: 'Why Choose Us', path: '/why-choose-us' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    return url === path;
  };

  return (
    <header
      className={cn(`w-full z-50 transition-all duration-300 bg-white py-3 shaow-md`,
        isScrolled &&  'fixed bg-white/70 backdrop-blur-md border-b border-gray-200/50'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <InertiaLink href="/" className="flex items-center space-x-2">
            <img src='/images/logo.jpeg' className='w-16 h-16 object-cover rounded-full'/>
          </InertiaLink>
          <nav className="hidden lg:flex space-x-6">
            {navLinks.map((link) => (
              <InertiaLink
                key={link.name}
                href={link.path}
                className={`font-medium text-[17px] transition-colors duration-200 hover:text-primary-400 text-gray-600 ${
                  isActive(link.path)
                    ? 'text-primary-300 '
                    : isScrolled
                      ? 'text-primary-900'
                      : ''
                }`}
              >
                {link.name}
              </InertiaLink>
            ))}
          </nav>
          <Button className=' cursor-pointer hidden lg:block' size={'lg'}>Verify Certificate</Button>

          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? 'text-primary-900' : 'text-primary'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? 'text-primary-900' : 'text-primary'}`} />
            )}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <nav className="lg:hidden backdrop-blur-md bg-white/80 shadow-lg py-4 px-6 absolute w-full animate-slide-down border-t border-gray-200/50 z-50">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <InertiaLink
                key={link.name}
                href={link.path}
                className={`font-medium text-sm transition-colors duration-200 hover:text-secondary-600 ${
                  isActive(link.path) ? 'text-secondary-600' : 'text-primary-900'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </InertiaLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;