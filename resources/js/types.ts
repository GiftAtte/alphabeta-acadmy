// Type definitions for the application
import * as React from 'react';

export interface BreadcrumbItem {
  title: string;
  href: string;
}

// Table types from react-table
export interface ColumnDef<T> {
  accessorKey?: string;
  id?: string;
  header: string;
  cell?: ({ row }: { row: Row<T> }) => React.ReactNode;
  meta?: Record<string, any>;
}

export interface Row<T> {
  original: T;
}
