import { createContext, ReactNode, useState } from "react"
import { User } from "../constants/types"
import {
  login as loginService,
  signup as signupService,
} from "../services/authentication"
import { useLocation, useNavigate } from "react-router-dom"

type AuthContext = {
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  //   isLoggedIn: boolean
  //   isLoadingUser: boolean
  user?: User
}

export const Context = createContext<AuthContext | null>(null)

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  //   const [isLoadingUser, setIsLoadingUser] = useState()
  //   const [isLoggin, setIsLoggin] = useState()
  const navigate = useNavigate()
  const location = useLocation()

  function login(email: string, password: string) {
    return loginService(email, password).then((user) => {
      setUser(user)
      navigate(location.state?.location ?? "/")
    })
  }

  function signup(email: string, password: string) {
    return signupService(email, password).then((user) => {
      console.log("user", user)
      setUser(user)
      navigate(location.state?.location ?? "/")
    })
  }

  function logout() {
    return Promise.resolve()
  }

  //   function signup() {}

  return (
    <Context.Provider
      value={{
        login,
        logout,
        signup,
        // isLoggedIn,
        // isLoadingUser,
        user,
      }}
    >
      {children}
    </Context.Provider>
  )
}
