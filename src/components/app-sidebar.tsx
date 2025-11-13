import * as React from "react";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import Logo from "@/assets/icons/Logo";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useGetMeQuery(undefined);
 

  
  const sidebarSections = getSidebarItems(userData?.data?.role) || [];

 
  const navItems = sidebarSections.flatMap((section) => section.items || []);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link
                to="/"
                className="flex items-center gap-2 font-bold text-xl text-primary"
              >
                <Logo />
                <h1 className="font-bold text-xl text-foreground">
        Pay <span className="text-primary">Flow</span>
             </h1>
              </Link>
              
            </SidebarMenuButton>
            
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
      
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
