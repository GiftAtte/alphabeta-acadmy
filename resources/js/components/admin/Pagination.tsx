interface PaginationProps {
  from: number;
  to: number;
  total: number;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
}

/**
 * A reusable pagination component
 */
export default function Pagination({ from, to, total, links }: PaginationProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-700">
        Showing <span className="font-medium">{from}</span> to{' '}
        <span className="font-medium">{to}</span> of{' '}
        <span className="font-medium">{total}</span> results
      </div>

      <div className="flex gap-1">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url ?? '#'}
            className={`px-3 py-1 text-sm rounded ${
              link.active
                ? 'bg-primary text-white'
                : link.url
                ? 'bg-white text-gray-500 hover:bg-gray-100'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        ))}
      </div>
    </div>
  );
}
