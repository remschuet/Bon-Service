import { UserSession } from "@/lib/type";
import { CurrentPathProvider } from "@/app/(protected)/_components/header/current-pathname";
import { ScrollArea } from "@/components/ui/scroll-area";
import DashboardHeader from "@/app/(protected)/_components/layout-header";

export function PageLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: UserSession;
}) {
  return (
    <div className='w-full'>
      <CurrentPathProvider>
        <DashboardHeader session={session as UserSession} />
      </CurrentPathProvider>
      {children}
    </div>
  );
}
