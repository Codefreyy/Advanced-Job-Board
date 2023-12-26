import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, Moon, Sun } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { useTheme } from "../hooks/useTheme"
import { Theme } from "../contexts/ThemeProvider"
import { THEME_CONSTANTS } from "@/constants/ThemeProvider"
import { useAuth } from "../features/authentication"

const Navbar = () => {
  const { logout, user } = useAuth()
  return (
    <nav className="sticky top-0 z-10 flex p-4 gap-3 justify-between items-center border-b border-slate-200 dark:bg-slate-950 bg-white ">
      <h2 className="text-lg">WDS App</h2>
      <section className="flex gap-4 items-center px-4 ">
        <ThemeToggleButton />
        <div className="hidden sm:flex">
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
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={logout}>logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <NavItem label="login" to="/login" />
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="flex sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to="/tasks" className="cursor-pointer">
                Task Board
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/jobs" className="cursor-pointer">
                Job Listing
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800"
                    >
                      <span>{user.email}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={logout}>logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/login" className="cursor-pointer">
                  Login
                </Link>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </nav>
  )
}

// function ToggleLoginButton() {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="ghost"
//           size="sm"
//           className="data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800"
//         >
//           Login
//           <span className="sr-only">Toggle Login Status</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         {/* <DropdownMenuItem>{JSON.stringify(loginInfo)}</DropdownMenuItem> */}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }

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
    <div>
      <Button asChild variant="ghost">
        <Link to={to}>{label}</Link>
      </Button>
    </div>
  )
}

export default Navbar
