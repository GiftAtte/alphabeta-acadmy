'use client';

import React from 'react'
import { Clock, Monitor, Award, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { Button } from '../ui/button';

const courses = [
  
  {
    id: 2,
    title: 'Rigging',
    category: 'Industrial Safety',
    image: '/images/rigging.jpeg',
    description: 'Rigging training covering lifting operations, load calculations, and safe use of hoisting equipment in industrial environments.',
  },

  {
    id: 4,
    title: 'Safety Officer',
    category: 'Occupational Health & Safety',
    image: '/images/safety.jpeg',
 
    description: 'Comprehensive training for individuals aiming to become certified safety officers, covering risk assessment and hazard control.',
  },
  {
    id: 5,
    title: 'First Aid & CPR',
    category: 'Emergency Response',
    image: '/images/first-aid.jpeg',
 
    description: 'Learn vital first aid techniques and CPR to respond effectively during emergencies until medical help arrives.',
  },
  {
    id: 6,
    title: 'Fire Fighting',
    category: 'Emergency Response',
    image: '/images/fire-fighter.png',
  
    description: 'Training focused on fire prevention, extinguisher use, fire suppression techniques, and evacuation protocols.',
  },
  {
    id: 7,
    title: 'Forklift',
    category: 'Equipment Operation',
    image: '/images/forklift.png',
    duration: '3 days',
    format: 'Onsite',
    certification: 'OSHA Forklift',
    description: 'Hands-on training in safe forklift operation, inspection, and load handling for warehouse and industrial settings.',
  },
  {
    id: 8,
    title: 'Crane',
    category: 'Equipment Operation',
    image: '/images/crane.jpeg',
    
    description: 'Crane operator certification including load charts, signaling, crane setup, and safety procedures.',
  },
  {
    id: 9,
    title: 'Offshore Work',
    category: 'Oil & Gas Safety',
    image: '/images/marine.jpeg',

  
    description: 'Specialized training for offshore workers including helicopter underwater escape training (HUET) and offshore emergency response.',
  },
];

const filteredCourses = courses;

const FeaturedCourses = () => {
  return (
    <section className="py-12 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col text-center w-full mb-20">
          <h2 className="text-slate-900 text-3xl font-bold mb-6 text-center">Featured Courses</h2>
        
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

         <Link
          href={`/courses`}
          className="mt-6 flex items-center  justify-center font-medium transition-colors"
        >
          <Button>Browse All Courses
          <ChevronRight size={16} className="ml-1" /></Button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedCourses;

interface Course {
  id: number;
  title: string;
  category: string;
  image: string;

  description: string;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <>
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-80 object-cover"
        />
        <div className="absolute top-0 right-0 bg-primary-600 text-white py-1 px-3 rounded-bl-lg">
          {course.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-heading font-semibold text-primary-900 mb-3">
          {course.title}
        </h3>
        <p className="text-neutral-600 mb-4 line-clamp-2">
          {course.description}
        </p>
      
      
       
      </div>


      
    </motion.div>

    
      </>
  );
};
