import { useState, useEffect } from 'react';
import Modal from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import axios from 'axios';

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

// Export the Enrollment interface
export interface Enrollment {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  training_name?: string;
  training_code?: string;
  student_id: string;
  training_id: string;
  enrollment_date: string;
  completion_date: string | null;
  status: string;
  payment_status: string;
}

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  enrollment: Enrollment | null;
  mode: 'create' | 'edit';
  onSuccess: () => void;
}

const emptyEnrollment: Enrollment = {
  student_id: '',
  training_id: '',
  enrollment_date: new Date().toISOString().split('T')[0],
  completion_date: null,
  status: 'enrolled',
  payment_status: 'pending'
};

export default function EnrollmentModal({ isOpen, onClose, enrollment, mode, onSuccess }: EnrollmentModalProps) {
  const [formData, setFormData] = useState<Enrollment>(emptyEnrollment);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      setIsLoading(true);
      try {
        const [studentsResponse, trainingsResponse] = await Promise.all([
          axios.get('/admin/students-dropdown'),
          axios.get('/admin/trainings-dropdown')
        ]);

        setStudents(studentsResponse.data.data || []);
        setTrainings(trainingsResponse.data.data || []);
      } catch (error) {
        console.error('Error fetching options:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    if (enrollment && mode === 'edit') {
      // Find the actual student_id and training_id since we're getting the flattened data
      const updatedData = {
        ...enrollment,
        student_id: enrollment.student_id || '',
        training_id: enrollment.training_id || ''
      };
      setFormData(updatedData);
    } else {
      setFormData(emptyEnrollment);
    }

    setErrors({});
  }, [enrollment, mode, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value === '' && name === 'completion_date' ? null : value }));

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
      const submissionData = {
        student_id: formData.student_id,
        training_id: formData.training_id,
        enrollment_date: formData.enrollment_date,
        completion_date: formData.completion_date,
        status: formData.status,
        payment_status: formData.payment_status
      };

      if (mode === 'create') {
        await axios.post('/admin/enrollments', submissionData);
      } else if (enrollment?.id) {
        await axios.put(`/admin/enrollments/${enrollment.id}`, submissionData);
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'create' ? 'Add New Enrollment' : 'Edit Enrollment'}
      size="md"
    >
      {isLoading ? (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="student_id" className="block text-sm font-medium text-gray-700 mb-1">
                Student *
              </label>
              <select
                id="student_id"
                name="student_id"
                value={formData.student_id}
                onChange={handleChange}
                disabled={mode === 'edit'}
                className={`w-full rounded-md border ${errors.student_id ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${mode === 'edit' ? 'bg-gray-100' : ''}`}
              >
                <option value="">Select Student</option>
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.first_name} {student.last_name} ({student.email})
                  </option>
                ))}
              </select>
              {errors.student_id && (
                <p className="mt-1 text-sm text-red-600">{errors.student_id}</p>
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
                disabled={mode === 'edit'}
                className={`w-full rounded-md border ${errors.training_id ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${mode === 'edit' ? 'bg-gray-100' : ''}`}
              >
                <option value="">Select Training</option>
                {trainings.map(training => (
                  <option key={training.id} value={training.id}>
                    {training.name} ({training.code})
                  </option>
                ))}
              </select>
              {errors.training_id && (
                <p className="mt-1 text-sm text-red-600">{errors.training_id}</p>
              )}
            </div>

            <div>
              <label htmlFor="enrollment_date" className="block text-sm font-medium text-gray-700 mb-1">
                Enrollment Date *
              </label>
              <input
                type="date"
                id="enrollment_date"
                name="enrollment_date"
                value={formData.enrollment_date}
                onChange={handleChange}
                className={`w-full rounded-md border ${errors.enrollment_date ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              />
              {errors.enrollment_date && (
                <p className="mt-1 text-sm text-red-600">{errors.enrollment_date}</p>
              )}
            </div>

            <div>
              <label htmlFor="completion_date" className="block text-sm font-medium text-gray-700 mb-1">
                Completion Date
              </label>
              <input
                type="date"
                id="completion_date"
                name="completion_date"
                value={formData.completion_date || ''}
                onChange={handleChange}
                className={`w-full rounded-md border ${errors.completion_date ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              />
              {errors.completion_date && (
                <p className="mt-1 text-sm text-red-600">{errors.completion_date}</p>
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
                <option value="enrolled">Enrolled</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="dropped">Dropped</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">{errors.status}</p>
              )}
            </div>

            <div>
              <label htmlFor="payment_status" className="block text-sm font-medium text-gray-700 mb-1">
                Payment Status *
              </label>
              <select
                id="payment_status"
                name="payment_status"
                value={formData.payment_status}
                onChange={handleChange}
                className={`w-full rounded-md border ${errors.payment_status ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              >
                <option value="pending">Pending</option>
                <option value="partial">Partial</option>
                <option value="paid">Paid</option>
                <option value="refunded">Refunded</option>
              </select>
              {errors.payment_status && (
                <p className="mt-1 text-sm text-red-600">{errors.payment_status}</p>
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
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Enrollment' : 'Update Enrollment'}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
