import AuthGuard from "@/components/guard/auth.guard"
import GuestGuard from "@/components/guard/guest.guard"
import NavbarProvider from "@/components/provider/navbar.provider"
import { ReactNode } from "react"
type LayoutProps = {
    children: ReactNode
}
const VerifyLayout = ({children}: LayoutProps) => {
  return (
    <div className="text-gray-700 flex-col flex-1 flex">
      <AuthGuard>
        {children}
      </AuthGuard>
    </div>
  )
}

export default VerifyLayout