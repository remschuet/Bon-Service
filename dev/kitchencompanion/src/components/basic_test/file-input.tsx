"use client";

import { Button } from "@/components/ui/button";

export function FileInput({
  children,
  onSubmit,
  onChange,
}: {
  children: React.ReactNode;
  onSubmit: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <form action={onSubmit}>
      <input
        type='file'
        name='image'
        accept='image/*'
        onChange={onChange}
      />
      <Button type='submit'>{children}</Button>
    </form>
  );
}
