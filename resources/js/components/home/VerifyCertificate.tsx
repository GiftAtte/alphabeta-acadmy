import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Search, Loader2, XCircle, Calendar, Award } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import axios from 'axios';

interface VerifyCertificateProps {
  isOpen: boolean;
  onClose: () => void;
}

interface VerificationResult {
  isValid: boolean;
  certificate?: {
    certificate_number: string;
    issue_date: string;
    expiry_date: string;
    status: string;
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

export default function VerifyCertificate({ isOpen, onClose }: VerifyCertificateProps) {
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

  const getCertificateStatusBadge = (status: string) => {
    switch (status) {
      case 'valid':
      case 'active':
        return (
          <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Valid
          </Badge>
        );
      case 'expired':
        return (
          <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">
            <Calendar className="h-3 w-3 mr-1" />
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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify Certificate</DialogTitle>
          <DialogDescription>
            Enter your certificate number below to verify its authenticity
          </DialogDescription>
        </DialogHeader>

        {!result ? (
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="certificate_number">Certificate Number</Label>
              <Input
                id="certificate_number"
                value={certificateNumber}
                onChange={(e) => setCertificateNumber(e.target.value)}
                placeholder="Enter certificate number (e.g., CERT-12345)"
                className={error ? 'border-red-500' : ''}
              />
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </div>

            <DialogFooter>
              <Button
                type="submit"
                disabled={isVerifying}
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Verify Certificate
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="space-y-6">
            {result.isValid ? (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mt-3 text-lg font-medium">Certificate Verified!</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  This certificate is valid and was issued by Alpha Beta Safety Academy.
                </p>
              </div>
            ) : (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-destructive/20">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="mt-3 text-lg font-medium">Invalid Certificate</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {result.message || "We couldn't verify this certificate. Please check the number and try again."}
                </p>
              </div>
            )}

            {result.isValid && result.certificate && (
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      <span className="font-medium">Certificate Details</span>
                    </div>
                    {getCertificateStatusBadge(result.certificate.status)}
                  </div>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Certificate Number</p>
                      <p className="text-sm font-medium">{result.certificate.certificate_number}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Student Name</p>
                      <p className="text-sm font-medium">
                        {result.certificate.student.first_name} {result.certificate.student.last_name}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Course</p>
                      <p className="text-sm font-medium">{result.certificate.training.name}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Course Code</p>
                      <p className="text-sm font-medium">{result.certificate.training.code}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Issue Date</p>
                      <p className="text-sm font-medium">{formatDate(result.certificate.issue_date)}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Expiry Date</p>
                      <p className="text-sm font-medium">{formatDate(result.certificate.expiry_date)}</p>
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="text-sm font-medium">{result.certificate.training.duration} hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <DialogFooter>
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
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
