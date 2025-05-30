import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X } from "lucide-react"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: React.ReactNode;
  closeOnOutsideClick?: boolean;
}

const Modal = ({ isOpen, onClose, title, size = 'md', children, closeOnOutsideClick = false }: ModalProps) => {
  // Map size to width classes
  const sizeClasses = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    full: 'sm:max-w-4xl'
  };

  // Handler for open change to only respond when explicitly closing
  const handleOpenChange = (open: boolean) => {
    // Only allow closing via the handler if closeOnOutsideClick is true
    if (!open && closeOnOutsideClick) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className={`${sizeClasses[size]} p-0 overflow-hidden`}>
        <div className="flex justify-between items-center p-4 border-b">
          {title && (
            <DialogTitle className="text-lg font-medium">
              {title}
            </DialogTitle>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
