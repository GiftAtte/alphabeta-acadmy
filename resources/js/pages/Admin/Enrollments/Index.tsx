import { useState } from 'react';
import AdminLayout from '@/layouts/admin-app-layout';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserPlus, Pencil, Trash2, CheckCircle, XCircle, DollarSign } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { DataTable } from '@/components/ui/data-table';
import type { ColumnDef } from '@/types';
import EnrollmentModal, { Enrollment } from '@/components/admin/EnrollmentModal';

// Update the page-specific interface to include required UI-display fields
interface EnrollmentDisplay extends Enrollment {
  id: string; // Make id required for the display
  first_name: string;
  last_name: string;
  email: string;
  training_name: string;
  training_code: string;
}

interface EnrollmentsPageProps {
  enrollments: {
    data: EnrollmentDisplay[];
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
}

const breadcrumbs = [
  {
    title: 'Admin',
    href: '/admin/dashboard',
  },
  {
    title: 'Enrollments',
    href: '/admin/enrollments',
  },
];

export default function EnrollmentsIndex({ enrollments }: EnrollmentsPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [enrollmentIdToDelete, setEnrollmentIdToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(enrollments.current_page);

  const openCreateModal = () => {
    setModalMode('create');
    setSelectedEnrollment(null);
    setIsModalOpen(true);
  };

  const openEditModal = (enrollment: EnrollmentDisplay) => {
    setModalMode('edit');
    setSelectedEnrollment(enrollment);
    setIsModalOpen(true);
  };

  const openDeleteConfirm = (enrollmentId: string) => {
    setEnrollmentIdToDelete(enrollmentId);
    setIsConfirmDeleteOpen(true);
  };

  const handleDeleteEnrollment = async () => {
    if (!enrollmentIdToDelete) return;

    setIsDeleting(true);

    try {
      await axios.delete(`/admin/enrollments/${enrollmentIdToDelete}`);

      // Update local state
      router.visit('/admin/enrollments', {
        preserveState: false,
        preserveScroll: false,
        replace: true
      });

      toast.success('Enrollment deleted successfully');
      setIsConfirmDeleteOpen(false);
    } catch (error) {
      console.error('Error deleting enrollment:', error);
      toast.error('Failed to delete enrollment');
    } finally {
      setIsDeleting(false);
      setEnrollmentIdToDelete(null);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.visit(`/admin/enrollments?page=${page}`, {
      preserveState: true,
      preserveScroll: true,
      only: ['enrollments']
    });
  };

  const handleEnrollmentSaved = () => {
    router.visit('/admin/enrollments', {
      preserveState: false,
      preserveScroll: false,
      replace: true
    });
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'enrolled':
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
            <UserPlus className="h-3 w-3 mr-1" />
            Enrolled
          </Badge>
        );
      case 'in_progress':
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            In Progress
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case 'dropped':
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Dropped
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
            <DollarSign className="h-3 w-3 mr-1" />
            Paid
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200">
            <DollarSign className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case 'partial':
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
            <DollarSign className="h-3 w-3 mr-1" />
            Partial
          </Badge>
        );
      case 'refunded':
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200">
            <DollarSign className="h-3 w-3 mr-1" />
            Refunded
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Define columns for the data table
  const columns: ColumnDef<EnrollmentDisplay>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'student_name',
      header: 'Student',
      cell: ({ row }) => (
        <div className="font-medium">
          {row.original.first_name} {row.original.last_name}
          <div className="text-xs text-muted-foreground">{row.original.email}</div>
        </div>
      ),
    },
    {
      accessorKey: 'training_name',
      header: 'Training',
      cell: ({ row }) => (
        <div>
          <div>{row.original.training_name}</div>
          <div className="text-xs text-muted-foreground">{row.original.training_code}</div>
        </div>
      ),
    },
    {
      accessorKey: 'enrollment_date',
      header: 'Enrollment Date',
      cell: ({ row }) => formatDate(row.original.enrollment_date),
    },
    {
      accessorKey: 'completion_date',
      header: 'Completion Date',
      cell: ({ row }) => formatDate(row.original.completion_date),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => getStatusBadge(row.original.status),
    },
    {
      accessorKey: 'payment_status',
      header: 'Payment Status',
      cell: ({ row }) => getPaymentStatusBadge(row.original.payment_status),
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
      <Head title="Enrollments Management" />

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Enrollments Management</h1>

          <Button onClick={openCreateModal}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Enrollment
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Enrollments</CardTitle>
            <CardDescription>Manage student enrollments and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={enrollments.data}
              searchKey="email"
              searchPlaceholder="Search by student email..."
              tablePrefix="enrollments"
              rowsPerPage={2}
              pageCount={enrollments.last_page}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalItems={enrollments.total}
            />
          </CardContent>
        </Card>
      </div>

      {/* Enrollment Modal */}
      {isModalOpen && (
        <EnrollmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          enrollment={selectedEnrollment}
          mode={modalMode}
          onSuccess={handleEnrollmentSaved}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isConfirmDeleteOpen} onOpenChange={setIsConfirmDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Enrollment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this enrollment? This action cannot be undone.
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
              onClick={handleDeleteEnrollment}
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
