import { useState } from 'react';
import AdminLayout from '@/layouts/admin-app-layout';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Award, Pencil, Trash2, CheckCircle, XCircle, AlertCircle, CalendarDays, AlertTriangle, BookOpen } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { DataTable } from '@/components/ui/data-table';
import type { ColumnDef } from '@/types';
import CertificateModal from '@/components/admin/CertificateModal';

interface Student {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface Training {
  id: string;
  name: string;
  code: string;
}

interface Certificate {
  id: string;
  certificate_number: string;
  issue_date: string;
  expiry_date: string | null;
  status: string;
  grade: string;
  notes: string;
  student_id: string;
  training_id: string;
  student: Student;
  training: Training;
}

interface CertificatesPageProps {
  certificates: {
    data: Certificate[];
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
    totalCertificates: number;
    activeCertificates: number;
    expiredCertificates: number;
    revokedCertificates: number;
    issuedThisMonth: number;
    expiringCertificates: number;
    topTrainings: Array<{
      name: string;
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
    title: 'Certificates',
    href: '/admin/certificates',
  },
];

export default function CertificatesIndex({ certificates, statistics }: CertificatesPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [certificateIdToDelete, setCertificateIdToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [certificatesList, setCertificatesList] = useState(certificates.data);

  const openCreateModal = () => {
    setModalMode('create');
    setSelectedCertificate(null);
    setIsModalOpen(true);
  };

  const openEditModal = (certificate: Certificate) => {
    setModalMode('edit');
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const openDeleteConfirm = (certificateId: string) => {
    setCertificateIdToDelete(certificateId);
    setIsConfirmDeleteOpen(true);
  };

  const handleDeleteCertificate = async () => {
    if (!certificateIdToDelete) return;

    setIsDeleting(true);

    try {
      await axios.delete(`/admin/certificates/${certificateIdToDelete}`);

      // Update local state
      setCertificatesList(prev => prev.filter(cert => cert.id !== certificateIdToDelete));

      toast.success('Certificate deleted successfully');
      setIsConfirmDeleteOpen(false);
    } catch (error) {
      console.error('Error deleting certificate:', error);
      toast.error('Failed to delete certificate');
    } finally {
      setIsDeleting(false);
      setCertificateIdToDelete(null);
    }
  };

  const handleCertificateSaved = () => {
    // Refresh the data
    window.location.reload();
  };

  const formatDate = (dateString: string | null) => {
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
      case 'expired':
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Expired
          </Badge>
        );
      case 'revoked':
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Revoked
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Define columns for the data table
  const columns: ColumnDef<Certificate>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'certificate_number',
      header: 'Certificate Number',
      cell: ({ row }) => (
        <div className="font-medium">{row.original.certificate_number}</div>
      ),
    },
    {
      accessorKey: 'student_name',
      header: 'Student',
      cell: ({ row }) => (
        <div className="font-medium">
          {row.original.student.first_name} {row.original.student.last_name}
        </div>
      ),
    },
    {
      accessorKey: 'training_name',
      header: 'Training',
      cell: ({ row }) => (
        <div>
          <div>{row.original.training.name}</div>
          <div className="text-xs text-muted-foreground">{row.original.training.code}</div>
        </div>
      ),
    },
    {
      accessorKey: 'issue_date',
      header: 'Issue Date',
      cell: ({ row }) => formatDate(row.original.issue_date),
    },
    {
      accessorKey: 'expiry_date',
      header: 'Expiry Date',
      cell: ({ row }) => formatDate(row.original.expiry_date),
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
      <Head title="Certificates Management" />

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Certificates Management</h1>

          <Button onClick={openCreateModal}>
            <Award className="mr-2 h-4 w-4" />
            Issue Certificate
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Certificates</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics?.totalCertificates || 0}</div>
              <p className="text-xs text-muted-foreground">Issued certificates</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Certificates</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics?.activeCertificates || 0}</div>
              <p className="text-xs text-muted-foreground">Valid certificates</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Issued This Month</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics?.issuedThisMonth || 0}</div>
              <p className="text-xs text-muted-foreground">New certificates</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics?.expiringCertificates || 0}</div>
              <p className="text-xs text-muted-foreground">Within 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Expired Certificates</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics?.expiredCertificates || 0}</div>
              <p className="text-xs text-muted-foreground">Need renewal</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Revoked Certificates</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics?.revokedCertificates || 0}</div>
              <p className="text-xs text-muted-foreground">Canceled certificates</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Top Training</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {statistics?.topTrainings && statistics.topTrainings.length > 0 ? (
                <>
                  <div className="text-xl font-medium truncate">{statistics.topTrainings[0].name}</div>
                  <p className="text-xs text-muted-foreground">{statistics.topTrainings[0].count} certificates</p>
                </>
              ) : (
                <>
                  <div className="text-xl font-medium">No data</div>
                  <p className="text-xs text-muted-foreground">No certificates issued</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Certificates Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Certificates</CardTitle>
            <CardDescription>Manage and view all certificates</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={certificatesList}
              searchKey="certificate_number"
              searchPlaceholder="Search by certificate number..."
              tablePrefix="certificates"
            />
          </CardContent>
        </Card>
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        certificate={selectedCertificate}
        mode={modalMode}
        onSuccess={handleCertificateSaved}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={isConfirmDeleteOpen} onOpenChange={setIsConfirmDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Certificate</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this certificate? This action cannot be undone.
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
              onClick={handleDeleteCertificate}
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
