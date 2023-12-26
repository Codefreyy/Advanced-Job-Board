import { createContext, ReactNode, useState } from "react"
import { User } from "../constants/types"
import {
  login as loginService,
  signup as signupService,
  logout as logoutService,
} from "../services/authentication"
import { useLocation, useNavigate } from "react-router-dom"
import LogoutDialog from "../components/LogoutDialog"

type AuthContext = {
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isLogin: boolean
  //   isLoadingUser: boolean
  user?: User
}

export const Context = createContext<AuthContext | null>(null)

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  // const [isLoadingUser, setIsLoadingUser] = useState()
  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  function login(email: string, password: string) {
    return loginService(email, password).then((user) => {
      setUser(user)
      setIsLogin(true)
      navigate(location.state?.location ?? "/")
    })
  }

  function signup(email: string, password: string) {
    return signupService(email, password).then((user) => {
      console.log("user", user)
      setUser(user)
      navigate(location.state?.location ?? "/")
      setIsLogin(true)
    })
  }

  function logout() {
    setIsLogoutModalOpen(true)
    return logoutService()
      .then(() => {
        setIsLogin(false)
        setUser(undefined)
      })
      .finally(() => setIsLogoutModalOpen(false))
  }

  //   function signup() {}

  return (
    <Context.Provider
      value={{
        login,
        logout,
        signup,
        isLogin,
        // isLoadingUser,
        user,
      }}
    >
      {children}
      <LogoutDialog
        isOpen={isLogoutModalOpen}
        onOpenChange={() => setIsLogoutModalOpen(!isLogoutModalOpen)}
      ></LogoutDialog>
    </Context.Provider>
  )
}
