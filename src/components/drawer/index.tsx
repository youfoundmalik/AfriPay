"use client";

import clsx from "clsx";
import { useEffect, useState, type ComponentPropsWithoutRef } from "react";
import { RiCloseLine } from "react-icons/ri";

interface DrawerBaseProps extends ComponentPropsWithoutRef<"div"> {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: "left" | "right";
  width?: string;
  hideClose?: boolean;
  disableOverlayClick?: boolean;
}

const ANIMATION_DURATION = 300; // ms, keep in sync with index.css

const DrawerBase: React.FC<DrawerBaseProps> = ({
  isOpen,
  onClose,
  children,
  position = "right",
  width = "400px",
  hideClose = false,
  className,
  disableOverlayClick = false,
  ...r
}) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [animateIn, setAnimateIn] = useState(false);

  // control mount + slide animations
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => setAnimateIn(true));
    } else if (shouldRender) {
      setAnimateIn(false);
      // Wait for out-animation, only then unmount
      const timer = setTimeout(() => setShouldRender(false), ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  // We now use custom animation classes from index.css, not Tailwind utilities. This is more robust and can't be purged by accident.
  const animationClass =
    position === "right"
      ? animateIn
        ? "animate-slideInRight"
        : "animate-slideOutRight"
      : animateIn
      ? "animate-slideInLeft"
      : "animate-slideOutLeft";

  return (
    <div className='fixed inset-0 z-50 flex bg-black/40 backdrop-blur-sm' onClick={disableOverlayClick ? undefined : onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width }}
        className={clsx("bg-white h-full shadow-xl relative flex flex-col", animationClass, position === "right" ? "ml-auto" : "mr-auto", className)}
        {...r}
      >
        {!hideClose && (
          <button
            onClick={onClose}
            aria-label='close'
            className='absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-gray-100 rounded-md hover:bg-gray-200 transition'
          >
            <RiCloseLine className='w-5 h-5 text-gray-700' />
          </button>
        )}
        <div className={clsx("p-6 overflow-y-auto h-full", className)} {...r}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DrawerBase;
