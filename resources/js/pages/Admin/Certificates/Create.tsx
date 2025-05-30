import { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/admin-app-layout';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import CertificateModal from '@/components/admin/CertificateModal';

const breadcrumbs = [
  {
    title: 'Admin',
    href: '/admin/dashboard',
  },
  {
    title: 'Certificates',
    href: '/admin/certificates',
  },
  {
    title: 'Create',
    href: '/admin/certificates/create',
  },
];

export default function CreateCertificate() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  // When the modal is closed, navigate back to the certificates list
  const handleClose = () => {
    setIsModalOpen(false);
    router.visit('/admin/certificates');
  };

  // When a certificate is successfully created, navigate back to certificates list
  const handleSuccess = () => {
    router.visit('/admin/certificates');
  };

  // Open the modal automatically when the page loads
  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Certificate" />

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Create Certificate</h1>

          <Button onClick={() => router.visit('/admin/certificates')}>
            Cancel
          </Button>
        </div>

        <div className="border rounded-md p-6 bg-white">
          <p className="text-muted-foreground mb-4">
            Please use the form to create a new certificate.
          </p>

          {/* CertificateModal will open automatically */}
          <CertificateModal
            isOpen={isModalOpen}
            onClose={handleClose}
            certificate={null}
            mode="create"
            onSuccess={handleSuccess}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
