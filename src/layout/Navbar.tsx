import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { authApi, useGetMeQuery, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { Link } from "react-router";
import Logo from "../assets/icons/Logo";
import { role } from "@/constants/role";

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/features", label: "Features", role: "PUBLIC" },
  { href: "/faq", label: "FAQs", role: "PUBLIC" },
  { href: "/pricing", label: "Pricing", role: "PUBLIC" },

  { href: "/admin", label: "Dashboard", role: role.admin },
  { href: "/agent", label: "Dashboard", role: role.agent },
  { href: "/user", label: "Dashboard", role: role.user },
];

export default function Navbar() {
  const { data, isLoading } = useGetMeQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  if (isLoading) return null;

  const userRole = data?.data?.role; 

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };

 
  const visibleLinks = navigationLinks.filter((link) => {
    if (link.role === "PUBLIC") return true;
    if (!userRole) return false; 
    return link.role === userRole;
  });

  return (
  <header className="border-b bg-background px-4 md:px-6">
    <div className="flex h-16 items-center justify-between gap-4">

     
      <Link
        to="/"
        className="flex items-center gap-2 font-bold text-xl text-primary"
      >
        <Logo />
      </Link>
      <h1 className="font-bold text-2xl sm:text-xl md:text-2xl lg:text-3xl tracking-tight">
  Pay <span className="text-primary">Flow</span>
</h1>


      <NavigationMenu className="hidden md:flex mx-auto">
        <NavigationMenuList className="flex gap-4">
          {visibleLinks
            .filter((l) => l.label !== "Dashboard") 
            .map((link, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  className="py-1.5 font-medium text-muted-foreground hover:text-primary"
                  asChild
                >
                  <Link to={link.href}>{link.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
        </NavigationMenuList>
      </NavigationMenu>

      
      <div className="flex items-center gap-2">
        
        {data?.data?.email && (
          <Button
            asChild
            variant="default" 
            className="text-sm"
          >
            <Link
              to={
                userRole === role.admin
                  ? "/admin"
                  : userRole === role.agent
                  ? "/agent"
                  : "/user"
              }
            >
              Dashboard
            </Link>
          </Button>
        )}

        <ModeToggle />

        
        {data?.data?.email ? (
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-sm"
          >
            Logout
          </Button>
        ) : (
          <Button asChild className="text-sm">
            <Link to="/login">Login</Link>
          </Button>
        )}
      </div>
    </div>

    <Popover>
      <PopoverTrigger asChild>
        <Button className="group size-8 md:hidden" variant="ghost" size="icon">
          <svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-36 p-1 md:hidden">
        <NavigationMenu className="max-w-none *:w-full">
          <NavigationMenuList className="gap-2">
            {visibleLinks.map((link, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  asChild
                  className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                >
                  <Link to={link.href}>{link.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </PopoverContent>
    </Popover>
  </header>
);

}
