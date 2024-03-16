export interface FormSuccessProps {
  success?: string;
  status?: string;
}

export function FormSuccess({ success: message }: FormSuccessProps) {
  return (
    <div className='flex text-center items-center justify-center text-sm font-md bg-emerald-500/15 text-emerald-500 py-2 px-5 w-full rounded-sm shadow-sm'>
      {message}
    </div>
  );
}
