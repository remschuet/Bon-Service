export interface FormErrorProps {
  error?: string;
  status?: string;
}

export function FormError({ error: message }: FormErrorProps) {
  return (
    <div className='flex text-center items-center justify-center text-sm font-md bg-destructive text-destructive-foreground py-2 px-5 w-full rounded-sm shadow-sm'>
      {message}
    </div>
  );
}
