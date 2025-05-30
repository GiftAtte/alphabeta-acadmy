import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FullWidthSectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  noPadding?: boolean;
  noContainer?: boolean;
  background?: string;
}

/**
 * A component for sections that need to be full-width (edge to edge),
 * while maintaining consistent container width for inner content.
 */
const FullWidthSection = ({
  children,
  className,
  containerClassName,
  noPadding = false,
  noContainer = false,
  background,
}: FullWidthSectionProps) => {
  return (
    <section
      className={cn('w-full py-12 md:py-16', className)}
      style={background ? { background } : undefined}
    >
      {noContainer ? (
        children
      ) : (
        <div
          className={cn(
            'mx-auto w-full max-w-[1400px]',
            !noPadding && 'px-4 sm:px-6 lg:px-8',
            containerClassName
          )}
        >
          {children}
        </div>
      )}
    </section>
  );
};

export default FullWidthSection;
