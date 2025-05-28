import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  content?:React.ReactNode
}

const PageHeader = ({ title, subtitle, backgroundImage,content }: PageHeaderProps) => {
  return (
    <section className="relative py-24 md:py-32 h-[60vh]">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.85)), url('${backgroundImage || 'https://images.pexels.com/photos/8851636/pexels-photo-8851636.jpeg?auto=compress&cs=tinysrgb&w=1920'}')`
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-lg text-neutral-200 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        {content}
      </div>
    </section>
  );
};

export default PageHeader;