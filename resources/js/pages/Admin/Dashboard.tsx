import AdminLayout from '@/layouts/admin-app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Award, BookOpen, Globe, UserCheck } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

interface DashboardProps {
  statistics: {
    totalStudents: number;
    totalCertificates: number;
    totalTrainings: number;
    totalVisits: number;
    uniqueVisitors: number;
    recentEnrollments: Array<{
      id: string;
      first_name: string;
      last_name: string;
      training_name: string;
      enrollment_date: string;
      status: string;
    }>;
    recentCertificates: Array<{
      id: string;
      certificate_number: string;
      issue_date: string;
      student: {
        id: string;
        first_name: string;
        last_name: string;
      };
      training: {
        id: string;
        name: string;
        code: string;
      };
    }>;
    trainingsByCategory: Array<{
      category: string;
      count: number;
    }>;
    studentsByGender: Array<{
      gender: string;
      count: number;
    }>;
    certificatesByStatus: Array<{
      status: string;
      count: number;
    }>;
    visitsByDate: Array<{
      date: string;
      count: number;
    }>;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Admin',
    href: '/admin/dashboard',
  },
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
  },
];

// Colors for the charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function Dashboard({ statistics }: DashboardProps) {
  // Format data for charts
  const visitData = statistics.visitsByDate?.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    visits: item.count
  })) || [];

  const categoryData = statistics.trainingsByCategory?.map((item, index) => ({
    name: item.category || 'Uncategorized',
    value: item.count,
    color: COLORS[index % COLORS.length]
  })) || [];

  const genderData = statistics.studentsByGender?.map((item, index) => ({
    name: item.gender || 'Not Specified',
    value: item.count,
    color: COLORS[index % COLORS.length]
  })) || [];

  const certificateStatusData = statistics.certificatesByStatus?.map((item, index) => ({
    name: item.status || 'Unknown',
    value: item.count,
    color: COLORS[index % COLORS.length]
  })) || [];

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Head title="Admin Dashboard" />

      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.totalStudents}</div>
              <p className="text-xs text-muted-foreground">Registered students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Certificates</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.totalCertificates}</div>
              <p className="text-xs text-muted-foreground">Issued certificates</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Trainings</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.totalTrainings}</div>
              <p className="text-xs text-muted-foreground">Available training programs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.uniqueVisitors}</div>
              <p className="text-xs text-muted-foreground">Total site visits: {statistics.totalVisits}</p>
            </CardContent>
          </Card>
        </div>

        {/* Visitor Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Site Visits Trend</CardTitle>
            <CardDescription>Daily visitor activity over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visitData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area type="monotone" dataKey="visits" stroke="#8884d8" fillOpacity={1} fill="url(#colorVisits)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Data Distribution Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Training Categories Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Training Categories</CardTitle>
              <CardDescription>Distribution of trainings by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => 
                        percent > 0.1 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} trainings`, 'Count']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Students by Gender Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Students by Gender</CardTitle>
              <CardDescription>Distribution of students by gender</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={genderData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Students" fill="#8884d8">
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Data */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Enrollments</CardTitle>
              <CardDescription>Latest student enrollments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statistics.recentEnrollments?.map((enrollment) => (
                  <div key={enrollment.id} className="flex items-center gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <UserCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {enrollment.first_name} {enrollment.last_name}
                      </p>
                      <p className="text-xs text-muted-foreground">{enrollment.training_name}</p>
                    </div>
                    <div className="ml-auto">
                      <p className="text-xs text-muted-foreground">
                        {new Date(enrollment.enrollment_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
                {(!statistics.recentEnrollments || statistics.recentEnrollments.length === 0) && (
                  <p className="text-sm text-muted-foreground">No recent enrollments</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Certificates</CardTitle>
              <CardDescription>Latest issued certificates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statistics.recentCertificates?.map((certificate) => (
                  <div key={certificate.id} className="flex items-center gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {certificate.student.first_name} {certificate.student.last_name}
                      </p>
                      <p className="text-xs text-muted-foreground">{certificate.training.name}</p>
                    </div>
                    <div className="ml-auto">
                      <p className="text-xs text-muted-foreground">
                        {new Date(certificate.issue_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
                {(!statistics.recentCertificates || statistics.recentCertificates.length === 0) && (
                  <p className="text-sm text-muted-foreground">No recent certificates</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certificate Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Certificates by Status</CardTitle>
            <CardDescription>Distribution of certificates by status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={certificateStatusData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Certificates" fill="#8884d8">
                    {certificateStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
