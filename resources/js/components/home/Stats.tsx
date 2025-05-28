import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Users, Award, GraduationCap, Globe, Handshake } from 'lucide-react';

const Stats = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        

        <div 
          ref={ref} 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 " 
        >
          <StatItem 
            icon={<Users className="h-10 w-10 text-secondary-600" />}
            value={5000}
            label="Professionals Trained"
            inView={inView}
          />
          <StatItem 
            icon={<Award className="h-10 w-10 text-secondary-600" />}
            value={15}
            label="Years of Excellence"
            inView={inView}
          />
          <StatItem 
            icon={<GraduationCap className="h-10 w-10 text-secondary-600" />}
            value={50}
            label="Training Programs"
            inView={inView}
          />
          <StatItem 
            icon={<Handshake className="h-10 w-10 text-secondary-600" />}
            value={10}
            label="+Partners"
            inView={inView}
          />
        </div>
      </div>
    </section>
  );
};

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  inView: boolean;
}

const StatItem = ({ icon, value, label, inView }: StatItemProps) => {
  return (
    <div className="flex flex-col items-center p-6 bg-neutral-50 rounded-lg shadow-sm transition-transform duration-300 hover:transform hover:scale-105">
      {icon}
      <div className="mt-4 text-4xl font-bold text-primary-900">
        {inView ? (
          <CountUp end={value} duration={2.5} separator="," />
        ) : (
          <span>0</span>
        )}
        {value === 15 && <span>+</span>}
      </div>
      <div className="mt-2 text-center text-neutral-600 font-medium">{label}</div>
    </div>
  );
};

export default Stats;