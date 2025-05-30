import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  position?: 'left' | 'right';
  showOnMobile?: boolean;
  pulseEffect?: boolean;
}

const WhatsAppButton = ({ 
  phoneNumber, 
  message = "Hello, I'm interested in your safety training programs. Can you provide more information?", 
  position = 'right',
  showOnMobile = true,
  pulseEffect = true
}: WhatsAppButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  // Clean the phone number (remove non-digit characters)
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
  
  // Construct WhatsApp URL
  const whatsappUrl = `https://wa.me/${cleanedPhoneNumber}?text=${encodeURIComponent(message)}`;

  // Show button after scrolling a bit
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsTooltipVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Show button after 3 seconds even without scrolling
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Show tooltip briefly after button appears
      setTimeout(() => {
        setIsTooltipVisible(true);
        setTimeout(() => {
          setIsTooltipVisible(false);
        }, 5000);
      }, 1000);
    }, 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Don't render on mobile if showOnMobile is false
  if (!showOnMobile && typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className={`fixed bottom-6 z-50 ${position === 'right' ? 'right-6' : 'left-6'}`}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative group">
            {/* Tooltip */}
            <AnimatePresence>
              {isTooltipVisible && (
                <motion.div 
                  className={`absolute bottom-full ${position === 'right' ? 'right-0' : 'left-0'} mb-2 p-3 bg-white rounded-lg shadow-lg text-gray-800 text-sm max-w-[200px] pointer-events-none`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="font-medium">Need help?</div>
                  <div className="text-gray-600">Chat with us on WhatsApp!</div>
                  <div className={`absolute bottom-[-6px] ${position === 'right' ? 'right-4' : 'left-4'} w-3 h-3 bg-white transform rotate-45`}></div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* WhatsApp Button */}
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full transition-colors shadow-lg ${pulseEffect ? 'relative' : ''}`}
              onMouseEnter={() => setIsTooltipVisible(true)}
              onMouseLeave={() => setIsTooltipVisible(false)}
              onClick={() => setIsTooltipVisible(false)}
            >
              {/* WhatsApp Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              </svg>
              
              <span className="font-medium hidden md:block">Chat with us</span>
              
              {/* Pulse effect */}
              {pulseEffect && (
                <span className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-75"></span>
              )}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppButton; 