// src/routes/adminSidebarItems.ts
import { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/admin/Analytics"));
const AllUsers = lazy(() => import("@/pages/admin/AllUsers"));
const AllAgents = lazy(() => import("@/pages/admin/AllAgents"));
const AllWallets = lazy(() => import("@/pages/admin/AllWallets"));
const AllTransactions = lazy(() => import("@/pages/admin/AllTransactions"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Users",
        url: "/admin/users",
        component: AllUsers,
      },
      {
        title: "Agents",
        url: "/admin/agents",
        component: AllAgents,
      },
      {
        title: "Wallets",
        url: "/admin/wallets",
        component: AllWallets,
      },
      {
        title: "Transactions",
        url: "/admin/transactions",
        component: AllTransactions,
      },
    ],
  },
];
