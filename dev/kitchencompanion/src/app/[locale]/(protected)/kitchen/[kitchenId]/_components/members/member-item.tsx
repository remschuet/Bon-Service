import { Label } from "@/components/ui/label";

export function MemberItem() {
  return (
    <div className="flex gap-2 w-full p-2 border rounded-lg mb-2 bg-stone-100 hover:bg-stone-300/50 items-center">
      <Label className="flex gap-2 items-start w-full">
        <div className="text-sm font-semibold py-1 leading-5"></div>
        <span className="text-normal p-1 leading-5 "></span>
      </Label>
    </div>
  );
}
