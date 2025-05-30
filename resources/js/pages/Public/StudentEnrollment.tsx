import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/web-nav';

interface Training {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  category: string;
}

interface Props {
  trainings: Training[];
}

export default function StudentEnrollment({ trainings }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    training_id: '',
    address: '',
    city: '',
    state: '',
    country: '',
    emergency_contact: '',
    emergency_phone: '',
  });

  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/student/enroll');
  };

  const handleTrainingChange = (value: string) => {
    setData('training_id', value);
    const training = trainings.find(t => t.id === value) || null;
    setSelectedTraining(training);
  };

  return (
    <>
      <Head title="Student Enrollment" />
      <Header />

      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Student Enrollment</CardTitle>
            <CardDescription>
              Fill out this form to enroll in one of our training programs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="first_name"
                    value={data.first_name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('first_name', e.target.value)}
                    required
                  />
                  {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="last_name"
                    value={data.last_name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('last_name', e.target.value)}
                    required
                  />
                  {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('email', e.target.value)}
                    required
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone <span className="text-red-500">*</span></Label>
                  <Input
                    id="phone"
                    value={data.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('phone', e.target.value)}
                    required
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="training_id">Training Program <span className="text-red-500">*</span></Label>
                  <Select
                    value={data.training_id}
                    onValueChange={handleTrainingChange}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a training program" />
                    </SelectTrigger>
                    <SelectContent>
                      {trainings.map((training) => (
                        <SelectItem key={training.id} value={training.id}>
                          {training.title} ({training.category})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.training_id && <p className="text-red-500 text-sm">{errors.training_id}</p>}
                </div>

                {selectedTraining && (
                  <div className="md:col-span-2 p-4 bg-muted rounded-lg">
                    <h3 className="font-medium text-lg">{selectedTraining.title}</h3>
                    <p className="text-sm mt-1">{selectedTraining.description}</p>
                    <div className="flex flex-wrap gap-4 mt-3">
                      <div>
                        <span className="font-medium">Price:</span> ${selectedTraining.price}
                      </div>
                      <div>
                        <span className="font-medium">Duration:</span> {selectedTraining.duration} hours
                      </div>
                      <div>
                        <span className="font-medium">Category:</span> {selectedTraining.category}
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={data.address}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('address', e.target.value)}
                    rows={2}
                  />
                  {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={data.city}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('city', e.target.value)}
                  />
                  {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    id="state"
                    value={data.state}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('state', e.target.value)}
                  />
                  {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={data.country}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('country', e.target.value)}
                  />
                  {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergency_contact">Emergency Contact</Label>
                  <Input
                    id="emergency_contact"
                    value={data.emergency_contact}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('emergency_contact', e.target.value)}
                  />
                  {errors.emergency_contact && <p className="text-red-500 text-sm">{errors.emergency_contact}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergency_phone">Emergency Contact Phone</Label>
                  <Input
                    id="emergency_phone"
                    value={data.emergency_phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('emergency_phone', e.target.value)}
                  />
                  {errors.emergency_phone && <p className="text-red-500 text-sm">{errors.emergency_phone}</p>}
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button type="submit" disabled={processing} className="px-8">
                  {processing ? 'Submitting...' : 'Enroll Now'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
