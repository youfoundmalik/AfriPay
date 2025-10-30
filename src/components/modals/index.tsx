import clsx from "clsx";
import { type ReactNode, useEffect } from "react";
import { RiCloseLine } from "react-icons/ri";

interface ModalBaseProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  header?: string;
  hideClose?: boolean;
}

const ModalBase: React.FC<ModalBaseProps> = ({ children, isOpen, onClose, header, hideClose }) => {
  // Handle ESC key and scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Lock body scroll
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // Restore body scroll
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm' onClick={onClose}>
      <div
        className={clsx(
          "bg-white rounded-lg max-w-lg w-[90%] mx-2.5 max-h-[90%] flex flex-col gap-5 py-6 px-4 overflow-hidden relative",
          "animate-fadeIn"
        )}
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        {header && (
          <div className={clsx("relative w-full flex items-center gap-10 pb-4 px-0 pt-0", !hideClose && "justify-between")}>
            <p className='font-semibold text-gray-900'>{header}</p>

            {!hideClose && (
              <button
                onClick={onClose}
                aria-label='close'
                className='w-9 h-9 flex cursor-pointer items-center justify-center bg-gray-100 rounded-md hover:bg-gray-200 transition'
              >
                <RiCloseLine className='w-5 h-5 text-gray-700' />
              </button>
            )}

            {/* header dividers */}
            <div className='absolute bottom-0 left-0 w-[150px] border-b-2 border-[#27af6d] rounded-l-full z-10' />
            <div className='absolute bottom-0 left-0 w-full border-b border-[#27af6d]/20 rounded-full z-0' />
          </div>
        )}

        {!header && !hideClose && (
          <button
            onClick={onClose}
            aria-label='close'
            className='absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-gray-100 rounded-md hover:bg-gray-200 transition'
          >
            <RiCloseLine className='w-5 h-5 text-gray-700' />
          </button>
        )}

        {/* Modal content */}
        <div className='flex-1 overflow-y-auto'>{children}</div>
      </div>
    </div>
  );
};

export default ModalBase;
