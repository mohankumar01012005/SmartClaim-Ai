
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, Moon, Menu, X, User, FileText, LayoutDashboard, LogOut } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavbarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
  };

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="mr-2 h-4 w-4" />, path: "/dashboard" },
    { name: "Claims", icon: <FileText className="mr-2 h-4 w-4" />, path: "/claims" },
    { name: "Profile", icon: <User className="mr-2 h-4 w-4" />, path: "/profile" },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100
      } 
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="w-full h-16 border-b backdrop-blur-md bg-white/60 dark:bg-gray-950/60 fixed top-0 z-50"
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold gradient-text"
          >
            ClaimAI Vista
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {isAuthenticated && (
            <motion.div variants={navVariants} className="flex space-x-6">
              {navItems.map((item) => (
                <motion.div key={item.name} variants={itemVariants}>
                  <Link 
                    to={item.path} 
                    className="flex items-center text-gray-600 hover:text-primary transition-colors dark:text-gray-300 dark:hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          <motion.div variants={itemVariants}>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </motion.div>

          <motion.div variants={itemVariants}>
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        john.doe@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/claims" className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Claims</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button asChild variant="outline" size="sm">
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/signup">Sign up</Link>
                </Button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="mr-2 rounded-full"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="gradient-text">ClaimAI Vista</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col space-y-4">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center space-x-3 mb-6">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                      </div>
                    </div>
                    
                    {navItems.map((item) => (
                      <Link 
                        key={item.name}
                        to={item.path} 
                        className="flex items-center py-2 text-gray-600 hover:text-primary transition-colors dark:text-gray-300 dark:hover:text-primary"
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    ))}
                    
                    <Button onClick={handleLogout} variant="ghost" className="justify-start pl-0 text-red-500">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Button asChild>
                      <Link to="/login">Log in</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/signup">Sign up</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.div>
  );
}
