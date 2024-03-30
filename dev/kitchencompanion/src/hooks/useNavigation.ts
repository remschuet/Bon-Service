import { NavigationState } from "@/contexts/navigation-state";
import { useContext } from "react";

export const useNavigation = () => useContext(NavigationState);
