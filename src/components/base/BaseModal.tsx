import { X } from "lucide-react";
import { ReactNode } from "react";

export const BaseModal = ({
  title,
  isOpen,
  onClose,
  children,
}: {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  download?: string;
  isDownloadOption: boolean;
  fileName?: string;
  children: ReactNode;
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg max-w-[90vw] max-h-[90vh] overflow-hidden flex flex-col p-4">
        <div className="flex justify-between items-center pb-4">
          <div className="flex space-x-4 items-center">
            <h2 className="text-lg font-bold">{title}</h2>
          </div>
          <X className="h-6 w-6 ml-1 cursor-pointer" onClick={onClose} />
        </div>
        <div className="flex-grow overflow-auto">{children}</div>
      </div>
    </div>
  );
};
