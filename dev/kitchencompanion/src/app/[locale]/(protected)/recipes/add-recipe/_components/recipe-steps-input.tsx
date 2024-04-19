import { Mic } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import RecipeStepsList from "@/app/[locale]/(protected)/recipes/add-recipe/_components/steps/recipe-steps-list";

import { useNewRecipe } from "@/hooks/useNewRecipe";
import { useRef } from "react";
import { Steps } from "@/contexts/new-recipe";

export function RecipeStepsInput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { ctx } = useNewRecipe();

  const handleAddStep = () => {
    if (textareaRef.current?.value) {
      const newStep: Steps = {
        step: textareaRef.current.value,
        id: crypto.randomUUID(),
      };
      ctx.setSteps([...ctx.steps, newStep]);
      textareaRef.current.value = "";
    }
  };

  return (
    <div className='relative flex min-h-[50vh] flex-col rounded-xl bg-stone-200 p-4 lg:col-span-2 max-w-[45vw]'>
      <Badge
        variant={"secondary"}
        className='absolute right-3 top-3'>
        Étapes
      </Badge>
      <div className='flex-1 mt-8'>
        <RecipeStepsList />
      </div>
      <div
        className='relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring'
        x-chunk='dashboard-03-chunk-1'>
        <Label
          htmlFor='message'
          className='sr-only'>
          Message
        </Label>
        <Textarea
          ref={textareaRef}
          placeholder='Entrez votre étape ici...'
          className='min-h-12 resize-none border-0 p-6 shadow-none focus-visible:ring-0'
        />
        <div className='flex items-center p-3 pt-0'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'>
                  <Mic className='size-4' />
                  <span className='sr-only'>Utiliser le microphone</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side='top'>Utiliser le microphone</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button
            size='sm'
            className='ml-auto gap-1.5'
            onClick={handleAddStep}>
            Ajouter
          </Button>
        </div>
      </div>
    </div>
  );
}
