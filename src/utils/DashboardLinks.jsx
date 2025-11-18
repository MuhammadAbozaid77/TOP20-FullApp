import {
  LayoutDashboard,
  ListCollapse,
  Shirt,
  ShoppingBag,
} from "lucide-react";

const strokeWidth = 2;
const size = 20;
const fill = "false";

export const GeneralLinks = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard size={size} strokeWidth={strokeWidth} />,
    url: "/admin/dashboard",
    id: 1,
  },
  {
    title: "Orders",
    icon: <ShoppingBag size={size} strokeWidth={strokeWidth} />,
    url: "/admin/orders",
    id: 2,
  },
  {
    title: "Categories",
    icon: <ListCollapse size={size} strokeWidth={strokeWidth} />,
    url: "/admin/categories",
    id: 3,
  },
];
