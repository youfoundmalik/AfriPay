import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

type ThProps = ComponentPropsWithoutRef<"th">;

export const Th: React.FC<ThProps> = ({ className, ...r }) => (
  <th className={clsx("text-[13px] uppercase text-left font-medium px-5 py-2.5 bg-gray-100 text-gray-900", className)} {...r} />
);

type TdProps = ComponentPropsWithoutRef<"td">;

export const Td: React.FC<TdProps> = ({ className, ...r }) => (
  <td className={clsx("text-sm px-5 py-3 text-left text-gray-700", className)} {...r} />
);
