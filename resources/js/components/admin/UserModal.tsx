import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import Modal from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import InputError from '@/components/input-error';

interface User {
  id?: number;
  name: string;
  email: string;
  role: string;
}

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  mode: 'create' | 'edit';
  onSuccess: () => void;
}

export default function UserModal({ isOpen, onClose, user, mode, onSuccess }: UserModalProps) {
  const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'user',
  });

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      reset();
      clearErrors();

      // If editing, populate form with user data
      if (user && mode === 'edit') {
        setData({
          name: user.name,
          email: user.email,
          password: '',
          password_confirmation: '',
          role: user.role,
        });
      }
    }
  }, [isOpen, user, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'create') {
      post(route('users.store'), {
        onSuccess: () => {
          onSuccess();
          onClose();
        },
      });
    } else if (mode === 'edit' && user?.id) {
      put(route('users.update', user.id), {
        onSuccess: () => {
          onSuccess();
          onClose();
        },
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'create' ? 'Create User' : 'Edit User'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6 p-6">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="h-10"
              required
            />
            <InputError message={errors.name} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="h-10"
              required
            />
            <InputError message={errors.email} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password {mode === 'edit' && '(leave blank to keep current)'}
            </Label>
            <Input
              id="password"
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              className="h-10"
              required={mode === 'create'}
            />
            <InputError message={errors.password} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password_confirmation" className="text-sm font-medium">
              Confirm Password
            </Label>
            <Input
              id="password_confirmation"
              type="password"
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              className="h-10"
              required={mode === 'create' || data.password !== ''}
            />
            <InputError message={errors.password_confirmation} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="role" className="text-sm font-medium">
              Role
            </Label>
            <Select
              value={data.role}
              onValueChange={(value) => setData('role', value)}
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <InputError message={errors.role} />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="mr-2"
            disabled={processing}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={processing}>
            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            {processing
              ? mode === 'create' ? 'Creating...' : 'Updating...'
              : mode === 'create' ? 'Create User' : 'Update User'
            }
          </Button>
        </div>
      </form>
    </Modal>
  );
} 