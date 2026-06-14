import { Calendar, Home, Lightbulb, User, Users } from "lucide-react";
export const navigationLinks = [
  {
    label: "Home",
    href: "/",
  },

  {
    label: "Partners",
    href: "/partners",
  },
  {
    label: "Entrepreneurs",
    href: "/entrepreneurs",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Events",
    href: "/events",
  },

  {
    label: "About",
    href: "/aboutus",
  },
];

export const mobileNavigationLinks = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },

  {
    label: "Partners",
    href: "/partners",
    icon: Users,
  },
  {
    label: "Entrepreneurs",
    href: "/entrepreneurs",
    icon: User,
  },
  {
    label: "Services",
    href: "/services",
    icon: Lightbulb,
  },
  {
    label: "Events",
    href: "/events",
    icon: Calendar,
  },



  {
    label: "About",
    href: "/aboutus",
    icon: User,
  },
];
