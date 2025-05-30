import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface DataTableWrapperProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

/**
 * A reusable wrapper for data tables with consistent styling
 */
export default function DataTableWrapper({
  title,
  description,
  actions,
  children,
  footer
}: DataTableWrapperProps) {
  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {actions && <div className="flex justify-end md:justify-start">{actions}</div>}
      </CardHeader>
      <CardContent>
        {children}
        {footer && <div className="mt-6">{footer}</div>}
      </CardContent>
    </Card>
  );
}
