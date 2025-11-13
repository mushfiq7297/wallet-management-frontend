import App from "@/App";
import { role } from "@/constants/role";

import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSideBarItems";
import { generateRoutes } from "@/utils/generateRoutes";
import { TRole } from "@/types";
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import { agentSidebarItems } from "./agentSideBarItems";

import Features from "@/pages/Features";
import FAQ from "@/pages/FAQ";
import Pricing from "@/pages/Pricing";
import Home from "@/pages/Home";

import NotFound from "@/pages/NotFound";
import { WithAuth } from "@/utils/withAuth";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "features", element: <Features /> },
      { path: "faq", element: <FAQ /> },
      { path: "pricing", element: <Pricing /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/notFound", element: <NotFound /> },
    ],
  },

 {
  path: "/admin",
  element: <WithAuth component={DashboardLayout} role={role.admin as TRole} />,
  children: [
    { index: true, element: <Navigate to="/admin/analytics" /> },
    ...generateRoutes(adminSidebarItems),
  ],
},
{
  path: "/user",
  element: <WithAuth component={DashboardLayout} role={role.user as TRole} />,
  children: [
    { index: true, element: <Navigate to="/user/wallet" /> },
    ...generateRoutes(userSidebarItems),
  ],
},
{
  path: "/agent",
  element: <WithAuth component={DashboardLayout} role={role.agent as TRole} />,
  children: [
    { index: true, element: <Navigate to="/agent/wallet" /> },
    ...generateRoutes(agentSidebarItems),
  ],
},

]);
