import { useState } from 'react';
import AdminLayout from '@/layouts/admin-app-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserPlus, Pencil, Trash2, CheckCircle, XCircle, UserCog, Users, CalendarDays } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import StudentModal from '@/components/admin/StudentModal';
import { toast } from 'react-hot-toast';
import { DataTable } from '@/components/ui/data-table';
import type { ColumnDef } from '@/types';

interface Student {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  date_of_birth: string;
  gender: string;
  education_level: string;
  status: string;
  registration_date: string;
  [key: string]: string | undefined; // Add index signature for compatibility
}

interface StudentsPageProps {
  students: {
    data: Student[];
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    total: number;
    from: number;
    to: number;
    current_page: number;
    last_page: number;
  };
  statistics: {
    totalStudents: number;
    activeStudents: number;
    inactiveStudents: number;
    newStudentsThisMonth: number;
    studentsByGender: Array<{
      gender: string;
      count: number;
    }>;
    studentsByEducationLevel: Array<{
      education_level: string;
      count: number;
    }>;
    studentsByStatus: Array<{
      status: string;
      count: number;
    }>;
    studentsByMonth: Array<{
      month: string;
      count: number;
    }>;
  };
}

const breadcrumbs = [
  {
    title: 'Admin',
    href: '/admin/dashboard',
  },
  {
    title: 'Students',
    href: '/admin/students',
  },
];

export default function StudentsIndex({ students, statistics }: StudentsPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(undefined);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [studentIdToDelete, setStudentIdToDelete] = useState<string | null>(null);
  const [studentsList, setStudentsList] = useState(students.data);

  // Setup Inertia form for delete operation
  const { delete: destroy, processing: isDeleting } = useForm();

  const openCreateModal = () => {
    setModalMode('create');
    setSelectedStudent(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (student: Student) => {
    setModalMode('edit');
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const openDeleteConfirm = (studentId: string) => {
    setStudentIdToDelete(studentId);
    setIsConfirmDeleteOpen(true);
  };

  const handleDeleteStudent = () => {
    if (!studentIdToDelete) return;

    destroy(`/admin/students/${studentIdToDelete}`, {
      onSuccess: () => {
        // Update local state
        setStudentsList(prev => prev.filter(student => student.id !== studentIdToDelete));
        toast.success('Student deleted successfully');
        setIsConfirmDeleteOpen(false);
        setStudentIdToDelete(null);
      },
      onError: () => {
        toast.error('Failed to delete student');
      }
    });
  };

  const handleStudentSaved = () => {
    // Use Inertia router.visit instead of window.location.reload to preserve SPA behavior
    router.visit('/admin/students', {
      preserveState: false,
      preserveScroll: false,
      replace: true
    });
  };

  const formatEducationLevel = (level: string) => {
    if (!level) return '-';
    return level.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
        );
      case 'inactive':
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200">
            <XCircle className="h-3 w-3 mr-1" />
            Inactive
          </Badge>
        );
      case 'suspended':
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Suspended
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Define columns for the data table
  const columns: ColumnDef<Student>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="font-medium">
          {row.original.first_name} {row.original.last_name}
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({ row }) => row.original.phone || '-',
    },
    {
      accessorKey: 'education_level',
      header: 'Education',
      cell: ({ row }) => formatEducationLevel(row.original.education_level),
    },
    {
      accessorKey: 'registration_date',
      header: 'Registration Date',
      cell: ({ row }) => formatDate(row.original.registration_date),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => getStatusBadge(row.original.status),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => openEditModal(row.original)}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => openDeleteConfirm(row.original.id)}
          >
            <Trash2 className="h-3.5 w-3.5 text-red-500" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Head title="Students Management" />

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Students Management</h1>

          <Button onClick={openCreateModal}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics?.totalStudents || 0}</div>
              <p className="text-xs text-muted-foreground">Registered students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
              <UserCog className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics?.activeStudents || 0}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">New This Month</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics?.newStudentsThisMonth || 0}</div>
              <p className="text-xs text-muted-foreground">Recent registrations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Inactive Students</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics?.inactiveStudents || 0}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>
        </div>



        {/* Student Records Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Students</CardTitle>
            <CardDescription>Manage student records and information</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={studentsList}
              searchKey="email"
              searchPlaceholder="Search by email..."
              tablePrefix="students"
            />
          </CardContent>
        </Card>
      </div>

      {/* Student Modal */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        student={selectedStudent}
        mode={modalMode}
        onSuccess={handleStudentSaved}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={isConfirmDeleteOpen} onOpenChange={setIsConfirmDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Student</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this student? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsConfirmDeleteOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteStudent}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
