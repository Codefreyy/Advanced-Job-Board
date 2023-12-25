import { m } from "framer-motion"
import { createContext, ReactNode } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"

type LoginInfo = {
  name: string
  email: string
  password: string
  isLogin: boolean
}

type LoginContext = {
  loginInfo: LoginInfo
  setLoginInfo: (isLogin: boolean, email: string) => void
}

export const Context = createContext<LoginContext | null>(null)
type LoginProviderProps = {
  children: ReactNode
}

export function LoginStatusProvider({ children }: LoginProviderProps) {
  const [loginInfo, setLoginInfo] = useLocalStorage<LoginInfo>("USER", {
    name: "hah",
    email: "faaf@gamil.com",
    password: "fadadadaas",
    isLogin: false,
  })

  function toggleLogin(isLogin: boolean, email: string) {}

  return (
    <Context.Provider
      value={{
        loginInfo,
        setLoginInfo: toggleLogin,
      }}
    >
      {children}
    </Context.Provider>
  )
}
