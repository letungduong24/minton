import NavbarProvider from "@/components/Provider/navbar.provider"
import { ReactNode } from "react"

type LayoutProps = {
    children: ReactNode
}
const AuthLayout = ({children}: LayoutProps) => {
  return (
    <div className="text-gray-700">
      <NavbarProvider>
        {children}
      </NavbarProvider>
    </div>
  )
}

export default AuthLayout