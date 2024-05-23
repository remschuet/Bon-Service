import { MemberItem } from "./member-item";

export function MemberList({ members }: { members: string[][] }) {
  return (
    <>
      {members.map((member) => {
        return <MemberItem key={crypto.randomUUID()} member={member} />;
      })}
    </>
  );
}
