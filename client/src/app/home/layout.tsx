import AuthGuard from "@/components/guard/auth.guard"
import NavbarProvider from "@/components/provider/navbar.provider"
import { ReactNode } from "react"

type LayoutProps = {
    children: ReactNode
}
const HomeLayout = ({children}: LayoutProps) => {
  return (
    <div className="text-gray-700">
        <AuthGuard>
          {children}
        </AuthGuard>
    </div>
  )
}

export default HomeLayout