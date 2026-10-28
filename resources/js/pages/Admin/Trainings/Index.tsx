import { useState } from 'react';
import AdminLayout from '@/layouts/admin-app-layout';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Plus, Pencil, Trash2, Bookmark, BookOpen, Clock, Users, Calendar, DollarSign } from 'lucide-react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Badge } from '@/components/ui/badge';
import TrainingModal from '@/components/admin/TrainingModal';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { DataTable } from '@/components/ui/data-table';
import type { ColumnDef } from '@/types';

interface Training {
  id: string;
  name: string;
  code: string;
  description: string;
  category: string;
  duration: number;
  price: number | string;
  start_date: string;
  end_date: string;
  instructor: string;
  location: string;
  status: string;
  created_at: string;
  max_students?: number;
  current_students: number;
}

interface TrainingsPageProps {
  trainings: {
    data: Training[];
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
    totalTrainings: number;
    activeTrainings: number;
    upcomingTrainings: number;
    completedTrainings: number;
    trainingsByCategory: Array<{
      category: string;
      count: number;
    }>;
    trainingsByStatus: Array<{
      status: string;
      count: number;
    }>;
    averagePrice: number;
    totalEnrollments: number;
    trainingsByMonth: Array<{
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
    title: 'Trainings',
    href: '/admin/trainings',
  },
];

export default function TrainingsIndex({ trainings, statistics }: TrainingsPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedTraining, setSelectedTraining] = useState<Training | undefined>(undefined);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [trainingIdToDelete, setTrainingIdToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(trainings.current_page);

  const openCreateModal = () => {
    setModalMode('create');
    setSelectedTraining(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (training: Training) => {
    setModalMode('edit');
    setSelectedTraining(training);
    setIsModalOpen(true);
  };

  const openDeleteConfirm = (trainingId: string) => {
    setTrainingIdToDelete(trainingId);
    setIsConfirmDeleteOpen(true);
  };

  const handleDeleteTraining = async () => {
    if (!trainingIdToDelete) return;

    setIsDeleting(true);

    try {
      await axios.delete(`/admin/trainings/${trainingIdToDelete}`, {
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      // Update local state
      router.visit('/admin/trainings', {
        preserveState: false,
        preserveScroll: false,
        replace: true
      });

      toast.success('Training deleted successfully');
      setIsConfirmDeleteOpen(false);
    } catch (error) {
      console.error('Error deleting training:', error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Failed to delete training');
      } else {
        toast.error('Failed to delete training');
      }
    } finally {
      setIsDeleting(false);
      setTrainingIdToDelete(null);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.visit(`/admin/trainings?page=${page}`, {
      preserveState: true,
      preserveScroll: true,
      only: ['trainings']
    });
  };

  const handleTrainingSaved = () => {
    router.visit('/admin/trainings', {
      preserveState: false,
      preserveScroll: false,
      replace: true
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
  };

  const formatPrice = (price: number | string) => {
    if (price === null || price === undefined) return '$0';
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    return `$${numericPrice.toFixed(2)}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return (
          <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
            Active
          </Badge>
        );
      case 'upcoming':
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
            Upcoming
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200">
            Completed
          </Badge>
        );
      case 'canceled':
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200">
            Canceled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status || 'Unknown'}</Badge>;
    }
  };

  // Define columns for the data table
  const columns: ColumnDef<Training>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
    },
    {
      accessorKey: 'code',
      header: 'Code',
    },
    {
      accessorKey: 'category',
      header: 'Category',
    },
    {
      accessorKey: 'duration',
      header: 'Duration',
      cell: ({ row }) => `${row.original.duration} hours`,
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => formatPrice(row.original.price),
    },
    {
      accessorKey: 'start_date',
      header: 'Start Date',
      cell: ({ row }) => formatDate(row.original.start_date),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => getStatusBadge(row.original.status),
    },
    {
      accessorKey: 'enrollment',
      header: 'Enrollment',
      cell: ({ row }) => `${row.original.current_students || 0}/${row.original.max_students || 0}`,
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
      <Head title="Trainings Management" />

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Trainings Management</h1>

          <Button onClick={openCreateModal}>
            <Plus className="mr-2 h-4 w-4" />
            Add Training
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Trainings</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics?.totalTrainings || 0}</div>
              <p className="text-xs text-muted-foreground">All training programs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Trainings</CardTitle>
              <Bookmark className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics?.activeTrainings || 0}</div>
              <p className="text-xs text-muted-foreground">Currently running</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Trainings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics?.upcomingTrainings || 0}</div>
              <p className="text-xs text-muted-foreground">Starting soon</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed Trainings</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics?.completedTrainings || 0}</div>
              <p className="text-xs text-muted-foreground">Successfully completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics?.totalEnrollments || 0}</div>
              <p className="text-xs text-muted-foreground">Student enrollments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Average Price</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPrice(statistics?.averagePrice || 0)}</div>
              <p className="text-xs text-muted-foreground">Average training cost</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Top Category</CardTitle>
              <Bookmark className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statistics?.trainingsByCategory && statistics.trainingsByCategory.length > 0
                  ? statistics.trainingsByCategory.sort((a, b) => b.count - a.count)[0].category
                  : 'None'}
              </div>
              <p className="text-xs text-muted-foreground">Most popular category</p>
            </CardContent>
          </Card>
        </div>

        {/* Training Records Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Trainings</CardTitle>
            <CardDescription>Manage training programs and schedules</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={trainings.data}
              searchKey="name"
              searchPlaceholder="Search by name..."
              tablePrefix="trainings"
              rowsPerPage={2}
              pageCount={trainings.last_page}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalItems={trainings.total}
            />
          </CardContent>
        </Card>
      </div>

      {/* Training Modal */}
      <TrainingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        training={selectedTraining}
        mode={modalMode}
        onSuccess={handleTrainingSaved}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        onConfirm={handleDeleteTraining}
        title="Delete Training"
        description="Are you sure you want to delete this training? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        isLoading={isDeleting}
        variant="destructive"
        closeOnOutsideClick={false}
      />
    </AdminLayout>
  );
}
