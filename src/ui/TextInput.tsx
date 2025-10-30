import clsx from "clsx";
import type { ReactNode, ComponentPropsWithoutRef } from "react";

interface IProps extends ComponentPropsWithoutRef<"input"> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  containerClass?: string;
}

const TextInput: React.FC<IProps> = ({ endIcon, startIcon, containerClass, className, ...r }) => {
  return (
    <div
      className={clsx(
        "border w-full box-border rounded-lg border-gray-100 h-10 flex items-center overflow-clip pr-1 pl-2 focus-within:border-gray-200",
        containerClass
      )}
    >
      {startIcon}
      <input className={clsx("flex-1 h-full min-w-auto w-full outline-0 ring-0 text-sm", className)} {...r} />
      {endIcon}
    </div>
  );
};

export default TextInput;
