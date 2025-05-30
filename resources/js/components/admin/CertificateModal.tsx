import { useState, useEffect } from 'react';
import Modal from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Plus } from 'lucide-react';
import { router } from '@inertiajs/react';
import StudentModal from '@/components/admin/StudentModal';

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
  id?: string;
  certificate_number: string;
  issue_date: string;
  expiry_date: string | null;
  status: string;
  grade: string;
  notes: string;
  student_id: string;
  training_id: string;
  student?: Student;
  training?: Training;
}

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: Certificate | null;
  mode: 'create' | 'edit';
  onSuccess: () => void;
}

const emptyCertificate: Certificate = {
  certificate_number: '',
  issue_date: new Date().toISOString().split('T')[0],
  expiry_date: null,
  status: 'active',
  grade: '',
  notes: '',
  student_id: '',
  training_id: ''
};

export default function CertificateModal({ isOpen, onClose, certificate, mode, onSuccess }: CertificateModalProps) {
  const [formData, setFormData] = useState<Certificate>(emptyCertificate);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      setIsLoading(true);
      setDataError(null);
      try {
        const [studentsResponse, trainingsResponse] = await Promise.all([
          axios.get('/admin/students-dropdown', {
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
          }),
          axios.get('/admin/trainings-dropdown', {
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
          })
        ]);

        if (studentsResponse.data && studentsResponse.data.data) {
          setStudents(studentsResponse.data.data);
        } else {
          console.warn('Students data format unexpected:', studentsResponse.data);
          setStudents([]);
        }

        if (trainingsResponse.data && trainingsResponse.data.data) {
          setTrainings(trainingsResponse.data.data);
        } else {
          console.warn('Trainings data format unexpected:', trainingsResponse.data);
          setTrainings([]);
        }
      } catch (error) {
        console.error('Error fetching options:', error);
        setDataError('Failed to load students and training data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchOptions();
    }
  }, [isOpen]);

  useEffect(() => {
    if (certificate && mode === 'edit') {
      setFormData(certificate);
    } else {
      setFormData(emptyCertificate);
    }

    setErrors({});
  }, [certificate, mode, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value === '' && name === 'expiry_date' ? null : value }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (mode === 'create') {
        await axios.post('/admin/certificates', formData, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });
      } else {
        await axios.put(`/admin/certificates/${certificate?.id}`, formData, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });
      }

      onSuccess();
      onClose();
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Error submitting form:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateCertificateNumber = () => {
    const prefix = 'CERT';
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

    setFormData(prev => ({
      ...prev,
      certificate_number: `${prefix}-${timestamp}-${random}`
    }));
  };

  const handleAddNewStudent = () => {
    setIsStudentModalOpen(true);
  };

  const handleStudentAdded = async () => {
    // Refresh the students list
    try {
      const response = await axios.get('/admin/students', {
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      });

      if (response.data && response.data.data) {
        setStudents(response.data.data);
        toast.success('Student added successfully');
      }
    } catch (error) {
      console.error('Error fetching updated students list:', error);
    }

    setIsStudentModalOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={mode === 'create' ? 'Issue New Certificate' : 'Edit Certificate'}
        size="lg"
      >
        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : dataError ? (
          <div className="p-4 text-center">
            <p className="text-red-500">{dataError}</p>
            <Button
              className="mt-4"
              onClick={() => {
                setIsLoading(true);
                window.location.reload();
              }}
            >
              Try Again
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <div className="flex items-end gap-2">
                  <div className="flex-grow">
                    <label htmlFor="certificate_number" className="block text-sm font-medium text-gray-700 mb-1">
                      Certificate Number *
                    </label>
                    <input
                      type="text"
                      id="certificate_number"
                      name="certificate_number"
                      value={formData.certificate_number}
                      onChange={handleChange}
                      className={`w-full rounded-md border ${errors.certificate_number ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateCertificateNumber}
                  >
                    Generate
                  </Button>
                </div>
                {errors.certificate_number && (
                  <p className="mt-1 text-sm text-red-600">{errors.certificate_number}</p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="student_id" className="block text-sm font-medium text-gray-700">
                    Student *
                  </label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={handleAddNewStudent}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add New Student
                  </Button>
                </div>
                <select
                  id="student_id"
                  name="student_id"
                  value={formData.student_id}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${errors.student_id ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                >
                  <option value="">Select Student</option>
                  {students.length > 0 ? (
                    students.map(student => (
                      <option key={student.id} value={student.id}>
                        {student.first_name} {student.last_name} ({student.email})
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>No students available</option>
                  )}
                </select>
                {errors.student_id && (
                  <p className="mt-1 text-sm text-red-600">{errors.student_id}</p>
                )}
                {students.length === 0 && (
                  <p className="mt-1 text-xs text-amber-600">
                    No students found. Please add a student first.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="training_id" className="block text-sm font-medium text-gray-700 mb-1">
                  Training *
                </label>
                <select
                  id="training_id"
                  name="training_id"
                  value={formData.training_id}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${errors.training_id ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                >
                  <option value="">Select Training</option>
                  {trainings.length > 0 ? (
                    trainings.map(training => (
                      <option key={training.id} value={training.id}>
                        {training.name} ({training.code})
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>No trainings available</option>
                  )}
                </select>
                {errors.training_id && (
                  <p className="mt-1 text-sm text-red-600">{errors.training_id}</p>
                )}
                {trainings.length === 0 && (
                  <p className="mt-1 text-xs text-amber-600">
                    No trainings found. Please add trainings first.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="issue_date" className="block text-sm font-medium text-gray-700 mb-1">
                  Issue Date *
                </label>
                <input
                  type="date"
                  id="issue_date"
                  name="issue_date"
                  value={formData.issue_date}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${errors.issue_date ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                />
                {errors.issue_date && (
                  <p className="mt-1 text-sm text-red-600">{errors.issue_date}</p>
                )}
              </div>

              <div>
                <label htmlFor="expiry_date" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  id="expiry_date"
                  name="expiry_date"
                  value={formData.expiry_date || ''}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${errors.expiry_date ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                />
                {errors.expiry_date && (
                  <p className="mt-1 text-sm text-red-600">{errors.expiry_date}</p>
                )}
              </div>

              <div>
                <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                  Grade
                </label>
                <input
                  type="text"
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${errors.grade ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                />
                {errors.grade && (
                  <p className="mt-1 text-sm text-red-600">{errors.grade}</p>
                )}
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${errors.status ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                >
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="revoked">Revoked</option>
                </select>
                {errors.status && (
                  <p className="mt-1 text-sm text-red-600">{errors.status}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full rounded-md border ${errors.notes ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                />
                {errors.notes && (
                  <p className="mt-1 text-sm text-red-600">{errors.notes}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || students.length === 0 || trainings.length === 0}
              >
                {isSubmitting ? 'Saving...' : mode === 'create' ? 'Issue Certificate' : 'Update Certificate'}
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Student Modal */}
      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        mode="create"
        onSuccess={handleStudentAdded}
      />
    </>
  );
}
