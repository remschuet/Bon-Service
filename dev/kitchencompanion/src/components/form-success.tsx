export interface FormSuccessProps {
  success?: string;
  status?: string;
}

export function FormSuccess({ success: message }: FormSuccessProps) {
  return (
    <div className='flex items-center justify-center text-xs font-md bg-emerald-500/15 text-emerald-500 py-2 w-full rounded-sm shadow-sm'>
      {message}
    </div>
  );
}
