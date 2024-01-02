import { useAuth } from "@/features/authentication/index"
import { Navigate, useLocation } from "react-router-dom"
import { LoadingSpinner } from "../ui/LoadingSpinner"

export function PrivatePage({ children }: { children: JSX.Element }) {
  const { user, isLoadingUser } = useAuth()
  const location = useLocation()
  console.log(user, isLoadingUser)
  if (isLoadingUser) return <LoadingSpinner className="w-24 h-24" />
  if (user == null) return <Navigate to="/login" replace state={{ location }} />
  return children
}
