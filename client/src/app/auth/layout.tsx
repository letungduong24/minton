import GuestGuard from "@/components/guard/guest.guard"
import NavbarProvider from "@/components/provider/navbar.provider"
import { ReactNode } from "react"
type LayoutProps = {
    children: ReactNode
}
const AuthLayout = ({children}: LayoutProps) => {
  return (
    <div className="text-gray-700 flex-col flex-1 flex">
      <GuestGuard>
        {children}
      </GuestGuard>
    </div>
  )
}

export default AuthLayout