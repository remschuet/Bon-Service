import { Label } from "@/components/ui/label";

declare global {
  interface String {
    titleCase(): string;
  }
}

String.prototype.titleCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export function MemberItem({ member }: { member: string[] }) {
  return (
    <div className="flex gap-2 w-full p-2 border rounded-lg mb-2 bg-stone-100 hover:bg-stone-300/50 items-center">
      <Label className="flex gap-4 w-full">
        <div className="text-sm font-semibold ml-8 p-1 leading-5 w-[30%]">
          {member[0]}
        </div>
        <div className="text-normal p-1 leading-5 w-[25%]">{member[1]}</div>
        <div className="text-normal p-1 leading-5 w-[25%]">{member[2]}</div>
        <div className="text-sm font-semibold py-1 leading-5 w-[20%]">
          {member[3].replace("_", " ").titleCase()}
        </div>
      </Label>
    </div>
  );
}
