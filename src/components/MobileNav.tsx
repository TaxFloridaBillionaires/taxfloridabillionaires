import { Menu } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const publicRoutes = [
  { path: "/", label: "Home" },
  { path: "/endorsements", label: "Endorsements" },
  { path: "/richest-person-in-florida", label: "Richest People in Florida" },
  { path: "/billionaires-list", label: "Florida Billionaires List" },
];

export const MobileNav = () => {
  const { pathname } = useLocation();

  // Hide navigation panel on admin route
  if (pathname === "/admin") return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <Sheet>
        <SheetTrigger
          aria-label="Open navigation menu"
          className="inline-flex items-center justify-center h-11 w-11 rounded-sm bg-crimson text-foreground shadow-lg hover:brightness-110 transition-all"
        >
          <Menu className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent side="right" className="w-3/4 sm:max-w-sm border-l border-gold/20 bg-background/95 backdrop-blur-sm">
          <SheetHeader>
            <SheetTitle className="font-display text-2xl text-foreground text-left tracking-wider">
              MENU
            </SheetTitle>
          </SheetHeader>
          <nav className="mt-8 flex flex-col gap-2">
            {publicRoutes.map((route) => {
              const isActive = pathname === route.path;
              return (
                <SheetClose asChild key={route.path}>
                  <Link
                    to={route.path}
                    className={`
                      px-4 py-3 rounded-sm font-display text-lg tracking-wide transition-colors
                      ${isActive 
                        ? "bg-gold text-primary-foreground" 
                        : "text-foreground hover:bg-muted hover:text-gold"
                      }
                    `}
                  >
                    {route.label}
                  </Link>
                </SheetClose>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};
