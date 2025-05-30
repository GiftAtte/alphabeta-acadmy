import { CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
  type?: 'student' | 'certificate' | 'training';
}

/**
 * A reusable status badge component that shows different styling based on status
 */
export default function StatusBadge({ status, type = 'student' }: StatusBadgeProps) {
  // Default styling for unknown status
  let icon = <AlertCircle className="h-4 w-4 text-gray-500" />;
  let label = status.charAt(0).toUpperCase() + status.slice(1);
  let textColor = 'text-gray-600';
  let bgColor = 'bg-gray-100';

  // Student status badges
  if (type === 'student') {
    switch (status) {
      case 'active':
        icon = <CheckCircle className="h-4 w-4 text-green-500" />;
        textColor = 'text-green-600';
        bgColor = 'bg-green-50';
        break;
      case 'inactive':
        icon = <XCircle className="h-4 w-4 text-gray-500" />;
        textColor = 'text-gray-600';
        bgColor = 'bg-gray-100';
        break;
      case 'suspended':
        icon = <XCircle className="h-4 w-4 text-red-500" />;
        textColor = 'text-red-600';
        bgColor = 'bg-red-50';
        break;
    }
  }

  // Certificate status badges
  if (type === 'certificate') {
    switch (status) {
      case 'valid':
        icon = <CheckCircle className="h-4 w-4 text-green-500" />;
        textColor = 'text-green-600';
        bgColor = 'bg-green-50';
        break;
      case 'expired':
        icon = <Clock className="h-4 w-4 text-amber-500" />;
        textColor = 'text-amber-600';
        bgColor = 'bg-amber-50';
        break;
      case 'revoked':
        icon = <XCircle className="h-4 w-4 text-red-500" />;
        textColor = 'text-red-600';
        bgColor = 'bg-red-50';
        break;
    }
  }

  // Training status badges
  if (type === 'training') {
    switch (status) {
      case 'active':
        icon = <CheckCircle className="h-4 w-4 text-green-500" />;
        textColor = 'text-green-600';
        bgColor = 'bg-green-50';
        break;
      case 'upcoming':
        icon = <Clock className="h-4 w-4 text-blue-500" />;
        textColor = 'text-blue-600';
        bgColor = 'bg-blue-50';
        break;
      case 'completed':
        icon = <CheckCircle className="h-4 w-4 text-purple-500" />;
        textColor = 'text-purple-600';
        bgColor = 'bg-purple-50';
        break;
      case 'canceled':
        icon = <XCircle className="h-4 w-4 text-red-500" />;
        textColor = 'text-red-600';
        bgColor = 'bg-red-50';
        break;
    }
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full ${bgColor}`}>
      {icon}
      <span className={`text-xs font-medium ${textColor}`}>{label}</span>
    </div>
  );
}
