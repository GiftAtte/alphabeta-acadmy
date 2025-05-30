import { useState, useEffect } from 'react';
import Modal from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';

interface Student {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  date_of_birth: string;
  gender: string;
  education_level: string;
  status: string;
  registration_date: string;
  [key: string]: string | undefined; // Add index signature for Inertia form
}

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student?: Student;
  mode: 'create' | 'edit';
  onSuccess: () => void;
}

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];

const emptyStudent: Student = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  address: '',
  date_of_birth: '',
  gender: '',
  education_level: '',
  status: 'active',
  registration_date: today
};

export default function StudentModal({ isOpen, onClose, student, mode, onSuccess }: StudentModalProps) {
  const [formData, setFormData] = useState<Student>(emptyStudent);

  // Setup Inertia form
  const { setData, post, put, processing, errors: formErrors, reset } = useForm<Student>(emptyStudent);

  useEffect(() => {
    if (student && mode === 'edit') {
      setFormData(student);
      setData(student);
    } else {
      setFormData(emptyStudent);
      setData(emptyStudent);
    }

    // Clear form when modal is closed
    if (!isOpen) {
      reset();
    }
  }, [student, mode, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setData(name, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'create') {
      post('/admin/students', {
        onSuccess: () => {
          onSuccess();
          onClose();
        }
      });
    } else if (student?.id) {
      put(`/admin/students/${student.id}`, {
        onSuccess: () => {
          onSuccess();
          onClose();
        }
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'create' ? 'Add New Student' : 'Edit Student'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className={`w-full rounded-md border ${formErrors.first_name ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            />
            {formErrors.first_name && (
              <p className="mt-1 text-sm text-red-600">{formErrors.first_name}</p>
            )}
          </div>

          <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className={`w-full rounded-md border ${formErrors.last_name ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            />
            {formErrors.last_name && (
              <p className="mt-1 text-sm text-red-600">{formErrors.last_name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-md border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            />
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full rounded-md border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            />
            {formErrors.phone && (
              <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className={`w-full rounded-md border ${formErrors.address ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            />
            {formErrors.address && (
              <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
            )}
          </div>

          <div>
            <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              id="date_of_birth"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className={`w-full rounded-md border ${formErrors.date_of_birth ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            />
            {formErrors.date_of_birth && (
              <p className="mt-1 text-sm text-red-600">{formErrors.date_of_birth}</p>
            )}
          </div>

          <div>
            <label htmlFor="registration_date" className="block text-sm font-medium text-gray-700 mb-1">
              Registration Date *
            </label>
            <input
              type="date"
              id="registration_date"
              name="registration_date"
              value={formData.registration_date}
              onChange={handleChange}
              className={`w-full rounded-md border ${formErrors.registration_date ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            />
            {formErrors.registration_date && (
              <p className="mt-1 text-sm text-red-600">{formErrors.registration_date}</p>
            )}
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full rounded-md border ${formErrors.gender ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {formErrors.gender && (
              <p className="mt-1 text-sm text-red-600">{formErrors.gender}</p>
            )}
          </div>

          <div>
            <label htmlFor="education_level" className="block text-sm font-medium text-gray-700 mb-1">
              Education Level
            </label>
            <select
              id="education_level"
              name="education_level"
              value={formData.education_level}
              onChange={handleChange}
              className={`w-full rounded-md border ${formErrors.education_level ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            >
              <option value="">Select Education Level</option>
              <option value="high_school">High School</option>
              <option value="associate">Associate Degree</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
              <option value="doctorate">Doctorate</option>
              <option value="other">Other</option>
            </select>
            {formErrors.education_level && (
              <p className="mt-1 text-sm text-red-600">{formErrors.education_level}</p>
            )}
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`w-full rounded-md border ${formErrors.status ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
            {formErrors.status && (
              <p className="mt-1 text-sm text-red-600">{formErrors.status}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={processing}
          >
            {processing ? 'Saving...' : mode === 'create' ? 'Create Student' : 'Update Student'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
