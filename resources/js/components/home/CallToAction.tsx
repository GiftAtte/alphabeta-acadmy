import { Link } from '@inertiajs/react';
import { ArrowRight, PhoneCall } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" rounded-2xl overflow-hidden shadow-xl">
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between relative">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg 
                width="100%" 
                height="100%" 
                viewBox="0 0 100 100" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <pattern 
                  id="grid" 
                  width="10" 
                  height="10" 
                  patternUnits="userSpaceOnUse"
                >
                  <path 
                    d="M 10 0 L 0 0 0 10" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="0.5"
                  />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            
            <div className="text-center md:text-left mb-8 md:mb-0 max-w-2xl relative z-10">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-4">
                Ready to Advance Your Safety Career?
              </h2>
              <p className="text-neutral-700 text-lg">
                Join thousands of professionals who have enhanced their careers through our world-class safety training and certifications. Take the first step today.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 relative z-10">
              <Link
                href="/courses"
                className="bg-primary hover:bg-primary-500 text-white py-3 px-6 rounded-md font-medium transition-colors flex items-center justify-center"
              >
                Explore Courses
                <ArrowRight size={20} className="ml-2" />
              </Link>
              
              <Link
                href="/contact"
                className="bg-gray-200 text-primary-900 hover:bg-neutral-100 py-3 px-6 rounded-md font-medium transition-colors flex items-center justify-center"
              >
                Contact Us
                <PhoneCall size={20} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;