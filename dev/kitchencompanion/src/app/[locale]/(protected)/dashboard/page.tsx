import { WelcomeMessage } from "@/app/[locale]/(protected)/dashboard/_components/welcome-message";
import { FavouriteContacts } from "@/app/[locale]/(protected)/dashboard/_components/favourite-contacts";
import { DashboardStats } from "@/app/[locale]/(protected)/dashboard/_components/dashboard-stats";
import { WeeklyMenus } from "@/app/[locale]/(protected)/dashboard/_components/weekly-menus";
import { DashboardAlert } from "@/app/[locale]/(protected)/dashboard/_components/dashboard-alert";

export default function DashboardPage() {
  return (
    <div className='grid gap-5 sm:grid-cols-4 sm:grid-rows-6 md:grid-cols-7 md:grid-rows-10 '>
      <WelcomeMessage />
      <FavouriteContacts />
      <DashboardStats />
      <WeeklyMenus />
      <DashboardAlert />
    </div>
  );
}
