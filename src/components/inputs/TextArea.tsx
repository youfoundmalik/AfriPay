import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

interface IProps extends ComponentPropsWithoutRef<"textarea"> {
  containerClass?: string;
}

const TextArea: React.FC<IProps> = ({ containerClass, className, ...r }) => {
  return (
    <div
      className={clsx(
        "border w-full rounded-lg border-gray-100 min-h-24 overflow-clip focus-within:border-gray-200",
        containerClass
      )}
    >
      <textarea className={clsx("flex-1 h-full w-full outline-0 ring-0 text-sm p-2", className)} {...r} />
    </div>
  );
};

export default TextArea;
