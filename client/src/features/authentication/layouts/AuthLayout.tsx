import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Outlet />
    </div>
  )
}

export default AuthLayout
