export interface FormSuccessProps {
  success?: string;
  status?: string;
}

export function FormSuccess({ success: message }: FormSuccessProps) {
  return (
    <div className='flex text-center items-center justify-center text-sm font-md bg-lime-700 text-destructive-foreground py-2 px-5 w-full rounded-sm shadow-sm'>
      {message}
    </div>
  );
}
