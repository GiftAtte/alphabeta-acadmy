import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Clock, Search, BadgeCheck, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from 'axios';

interface Course {
  id: number;
  title: string;
  description: string;
  duration?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  category?: string;
  status?: 'active' | 'inactive' | 'upcoming';
  price?: number;
  code?: string;
}

const CourseList = () => {
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/trainings');
        setCourses(response.data.data);
        setFilteredCourses(response.data.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

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
  }, [searchQuery, activeFilter, courses]);

  // Determine which courses to display
  const displayedCourses = showAll ? filteredCourses : filteredCourses.slice(0, 12);

  const getLevelBadge = (level?: string) => {
    switch(level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

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
            <div className="w-full md:w-64">
              <Select
                value={activeFilter || "all"}
                onValueChange={(value) => setActiveFilter(value === "all" ? null : value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              {courses.filter(course => course.status === 'active').slice(0, 3).map((course) => (
                <Card key={`featured-${course.id}`} className="overflow-hidden transition-all hover:shadow-md h-full border-primary/20">
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
          {displayedCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden transition-all hover:shadow-md h-full group">
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
