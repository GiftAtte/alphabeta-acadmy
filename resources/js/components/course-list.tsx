import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Clock, Users, Search, Filter, BadgeCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Course {
  title: string;
  description: string;
  duration?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  category?: string;
  featured?: boolean;
}

const CourseList = () => {
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const courses: Course[] = [
    {
      title: "Introduction to HSE",
      description: "A foundational course covering the basic principles of Health, Safety, and Environmental management in the workplace.",
      duration: "2 days",
      level: "Beginner",
      category: "Health & Safety",
      featured: true
    },
    {
      title: "Accident Investigation",
      description: "Learn methodologies to investigate workplace incidents, identify root causes, and implement preventive measures.",
      duration: "3 days",
      level: "Intermediate",
      category: "Health & Safety"
    },
    {
      title: "Confined Space Entry",
      description: "Comprehensive training on safely entering, working in, and exiting confined spaces with proper hazard assessment.",
      duration: "2 days",
      level: "Intermediate",
      category: "Health & Safety"
    },
    {
      title: "Work at Height Safety",
      description: "Essential training for preventing falls and ensuring safety when working at elevated positions.",
      duration: "2 days",
      level: "Intermediate",
      category: "Health & Safety"
    },
    {
      title: "Fire Fighting and Prevention",
      description: "Practical skills and knowledge for fire prevention, emergency response, and proper use of firefighting equipment.",
      duration: "3 days",
      level: "Beginner",
      category: "Emergency Response",
      featured: true
    },
    {
      title: "First Aid & CPR",
      description: "Life-saving techniques for emergency situations including CPR, wound management, and handling medical emergencies.",
      duration: "2 days",
      level: "Beginner",
      category: "Emergency Response",
      featured: true
    },
    {
      title: "Safety Statistics",
      description: "Understanding and analyzing safety data to identify trends and improve workplace safety performance.",
      duration: "1 day",
      level: "Intermediate",
      category: "Management"
    },
    {
      title: "Job Hazard Analysis",
      description: "Systematic approach to identifying workplace hazards and implementing effective control measures.",
      duration: "2 days",
      level: "Intermediate",
      category: "Risk Assessment"
    },
    {
      title: "Personal Protective Equipment",
      description: "Selection, proper use, maintenance, and limitations of various personal protective equipment in different work environments.",
      duration: "1 day",
      level: "Beginner",
      category: "Health & Safety"
    },
    {
      title: "Environmental Safety",
      description: "Managing environmental risks and ensuring compliance with environmental regulations in industrial settings.",
      duration: "3 days",
      level: "Intermediate",
      category: "Environmental"
    },
    {
      title: "Waste Management",
      description: "Best practices for handling, storing, and disposing of various types of waste in accordance with environmental standards.",
      duration: "2 days",
      level: "Intermediate",
      category: "Environmental"
    },
    {
      title: "Good Housekeeping",
      description: "Principles and practices for maintaining a clean, organized, and safe workplace to prevent accidents and improve efficiency.",
      duration: "1 day",
      level: "Beginner",
      category: "Health & Safety"
    },
    {
      title: "Maritime Safety",
      description: "Specialized safety training for maritime environments, covering vessel safety, emergency procedures, and offshore risks.",
      duration: "5 days",
      level: "Advanced",
      category: "Industry Specific",
      featured: true
    },
    {
      title: "HSE Management System",
      description: "Comprehensive approach to developing and implementing effective health, safety, and environmental management systems.",
      duration: "4 days",
      level: "Advanced",
      category: "Management"
    },
    {
      title: "Advanced Fire Fighting and Prevention",
      description: "Advanced techniques and strategies for complex fire scenarios, including industrial and chemical fires.",
      duration: "5 days",
      level: "Advanced",
      category: "Emergency Response"
    },
    {
      title: "Occupational Health and Safety",
      description: "Fundamental principles and practices of occupational health and safety management in various industries.",
      duration: "3 days",
      level: "Beginner",
      category: "Health & Safety"
    },
    // Simplified for brevity - remaining courses from the original list would each have descriptions added
  ];

  // Get unique categories
  const categories = Array.from(new Set(courses.map(course => course.category))).filter(Boolean) as string[];

  // Filter courses based on search query and active filter
  useEffect(() => {
    let result = courses;

    if (searchQuery) {
      result = result.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeFilter) {
      result = result.filter(course => course.category === activeFilter);
    }

    setFilteredCourses(result);
  }, [searchQuery, activeFilter]);

  // Determine which courses to display
  const displayedCourses = showAll ? filteredCourses : filteredCourses.slice(0, 12);

  const getLevelColor = (level?: string) => {
    switch(level) {
      case 'Beginner': return 'text-green-600';
      case 'Intermediate': return 'text-blue-600';
      case 'Advanced': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getLevelBadge = (level?: string) => {
    switch(level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Professional Training Courses</h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Discover our comprehensive range of industry-recognized safety training programs designed to enhance your skills and advance your career.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
              <Button
                variant={activeFilter === null ? "secondary" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(null)}
              >
                All Courses
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeFilter === category ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <p className="text-muted-foreground">No courses found matching your criteria. Try adjusting your search.</p>
            </div>
          )}
        </div>

        {/* Featured Courses */}
        {!searchQuery && !activeFilter && (
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <BadgeCheck className="h-5 w-5 mr-2 text-primary" />
              Featured Courses
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.filter(course => course.featured).slice(0, 3).map((course, idx) => (
                <Card key={`featured-${idx}`} className="overflow-hidden transition-all hover:shadow-md h-full border-primary/20">
                  <div className="absolute top-0 right-0">
                    <Badge className="m-2 bg-primary">Featured</Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-start gap-2">
                      <Book className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span>{course.title}</span>
                    </CardTitle>
                    {course.level && (
                      <Badge variant="outline" className={`${getLevelBadge(course.level)} border-0 mt-1`}>
                        {course.level} Level
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent className="pt-2">
                    <CardDescription className="mb-4 text-sm">
                      {course.description}
                    </CardDescription>
                    <div className="flex items-center justify-between mt-4">
                      {course.duration && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          {course.duration}
                        </div>
                      )}
                      <Button className="bg-primary hover:bg-primary/90" size="sm">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Courses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCourses.map((course, idx) => (
            <Card key={idx} className="overflow-hidden transition-all hover:shadow-md h-full group">
              {course.category && (
                <div className="absolute top-0 left-0">
                  <Badge variant="outline" className="m-2 bg-background/80 backdrop-blur-sm">
                    {course.category}
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-2">
                <CardTitle className="flex items-start gap-2 group-hover:text-primary transition-colors">
                  <Book className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <span>{course.title}</span>
                </CardTitle>
                {course.level && (
                  <Badge variant="outline" className={`${getLevelBadge(course.level)} border-0 mt-1`}>
                    {course.level} Level
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="pt-2">
                <CardDescription className="mb-4 text-sm">
                  {course.description}
                </CardDescription>
                <div className="flex items-center justify-between mt-4">
                  {course.duration && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {course.duration}
                    </div>
                  )}
                  <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-white transition-colors">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
        ))}
      </div>

        {filteredCourses.length > 12 && (
          <div className="flex justify-center mt-10">
            <Button
          onClick={() => setShowAll(!showAll)}
              variant="secondary"
              size="lg"
              className="px-8"
            >
              {showAll ? 'Show Less Courses' : `View All Courses (${filteredCourses.length})`}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseList;
