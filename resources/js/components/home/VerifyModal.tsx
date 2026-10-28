import { useState } from 'react';
import Modal from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Search } from 'lucide-react';
import axios from 'axios';

interface VerifyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface VerificationResult {
  isValid: boolean;
  certificate?: {
    certificate_number: string;
    issue_date: string;
    expiry_date: string;
    student: {
      first_name: string;
      last_name: string;
    };
    training: {
      name: string;
      code: string;
      duration: number;
    };
  };
  message?: string;
}

export default function VerifyModal({ isOpen, onClose }: VerifyModalProps) {
  const [certificateNumber, setCertificateNumber] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState('');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!certificateNumber.trim()) {
      setError('Please enter a certificate number');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      const response = await axios.post('/verify-certificate', {
        certificate_number: certificateNumber
      });

      setResult(response.data);
    } catch (error: any) {
      console.error('Verification error:', error);
      setError(error.response?.data?.message || 'An error occurred during verification');
      setResult(null);
    } finally {
      setIsVerifying(false);
    }
  };

  const resetForm = () => {
    setCertificateNumber('');
    setResult(null);
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Verify Certificate"
      size="md"
    >
      <div className="space-y-6">
        {!result ? (
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label htmlFor="certificate_number" className="block text-sm font-medium text-gray-700 mb-1">
                Certificate Number
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="certificate_number"
                  value={certificateNumber}
                  onChange={(e) => setCertificateNumber(e.target.value)}
                  className={`block w-full rounded-md border ${error ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  placeholder="Enter certificate number (e.g., CERT-12345)"
                />
              </div>
              {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isVerifying}
              >
                {isVerifying ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Search className="mr-2 h-4 w-4" />
                    Verify Certificate
                  </span>
                )}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            {result.isValid ? (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">Certificate Verified!</h3>
                <p className="mt-2 text-sm text-gray-500">
                  This certificate is valid and was issued by Alpha Beta Safety Academy.
                </p>
              </div>
            ) : (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">Invalid Certificate</h3>
                <p className="mt-2 text-sm text-gray-500">
                  {result.message || "We couldn't verify this certificate. Please check the number and try again."}
                </p>
              </div>
            )}

            {result.isValid && result.certificate && (
              <div className="mt-6 border-t border-gray-200 pt-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Certificate Number</dt>
                    <dd className="mt-1 text-sm text-gray-900">{result.certificate.certificate_number}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Student Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {result.certificate.student.first_name} {result.certificate.student.last_name}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Course</dt>
                    <dd className="mt-1 text-sm text-gray-900">{result.certificate.training.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Course Code</dt>
                    <dd className="mt-1 text-sm text-gray-900">{result.certificate.training.code}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Duration</dt>
                    <dd className="mt-1 text-sm text-gray-900">{result.certificate.training.duration} hours</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Issue Date</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatDate(result.certificate.issue_date)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Expiry Date</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatDate(result.certificate.expiry_date)}</dd>
                  </div>
                </dl>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <Button
                variant="outline"
                onClick={resetForm}
                className="mr-3"
              >
                Verify Another
              </Button>
              <Button onClick={handleClose}>
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
