import clsx from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

interface IProps extends ComponentPropsWithoutRef<"select"> {
  startIcon?: ReactNode;
  containerClass?: string;
}

const Select: React.FC<IProps> = ({ startIcon, containerClass, children, className, ...r }) => {
  return (
    <div
      className={clsx(
        "border w-full box-border rounded-lg border-gray-100 h-10 flex items-center overflow-clip pr-1 pl-2 focus-within:border-gray-200",
        containerClass
      )}
    >
      {startIcon}
      <select className={clsx("flex-1 h-full outline-0 ring-0 text-sm cursor-pointer", className)} {...r}>
        {children}
      </select>
    </div>
  );
};

export default Select;
