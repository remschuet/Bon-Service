export interface FormErrorProps {
  error?: string;
  status?: string;
}

export function FormError({ error: message }: FormErrorProps) {
  return (
    <div className='flex items-center justify-center text-xs font-md bg-destructive/15 text-destructive py-2 w-full rounded-sm shadow-sm'>
      {message}
    </div>
  );
}
