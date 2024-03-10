import { IconProps } from "@/components/icons/icon-props";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function ExclamationCircleIcon({ ...props }: IconProps) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          {...props}>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z'
          />
        </svg>
      </HoverCardTrigger>
      <HoverCardContent
        align='end'
        className='absolute left-[15rem]'>
        <p className='text-sm font-semibold'>Attention</p>
        <p className='text-[0.75rem]'>
          Message d'erreur générique on va devoir gerer le contexte.
        </p>
      </HoverCardContent>
    </HoverCard>
  );
}
