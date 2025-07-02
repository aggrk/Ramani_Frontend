// config/userActions.js
import {
  UserCircle,
  HardHat,
  Truck,
  Calendar,
  Settings,
  Bell,
  Search,
  FileText,
  Building,
  SettingsIcon,
  ShoppingBag,
} from "lucide-react";

export const userActions = [
  {
    title: "My Profile",
    icon: UserCircle, // Store the component reference, not JSX
    link: "profile",
    color: "text-primary",
  },
  {
    title: "Find a Job",
    icon: Building,
    link: "sites",
    color: "text-secondary",
  },
  {
    title: "Shop",
    icon: HardHat,
    link: "hardware",
    color: "text-accent",
  },
  {
    title: "My Applications",
    icon: FileText,
    link: "applications",
    color: "text-primary",
  },
];

export const engineerActions = [
  {
    title: "My Profile",
    icon: UserCircle, // Store the component reference, not JSX
    link: "profile",
    color: "text-primary",
  },
  {
    title: "My Sites",
    icon: Building,
    link: "sites",
    color: "text-secondary",
  },
  {
    title: "Shop",
    icon: HardHat,
    link: "hardware",
    color: "text-accent",
  },
  {
    title: "Applications",
    icon: FileText,
    link: "applications",
    color: "text-primary",
  },
  {
    title: "Settings",
    icon: SettingsIcon,
    link: "applications",
    color: "text-primary",
  },
];

export const hardwareActions = [
  {
    title: "My Profile",
    icon: UserCircle, // Store the component reference, not JSX
    link: "profile",
    color: "text-primary",
  },
  {
    title: "My Hardware",
    icon: HardHat,
    link: "sites",
    color: "text-secondary",
  },
  {
    title: "Products Ordered",
    icon: ShoppingBag,
    link: "hardware",
    color: "text-accent",
  },
  {
    title: "Settings",
    icon: SettingsIcon,
    link: "applications",
    color: "text-primary",
  },
];
