import { BadgePlus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AddDialogue({
  children,
  buttonText,
  title,
  description,
}: {
  children: React.ReactNode;
  buttonText: string;
  title: string;
  description?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='flex gap-2'>
          <BadgePlus className='w-4' />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className='min-w-[300px]'>
        <DialogHeader className=' flex flex-col gap-2 m-auto'>
          <DialogTitle className='text-2xl text-center p-3'>
            {title}
          </DialogTitle>
          {description && (
            <p className='self-center w-[80%] text-sm text-muted'>
              {description}
            </p>
          )}
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
