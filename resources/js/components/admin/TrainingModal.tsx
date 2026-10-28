import { useState, useEffect } from 'react';
import Modal from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import axios from 'axios';

interface Training {
  id?: string;
  name: string;
  code: string;
  description: string;
  category: string;
  duration: number | string;
  price: number | string;
  start_date?: string;
  end_date?: string;
  instructor?: string;
  location?: string;
  status: string;
  max_students?: number | string;
  current_students?: number;
}

interface TrainingModalProps {
  isOpen: boolean;
  onClose: () => void;
  training: Training | null | undefined;
  mode: 'create' | 'edit';
  onSuccess: () => void;
}

const emptyTraining: Training = {
  name: '',
  code: '',
  description: '',
  category: '',
  duration: '',
  price: '',
  status: 'active',
  start_date: '',
  end_date: '',
  instructor: '',
  location: '',
  max_students: 0,
  current_students: 0
};

export default function TrainingModal({ isOpen, onClose, training, mode, onSuccess }: TrainingModalProps) {
  const [formData, setFormData] = useState<Training>(emptyTraining);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (training && mode === 'edit') {
      // Map the training data to match the form fields
      setFormData({
        id: training.id,
        name: training.name || '',
        code: training.code || '',
        description: training.description || '',
        category: training.category || '',
        duration: training.duration || '',
        price: training.price || '',
        status: training.status || 'active',
        start_date: training.start_date || '',
        end_date: training.end_date || '',
        instructor: training.instructor || '',
        location: training.location || '',
        max_students: training.max_students || 0,
        current_students: training.current_students || 0
      });
    } else {
      setFormData(emptyTraining);
    }

    setErrors({});
  }, [training, mode, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

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
      // Convert numeric fields
      // Axios sends the always-fresh XSRF-TOKEN cookie as X-XSRF-TOKEN on its own.
      // Do not send the <meta> token: it goes stale after login/session regeneration.
      const submissionData = {
        ...formData,
        duration: formData.duration === '' ? null : String(formData.duration),
        price: formData.price === '' ? null : Number(formData.price),
        max_students: formData.max_students === '' ? null : Number(formData.max_students),
      };
      const config = { headers: { Accept: 'application/json' } };

      if (mode === 'create') {
        await axios.post('/admin/trainings', submissionData, config);
      } else if (training?.id) {
        await axios.put(`/admin/trainings/${training.id}`, submissionData, config);
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
      title={mode === 'create' ? 'Add New Training' : 'Edit Training'}
      size="lg"
      closeOnOutsideClick={false}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Training Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              Training Code *
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className={`w-full rounded-md border ${errors.code ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            />
            {errors.code && (
              <p className="mt-1 text-sm text-red-600">{errors.code}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={`w-full rounded-md border ${errors.description ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full rounded-md border ${errors.category ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            />
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
              Duration (hours)
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              min="0"
              value={formData.duration}
              onChange={handleChange}
              className={`w-full rounded-md border ${errors.duration ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            />
            {errors.duration && (
              <p className="mt-1 text-sm text-red-600">{errors.duration}</p>
            )}
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleChange}
              className={`w-full rounded-md border ${errors.price ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price}</p>
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
              className={`w-full rounded-md border ${errors.status ? 'border-red-500' : 'border-gray-300'} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="upcoming">Upcoming</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-600">{errors.status}</p>
            )}
          </div>


        </div>

        <div className="flex justify-end gap-3 mt-6">
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
            {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Training' : 'Update Training'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
