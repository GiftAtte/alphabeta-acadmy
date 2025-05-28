import { Link } from '@inertiajs/react';
import { Home, AlertTriangle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="flex justify-center mb-6">
          <AlertTriangle size={64} className="text-secondary-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-900 mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-heading font-semibold text-primary-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-neutral-600 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="inline-flex items-center bg-primary-900 hover:bg-primary-800 text-white py-3 px-6 rounded-md transition-colors font-medium"
        >
          <Home size={20} className="mr-2" />
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;