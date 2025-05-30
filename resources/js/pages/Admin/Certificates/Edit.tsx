import { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/admin-app-layout';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
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

interface EditCertificateProps {
  certificate: Certificate;
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
  {
    title: 'Edit',
    href: '#',
  },
];

export default function EditCertificate({ certificate }: EditCertificateProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  // When the modal is closed, navigate back to the certificates list
  const handleClose = () => {
    setIsModalOpen(false);
    router.visit('/admin/certificates');
  };

  // When a certificate is successfully updated, navigate back to certificates list
  const handleSuccess = () => {
    router.visit('/admin/certificates');
  };

  // Open the modal automatically when the page loads
  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit Certificate ${certificate.certificate_number}`} />

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">
            Edit Certificate: {certificate.certificate_number}
          </h1>

          <Button onClick={() => router.visit('/admin/certificates')}>
            Cancel
          </Button>
        </div>

        <div className="border rounded-md p-6 bg-white">
          <p className="text-muted-foreground mb-4">
            Please use the form to edit the certificate details.
          </p>

          {/* CertificateModal will open automatically */}
          <CertificateModal
            isOpen={isModalOpen}
            onClose={handleClose}
            certificate={certificate}
            mode="edit"
            onSuccess={handleSuccess}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
