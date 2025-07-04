import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import {
  Moon,
  Sun,
  Code2,
  Menu,
  X,
  Sparkles,
  Bell,
  BellRing,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Resources", href: "/resources" },
    { name: "Gallery", href: "/gallery" },
    { name: "Profile", href: "/profile" },
    { name: "Admin", href: "/admin" },
  ];

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "New Event: React Workshop",
      message:
        "Registration is now open for the React Advanced Patterns workshop",
      time: "2 hours ago",
      unread: true,
      type: "event",
    },
    {
      id: 2,
      title: "Hackathon Reminder",
      message: "Don't forget to register for the Annual Hackathon 2024",
      time: "1 day ago",
      unread: true,
      type: "reminder",
    },
    {
      id: 3,
      title: "Profile Updated",
      message: "Your profile information has been successfully updated",
      time: "2 days ago",
      unread: false,
      type: "system",
    },
    {
      id: 4,
      title: "New Resource Added",
      message: "Python Data Science Toolkit has been added to resources",
      time: "3 days ago",
      unread: false,
      type: "resource",
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Code2 className="h-7 w-7 text-primary group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-primary bg-clip-text text-transparent">
              HackOrbit
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group",
                  location.pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5",
                )}
              >
                {item.name}
                {location.pathname === item.href && (
                  <div className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
                )}
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
            {/* Enhanced Theme toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full hover:bg-primary/10 hover:scale-110 transition-all duration-300 group"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-yellow-500 group-hover:text-yellow-400" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-blue-400 group-hover:text-blue-300" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Notifications - shown when logged in */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative w-10 h-10 rounded-full hover:bg-primary/10 hover:scale-110 transition-all duration-300 group"
                >
                  {unreadCount > 0 ? (
                    <BellRing className="h-5 w-5 text-primary group-hover:animate-pulse" />
                  ) : (
                    <Bell className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                  )}
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-80 max-h-96 overflow-y-auto"
              >
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {unreadCount} new
                    </Badge>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={`flex flex-col items-start p-4 cursor-pointer ${
                      notification.unread ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between w-full">
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-medium ${notification.unread ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {notification.time}
                        </p>
                      </div>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full ml-2 mt-1 flex-shrink-0" />
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-center py-3">
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Notifications
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Enhanced Auth buttons - hidden on mobile */}
            <div className="hidden md:flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                asChild
              >
                <Link to="/join">
                  <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Join Club
                </Link>
              </Button>
            </div>

            {/* Enhanced Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden w-10 h-10 rounded-full hover:bg-primary/10 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 rotate-90" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "block px-4 py-3 text-base font-medium rounded-lg transition-all duration-300",
                    location.pathname === item.href
                      ? "text-primary bg-primary/10 border-l-4 border-primary"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Notifications */}
              <div className="px-4 pt-4 border-t">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-foreground">
                    Notifications
                  </span>
                  {unreadCount > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {unreadCount} new
                    </Badge>
                  )}
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {notifications.slice(0, 2).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-2 rounded-lg text-xs ${
                        notification.unread ? "bg-primary/10" : "bg-muted/50"
                      }`}
                    >
                      <p className="font-medium text-foreground">
                        {notification.title}
                      </p>
                      <p className="text-muted-foreground mt-1">
                        {notification.time}
                      </p>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="w-full text-xs">
                    View All
                  </Button>
                </div>
              </div>

              <div className="flex space-x-3 pt-4 px-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 hover:bg-primary/10"
                  asChild
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary shadow-lg"
                  asChild
                >
                  <Link to="/join">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Join Club
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
