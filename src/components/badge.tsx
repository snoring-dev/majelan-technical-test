"use client";

import { UserType } from "@/types";

interface Props {
  label: string;
  type: UserType;
}

function Badge({ label, type }: Props) {
  const getColorForType = (): string => {
    switch (type) {
      case UserType.admin:
        return "bg-red-100 text-red-800";
      case UserType.staff:
        return "bg-yellow-100 text-yellow-800";
      case UserType.member:
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <span
      className={`${getColorForType()} text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300`}
    >
      {label}
    </span>
  );
}

export default Badge;
