'use client';

import React from 'react';
import { ChevronRight, Clock, Users, Award, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../ui/card';

interface Course {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  duration?: string;
  studentsCount?: number;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  certification?: string;
  featured?: boolean;
}

const courses: Course[] = [
  {
    id: 1,
    title: 'HSE Management Systems',
    category: 'Management',
    image: '/images/img23.jpeg',
    description: 'Comprehensive overview of health, safety, and environmental management systems design and implementation.',
    duration: '5 days',
    studentsCount: 840,
    level: 'Advanced',
    certification: 'ISO 45001',
    featured: true,
  },
  {
    id: 2,
    title: 'Rigging & Lifting Operations',
    category: 'Industrial Safety',
    image: '/images/rigging.jpeg',
    description: 'Rigging training covering lifting operations, load calculations, and safe use of hoisting equipment in industrial environments.',
    duration: '4 days',
    studentsCount: 1255,
    level: 'Intermediate',
    certification: 'OPITO',
  },
  {
    id: 3,
    title: 'Confined Space Entry',
    category: 'Industrial Safety',
    image: '/images/img5.jpeg',
    description: 'Safety procedures for working in confined spaces, including hazard assessment, gas testing, and emergency response.',
    duration: '3 days',
    studentsCount: 952,
    level: 'Intermediate',
    certification: 'OSHA Compliant',
  },
  {
    id: 4,
    title: 'Safety Officer Training',
    category: 'Occupational Health & Safety',
    image: '/images/safety.jpeg',
    description: 'Comprehensive training for individuals aiming to become certified safety officers, covering risk assessment and hazard control.',
    duration: '5 days',
    studentsCount: 1430,
    level: 'Advanced',
    certification: 'NEBOSH',
    featured: true,
  },
  {
    id: 5,
    title: 'First Aid & CPR',
    category: 'Emergency Response',
    image: '/images/first-aid.jpeg',
    description: 'Learn vital first aid techniques and CPR to respond effectively during emergencies until medical help arrives.',
    duration: '2 days',
    studentsCount: 2150,
    level: 'Beginner',
    certification: 'Red Cross',
    featured: true,
  },
  {
    id: 6,
    title: 'Fire Fighting & Prevention',
    category: 'Emergency Response',
    image: '/images/fire-fighter.png',
    description: 'Training focused on fire prevention, extinguisher use, fire suppression techniques, and evacuation protocols.',
    duration: '3 days',
    studentsCount: 1865,
    level: 'Intermediate',
    certification: 'NFPA',
  },
  {
    id: 7,
    title: 'Forklift Operation & Safety',
    category: 'Equipment Operation',
    image: '/images/forklift.png',
    duration: '3 days',
    studentsCount: 1720,
    level: 'Beginner',
    certification: 'OSHA Forklift',
    description: 'Hands-on training in safe forklift operation, inspection, and load handling for warehouse and industrial settings.',
  },
  {
    id: 8,
    title: 'Crane Operation',
    category: 'Equipment Operation',
    image: '/images/crane.jpeg',
    description: 'Crane operator certification including load charts, signaling, crane setup, and safety procedures.',
    duration: '5 days',
    studentsCount: 985,
    level: 'Advanced',
    certification: 'NCCCO',
  },
  {
    id: 9,
    title: 'Offshore Safety & Survival',
    category: 'Oil & Gas Safety',
    image: '/images/marine.jpeg',
    description: 'Specialized training for offshore workers including helicopter underwater escape training (HUET) and offshore emergency response.',
    duration: '5 days',
    studentsCount: 1560,
    level: 'Advanced',
    certification: 'OPITO BOSIET',
    featured: true,
  },
];

const FeaturedCourses = () => {
  // Filter courses to show featured ones first, then others
  const orderedCourses = [...courses].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-3 px-3 py-1 bg-primary/10 text-primary border-0">
            Professional Training
          </Badge>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Featured Courses</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Discover our most popular safety training programs designed to enhance your career and ensure workplace safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orderedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="px-6">
            <Link href={`/courses`} className="inline-flex items-center">
              Browse All Courses
              <ChevronRight size={18} className="ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const getLevelColor = (level?: string) => {
    switch(level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden shadow-md hover:shadow-xl transition-all border-0 rounded-xl relative">
        {course.featured && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-primary border-0">Featured</Badge>
          </div>
        )}

        <div className="relative h-48 sm:h-52 md:h-56 lg:h-60 overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-3 left-3">
            <Badge variant="outline" className="bg-white/90 backdrop-blur-sm border-0 shadow-sm">
              {course.category}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-2 pt-5">
          <CardTitle className="text-lg font-bold line-clamp-1 text-slate-800 group-hover:text-primary">
            {course.title}
          </CardTitle>
          {course.level && (
            <Badge variant="outline" className={`${getLevelColor(course.level)} border-0 mt-1`}>
              {course.level} Level
            </Badge>
          )}
        </CardHeader>

        <CardContent className="pb-2">
          <CardDescription className="line-clamp-2 mb-4 text-slate-600">
            {course.description}
          </CardDescription>

          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-4">
            {course.duration && (
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1 text-primary/70" />
                {course.duration}
              </div>
            )}
            {course.studentsCount && (
              <div className="flex items-center">
                <Users className="h-3.5 w-3.5 mr-1 text-primary/70" />
                {course.studentsCount.toLocaleString()}+ students
              </div>
            )}
            {course.certification && (
              <div className="flex items-center col-span-2">
                <Award className="h-3.5 w-3.5 mr-1 text-primary/70" />
                {course.certification} Certified
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <Button
            asChild
            size="sm"
            className="w-full group bg-primary/10 hover:bg-primary text-primary hover:text-white border-0"
          >
            <Link href={`/courses`} className="flex items-center justify-center">
              View Course
              <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
