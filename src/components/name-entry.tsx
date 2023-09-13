"use client";

import { useState } from "react";
import UpdateField from "./update-field";

interface Props {
  value: string;
  isLoading: boolean;
  onUpdate: (username: string, cb: () => void) => void;
}

function NameEntry({ value, isLoading, onUpdate }: Props) {
  const [isUpdating, setIsUpdating] = useState(false);

  return (
    <>
      <span onDoubleClick={() => setIsUpdating((val) => !val)}>{value}</span>
      <UpdateField isLoading={isLoading} visible={isUpdating} value={value} onUpdate={onUpdate} />
    </>
  );
}

export default NameEntry;
