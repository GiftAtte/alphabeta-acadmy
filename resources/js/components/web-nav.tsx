import { useState, useEffect } from 'react';
import { Link as InertiaLink, usePage } from '@inertiajs/react';
import { Menu, X, Award, Phone, Mail, MapPin, Clock, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import VerifyCertificate from './home/VerifyCertificate';
import type { SharedData } from '@/types/index.d';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const page = usePage<SharedData>();
  const { url } = page;
  const { auth } = page.props;
  const isLoggedIn = auth?.user !== undefined && auth?.user !== null;
  const isAdmin = isLoggedIn && auth?.user?.role === 'admin';

  // Add debugging log for development
  useEffect(() => {
    console.log('Current URL:', url);
    console.log('Auth state:', auth);
  }, [url, auth]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
    { name: 'Training Methods', path: '/training-methods' },
    { name: 'Why Choose Us', path: '/why-choose-us' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return url === path;
    }
    return url.startsWith(path);
  };

  return (
    <>
      {/* Top Contact Bar - Hidden when scrolled */}
      <div
        className={cn(
          "bg-primary text-primary-foreground py-2 transition-all duration-300 hidden md:block",
          isScrolled ? "opacity-0 h-0 py-0 overflow-hidden" : "opacity-100"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center space-x-4">
              <a href="tel:+2348033404197" className="hidden md:flex items-center text-sm text-white">
                <Phone className="h-4 w-4 mr-1" />
                +234 803 340 4197
              </a>
              <a href="mailto:info@alphabetasafetyacademy.org" className="flex items-center text-sm text-white">
                <Mail className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">info@alphabetasafetyacademy.org</span>
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center text-sm text-white max-w-md">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="truncate">Road 5 Eliparanwo New-Layout off Ada Geroge, Port Harcourt, Rivers State, Nigeria</span>
              </div>
              <div className="flex items-center text-sm text-white">
                <Clock className="h-4 w-4 mr-1" />
                <span>Mon-Fri: 8:00AM - 5:00PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation - Fixed when scrolled */}
      <header
        className={cn(
          "bg-white w-full z-50 transition-all duration-300",
          isScrolled ? "fixed top-0 left-0 right-0 shadow-md" : "shadow-sm"
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-primary shadow-sm">
                <img
                  src="/images/logo.jpeg"
                  className="w-full h-full object-cover"
                  alt="Alpha Beta Safety Academy Logo"
                  loading="eager"
                  fetchPriority="high"
                  width="64"
                  height="64"
                />
              </div>
              <div className="hidden md:block">
                <h1 className="font-bold text-lg text-primary">ALPHA BETA</h1>
                <p className="text-xs text-gray-600">SAFETY ACADEMY  </p>
              </div>
            </a>

            <nav className="hidden lg:flex space-x-6">
              {navLinks.map((link) => (
                <InertiaLink
                  key={link.name}
                  href={link.path}
                  className={`font-medium text-sm transition-colors ${
                    isActive(link.path)
                      ? 'text-primary font-semibold border-b-2 border-primary'
                      : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {link.name}
                </InertiaLink>
              ))}
            </nav>

            <div className="hidden lg:flex items-center space-x-3">
              {isLoggedIn && auth?.user ? (
                <div className="flex items-center space-x-4">
                  {isAdmin && (
                    <InertiaLink href="/admin/dashboard">
                      <Button variant="outline" size="sm">
                        Admin Dashboard
                      </Button>
                    </InertiaLink>
                  )}
                  <InertiaLink href="/logout" method="post" as="button">
                    <Button variant="ghost" size="sm">
                      Logout
                    </Button>
                  </InertiaLink>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {auth.user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <InertiaLink href="/login">
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </InertiaLink>
                  <InertiaLink href="/student/enroll">
                    <Button size="sm">
                      Enroll Now
                    </Button>
                  </InertiaLink>
                </div>
              )}
              <Button
                size="sm"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                onClick={() => setIsVerifyModalOpen(true)}
              >
                <Award className="mr-2 h-4 w-4" />
                Verify Certificate
              </Button>
            </div>

            <button
              className="lg:hidden p-2 text-gray-500 hover:text-primary-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="container mx-auto px-4 py-3 border-t">
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <InertiaLink
                    key={link.name}
                    href={link.path}
                    className={`px-3 py-2 rounded-md ${
                      isActive(link.path)
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </InertiaLink>
                ))}
              </nav>

              <div className="mt-4 flex flex-col space-y-2">
                {isLoggedIn && auth?.user ? (
                  <div className="space-y-1">
                    {isAdmin && (
                      <InertiaLink
                        href="/admin/dashboard"
                        className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-foreground/80 hover:bg-muted hover:border-primary/40 hover:text-foreground"
                      >
                        Admin Dashboard
                      </InertiaLink>
                    )}
                    <InertiaLink
                      href="/profile"
                      className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-foreground/80 hover:bg-muted hover:border-primary/40 hover:text-foreground"
                    >
                      My Profile
                    </InertiaLink>
                    <InertiaLink
                      href="/logout"
                      method="post"
                      as="button"
                      className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-foreground/80 hover:bg-muted hover:border-primary/40 hover:text-foreground"
                    >
                      Logout
                    </InertiaLink>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <InertiaLink
                      href="/login"
                      className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-foreground/80 hover:bg-muted hover:border-primary/40 hover:text-foreground"
                    >
                      Login
                    </InertiaLink>
                    <InertiaLink
                      href="/student/enroll"
                      className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-foreground/80 hover:bg-muted hover:border-primary/40 hover:text-foreground"
                    >
                      Enroll Now
                    </InertiaLink>
                  </div>
                )}
                <Button
                  className="justify-center bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  size="sm"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsVerifyModalOpen(true);
                  }}
                >
                  <Award className="mr-2 h-4 w-4" />
                  Verify Certificate
                </Button>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Contact Us</h3>
                <div className="space-y-2">
                  <a href="tel:+2348033404197" className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2 text-primary" />
                    +234 803 340 4197
                  </a>


                  <a href="mailto:info@alphabetasafetyacademy.org" className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2 text-primary" />
                    <span>info@alphabetasafetyacademy.org</span>
                  </a>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                    <span>Road 5 Eliparanwo New-Layout off Ada Geroge, Port Harcourt, Rivers State, Nigeria</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    <span>Mon-Fri: 8:00AM - 5:00PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Add padding when header is fixed to prevent content jump */}
      {isScrolled && <div className="h-[72px]"></div>}

      {/* Verification Modal */}
      <VerifyCertificate isOpen={isVerifyModalOpen} onClose={() => setIsVerifyModalOpen(false)} />
    </>
  );
};

export default Header;
