export interface FormSucessProps {
    success?: string;
}

export function FormSuccess({ success: message }: FormSucessProps) {
    return (
        <div className="flex items-center justify-center text-xs font-md border border-emerald-500/20 bg-emerald-500/15 text-emerald-500 py-2 w-full rounded-sm shadow-sm">
            {message}
        </div>
    );
}
