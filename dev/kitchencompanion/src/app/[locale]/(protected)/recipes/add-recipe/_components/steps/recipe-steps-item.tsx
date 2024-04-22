import { useState } from "react";

import { BadgeCheck, BadgeX, Settings } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useNewRecipe } from "@/hooks/useNewRecipe";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export default function RecipeStepsItem({
  direction,
  index,
}: {
  direction: string;
  index: number;
}) {
  const { ctx } = useNewRecipe();

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(direction);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedText(e.target.value);
  };

  const toggleEditing = () => {
    if (isEditing) {
      const updatedSteps = [...ctx.steps];
      updatedSteps[index].step = editedText; // Update the specific step with the new edited text
      ctx.setSteps(updatedSteps);
    }
    setIsEditing(!isEditing);
  };

  const handleRemoveDirection = () => {
    const currentSteps = [...ctx.steps];
    currentSteps.splice(index, 1);
    ctx.setSteps(currentSteps);
  };

  return (
    <div
      className={cn(
        "flex gap-2 w-full p-2 border rounded-lg  mb-2",
        !isEditing ? "bg-stone-100 hover:bg-stone-300/50" : " bg-stone-300/50"
      )}>
      <div className='flex gap-1 mr-5 my-auto'>
        <div onClick={toggleEditing}>
          {isEditing && (
            <BadgeCheck
              className='cursor-pointer text-emerald-500 hover:text-emerald-800'
              size={20}
            />
          )}
        </div>
        <div onClick={handleRemoveDirection}>
          {!isEditing && (
            <BadgeX
              className='cursor-pointer text-destructive/15 hover:text-red-700'
              size={20}
            />
          )}
        </div>
      </div>
      <Label className='flex gap-2 items-start w-full'>
        <div className='text-sm font-semibold py-1 leading-5'>{index + 1}.</div>
        {isEditing ? (
          <Textarea
            className='text-normal w-full bg-stone-100 ml-2'
            value={editedText}
            onChange={handleTextChange}
          />
        ) : (
          <span
            onClick={toggleEditing}
            className='text-normal p-1 leading-5 cursor-pointer'>
            {editedText}
          </span>
        )}
      </Label>
    </div>
  );
}
