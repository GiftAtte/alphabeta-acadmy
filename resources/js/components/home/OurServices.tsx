import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Layers3, Globe2 } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const services = [
  {
    icon: <CheckCircle2 className="w-14 h-14 text-amber-700" />,
    title: "Quality Assured",
    description:
      "Our operations comply with ISO 9001:2001 QMS, ensuring top-tier delivery and instructor excellence in all trainings.",
    bg: "bg-amber-100",
  },
  {
    icon: <Layers3 className="w-14 h-14 text-emerald-700" />,
    title: "Varieties of Trainings",
    description:
      "From HSE to specialized oil & gas certifications, we offer diverse programs that ensure workplace competence and safety.",
    bg: "bg-emerald-100",
  },
  {
    icon: <Globe2 className="w-14 h-14 text-indigo-700" />,
    title: "Global Standards",
    description:
      "We deliver globally recognized safety training in Nigeria, trusted by top organizations in the Oil & Gas industry.",
    bg: "bg-indigo-100",
  },
];

const OurServices = () => {
  return (
    <div className="bg-primary">
      <div className="container px-6 py-16 mx-auto">
        <div className="flex flex-col text-center w-full mb-16">
          <h2 className="text-slate-100 text-3xl font-bold mb-4">
           Our Services
          </h2>
          <p className="lg:w-2/3 mx-auto text-white text-base">
            From internationally compliant training to quality-assured delivery, Alpha-beta safety academy  is your go-to provider for industry-ready workforce development.
          </p>
        </div>

        <motion.div
          className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="p-8 bg-white shadow-xl rounded-xl text-center hover:shadow-2xl transition-all duration-300"
              variants={cardVariants}
            >
              <div
                className={`mx-auto w-28 h-28  rounded-full flex items-center justify-center mb-6 ${service.bg}`}
              >
                {service.icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-base">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default OurServices;
