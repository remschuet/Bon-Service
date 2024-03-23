import { NavigationState } from "@/app/_contexts/navigation-state";
import { useContext } from "react";

export const useNavigation = () => useContext(NavigationState);
