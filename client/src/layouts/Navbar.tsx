import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Archive, ChevronDown, Menu, Moon, Sun } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { useTheme } from "../hooks/useTheme"
import { Theme } from "../contexts/ThemeProvider"
import { THEME_CONSTANTS } from "@/constants/ThemeProvider"
import { useAuth } from "../features/authentication"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"

const Navbar = () => {
  const { logout, user, isLoadingUser } = useAuth()
  return (
    <nav className="sticky top-0 z-10 flex p-4 gap-5 justify-between items-center border-b border-slate-200 dark:bg-slate-950 bg-white ">
      <h2 className="text-lg flex items-center gap-3 px-5">
        <Archive className="w-5 h-5" />
        Job Planet
      </h2>
      <section className="flex gap-3 items-center px-4 ">
        <ThemeToggleButton />
        <div className="hidden md:flex">
          <NavItem label="Task Board" to="/tasks" />
          <NavItem label="Job Listings" to="/jobs" />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800"
                >
                  <span>{user.email}</span>
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={logout}>
                  <span className="cursor-pointer">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : isLoadingUser ? (
            <LoadingSpinner className="mt-2" />
          ) : (
            <NavItem label="Login" to="/login" />
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to="/tasks" className="cursor-pointer">
                Task Board
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/jobs/my-listings" className="cursor-pointer">
                My Listings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {user ? (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <span className="mr-auto">{user.email}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={logout}>
                      <span className="cursor-pointer">Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ) : (
              <DropdownMenuItem asChild>
                <Link to="/login" className="cursor-pointer">
                  Login
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </nav>
  )
}

function ThemeToggleButton() {
  const { setTheme } = useTheme()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800"
        >
          <Sun className=" absolute h-5 w-5 scale-100 dark:scale-0 transition-transform" />
          <Moon className="  h-5 w-5 scale-0 dark:scale-100 transition-transform" />
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {THEME_CONSTANTS.map((theme: Theme) => (
          <DropdownMenuItem
            className="capitalize"
            key={theme}
            onClick={() => setTheme(theme)}
          >
            {theme}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type NavItemProps = {
  to: string
  label: string
}

function NavItem({ to, label }: NavItemProps) {
  return (
    <Button asChild variant="ghost">
      <Link to={to}>{label}</Link>
    </Button>
  )
}

export default Navbar
