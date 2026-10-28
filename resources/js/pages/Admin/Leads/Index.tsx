import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { PencilIcon, TrashIcon, UserIcon } from 'lucide-react';
import AdminLayout from '@/layouts/admin-app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DataTable } from '@/components/ui/data-table';
import type { ColumnDef } from '@/types';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
  notes?: string;
  created_at: string;
  updated_at: string;
  training: {
    id: string;
    name: string;
  };
}

interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

interface Props {
  leads: {
    data: Lead[];
    links: PaginationLinks;
    meta: PaginationMeta;
  };
}

const breadcrumbs = [
  {
    title: 'Admin',
    href: '/admin/dashboard',
  },
  {
    title: 'Leads',
    href: '/admin/leads',
  },
];

const LeadsIndex: React.FC<Props> = ({ leads }) => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [leadsList, setLeadsList] = useState(leads.data);

  const { data, setData, put, delete: destroy, processing, errors, reset } = useForm({
    status: '',
    notes: '',
  });

  const handleUpdate = (lead: Lead) => {
    setSelectedLead(lead);
    reset();
    setData({
      status: lead.status,
      notes: lead.notes || '',
    });
    setIsUpdateOpen(true);
  };

  const handleDelete = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDeleteOpen(true);
  };

  const handleViewDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDetailsOpen(true);
  };

  const submitUpdate = () => {
    if (!selectedLead) return;

    put(route('admin.leads.update', selectedLead.id), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        setLeadsList(prev =>
          prev.map(lead =>
            lead.id === selectedLead.id
              ? {
                  ...lead,
                  status: data.status as 'new' | 'contacted' | 'qualified' | 'converted' | 'closed',
                  notes: data.notes
                }
              : lead
          )
        );
        setIsUpdateOpen(false);
        reset();
      },
      onError: (errors) => {
        console.error('Error updating lead:', errors);
      }
    });
  };

  const submitDelete = () => {
    destroy(route('admin.leads.destroy', selectedLead?.id), {
      onSuccess: () => {
        setLeadsList(prev => prev.filter(lead => lead.id !== selectedLead?.id));
        setIsDeleteOpen(false);
      },
      onError: (errors) => {
        console.error('Error deleting lead:', errors);
      }
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">New</Badge>;
      case 'contacted':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200">Contacted</Badge>;
      case 'qualified':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200">Qualified</Badge>;
      case 'converted':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">Converted</Badge>;
      case 'closed':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Define columns for the data table
  const columns: ColumnDef<Lead>[] = [
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
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'training.name',
      header: 'Course Interest',
      cell: ({ row }) => row.original.training?.name || 'Not specified',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => getStatusBadge(row.original.status),
    },
    {
      accessorKey: 'created_at',
      header: 'Date',
      cell: ({ row }) => formatDate(row.original.created_at),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleViewDetails(row.original)}
          >
            <UserIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleUpdate(row.original)}
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="text-red-500"
            onClick={() => handleDelete(row.original)}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Head title="Leads Management" />

      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Leads Management</CardTitle>
              <CardDescription>
                Manage leads from the website's contact forms and inquiries
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardContent>
          <DataTable
            columns={columns}
            data={leadsList}
            searchKey="name"
            searchPlaceholder="Search leads..."
          />
        </CardContent>
      </Card>

      {/* Lead Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="mt-1">{selectedLead.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1">{selectedLead.email}</p>
              </div>
              {selectedLead.phone && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p className="mt-1">{selectedLead.phone}</p>
                </div>
              )}
              <div>
                <h3 className="text-sm font-medium text-gray-500">Course Interest</h3>
                <p className="mt-1">{selectedLead.training?.name || 'Not specified'}</p>
              </div>
              {selectedLead.message && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Message</h3>
                  <p className="mt-1 whitespace-pre-wrap">{selectedLead.message}</p>
                </div>
              )}
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <p className="mt-1">{getStatusBadge(selectedLead.status)}</p>
              </div>
              {selectedLead.notes && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                  <p className="mt-1 whitespace-pre-wrap">{selectedLead.notes}</p>
                </div>
              )}
              <div>
                <h3 className="text-sm font-medium text-gray-500">Created At</h3>
                <p className="mt-1">{formatDate(selectedLead.created_at)}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsDetailsOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Lead Dialog */}
      <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Lead Status</DialogTitle>
            <DialogDescription>
              Update the status and add notes for this lead.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select
                value={data.status}
                onValueChange={(value) => setData('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-red-500 text-sm">{errors.status}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Notes</label>
              <Textarea
                value={data.notes}
                onChange={(e) => setData('notes', e.target.value)}
                rows={4}
                placeholder="Add your notes here"
              />
              {errors.notes && (
                <p className="text-red-500 text-sm">{errors.notes}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsUpdateOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={submitUpdate} disabled={processing}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this lead? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={submitDelete}
              disabled={processing}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default LeadsIndex;
