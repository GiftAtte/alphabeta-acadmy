/**
 * Utility functions for table configurations
 */

import type { ColumnDef } from "@/types";

/**
 * Creates a set of columns for data tables, automatically hiding ID fields
 * @param columns The column definitions to process
 * @returns Column definitions with ID columns hidden
 */
export function createColumns<T>(columns: ColumnDef<T>[]): ColumnDef<T>[] {
  return columns.map(column => {
    // If this is an ID column, hide it by default
    if (column.accessorKey === 'id' || column.id === 'id') {
      return {
        ...column,
        meta: {
          ...column.meta,
          isHidden: true,
        },
      };
    }

    // For any column with "id" in its name, hide it unless explicitly shown
    if (typeof column.accessorKey === 'string' &&
        (column.accessorKey.includes('_id') || column.accessorKey.endsWith('Id'))) {
      return {
        ...column,
        meta: {
          ...column.meta,
          isHidden: column.meta?.isHidden === false ? false : true,
        },
      };
    }

    return column;
  });
}

/**
 * Creates a unique key for a row that doesn't expose the actual ID
 * @param prefix A prefix for the key
 * @param id The actual ID
 * @returns A string that can be used as a key without exposing the actual ID
 */
export function createRowKey(prefix: string, id: string): string {
  // Return a shortened representation that doesn't reveal the full ID
  // For UUIDs, we can use just the first part
  if (id && id.includes('-') && id.length > 8) {
    return `${prefix}-${id.split('-')[0]}`;
  }

  // For numeric IDs, we can use a hash function
  return `${prefix}-${Math.abs(hashCode(id)).toString(16)}`;
}

/**
 * Simple hash function for strings
 * @param str String to hash
 * @returns A numeric hash
 */
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}
