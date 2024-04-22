"use client";

import {
  LayoutDashboard,
  Menu,
  UsersRound,
  NotebookPen,
  Store,
  Phone,
  BookOpen,
} from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useNavigation } from "@/hooks/useNavigation";
import { useSession } from "@/hooks/useSession";
import { cn } from "@/lib/utils";

export function Nagivation() {
  const { userType, isPremium } = useSession();

  const { isOpen, setIsOpen, isActive, setIsActive } = useNavigation();
  const toggleOpen = () => setIsOpen(!isOpen);

  const linkStyle = (path: string) =>
    `${isOpen && "flex gap-5 items-center"} p-2 rounded-md  ${
      path === isActive
        ? "bg-brand text-brand-foreground"
        : "hover:bg-brand-hover hover:text-brand-foreground"
    }`;

  const textTransition = `origin-left transition-opacity duration-1000 opacity-0 whitespace-nowrap ${
    isOpen ? "opacity-100" : "absolute"
  } transition-all duration-1000 ease ${isOpen ? "scale-x-100" : "scale-x-0"}`;

  const links = [
    {
      path: "/kitchen",
      icon: <UsersRound />,
      text: "Cuisines",
      visibility: ["MEMBER", "ADMIN", "DEV"],
    },
    {
      path: "/menus",
      icon: <NotebookPen />,
      text: "Menus",
      visibility: ["ADMIN", "DEV"],
    },
    {
      path: "/recipes",
      icon: <BookOpen />,
      text: "Recettes",
      visibility: ["ADMIN", "DEV"],
    },
    {
      path: "/market",
      icon: <Store />,
      text: "Marché",
      visibility: ["ADMIN", "DEV"],
    },
    {
      path: "/contacts",
      icon: <Phone />,
      text: "Contacts",
      visibility: ["ADMIN", "DEV"],
    },
  ];

  return (
    <nav
      className={cn(
        "flex fixed top-0 left-0 z-20 flex-col",
        isOpen ? "min-w-[16rem]" : "min-w-[4rem]",
        "h-screen border-r-2 transition-all"
      )}
    >
      <div
        className={`flex items-center px-5 h-16 border-b-2 w-full cursor-pointer`}
        onClick={toggleOpen}
      >
        <Menu />
      </div>
      <div className="flex flex-col px-3 py-4 space-y-2">
        {links.map(({ path, icon, text, visibility }) => {
          if (!visibility.includes(userType)) return null;

          return (
            <Link
              key={path}
              className={linkStyle(path)}
              onClick={() => setIsActive(path)}
              href={path}
            >
              {icon}
              <span className={textTransition}>{text}</span>
            </Link>
          );
        })}
      </div>
      <div className="flex flex-col border-t-2 px-3 py-4 space-y-2">
        <Link
          className={linkStyle("/dashboard")}
          onClick={() => setIsActive("/dashboard")}
          href="/dashboard"
        >
          <LayoutDashboard />
          <span className={textTransition}>Portail</span>
        </Link>
      </div>
      {isOpen && !isPremium && (
        <Card className="absolute grid place-items-center mx-2 top-[calc(100vh-238px)] bg-stone-200 max-w-[16rem] h-[230px]">
          <CardHeader className="space-y-5">
            <CardTitle className="text-xl text-center">
              Bon Service Pro
            </CardTitle>
            <CardDescription className="text-primary text-[0.8rem]">
              Accédez à des options exclusives, telles que l'importation de vos
              reçus, la création de multiples cuisines et bien plus encore.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/premium">
              <Button className="font-semibold">Devenir Pro</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </nav>
  );
}
