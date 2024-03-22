import { useState } from "react";

export function useOpen(initialState: Boolean = false): [Boolean, () => void] {
  const [isOpen, setOpen] = useState(initialState);

  const open = () => setOpen(!isOpen);

  return [isOpen, open];
}
