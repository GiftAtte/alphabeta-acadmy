import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import VerifyCertificate from './home/VerifyCertificate';

const VerifyCertificateButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsModalOpen(true)}
        className="fixed right-0 top-1/2 transform -translate-y-1/2 z-40 group"
        whileHover={{ x: -5 }}
        initial={{ x: 0 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="flex items-center">
          <div className="bg-secondary-700 hover:bg-secondary-800 text-white py-3 px-4 rounded-l-md shadow-lg flex items-center font-medium">
            <Award className="mr-2 h-5 w-5" />
            <span>Verify Certificate</span>
          </div>
          <div className="w-2 h-10 bg-secondary-600 rounded-l-md shadow-lg transform -translate-x-1 group-hover:translate-x-0 transition-transform"></div>
        </div>
      </motion.button>

      <VerifyCertificate isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default VerifyCertificateButton;
