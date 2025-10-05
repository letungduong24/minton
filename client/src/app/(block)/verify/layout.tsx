import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Xác minh tài khoản",
  description: "Xác minh tài khoản minton.",
}

const VerifyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex flex-col">
      {children}
    </div>
  )
}

export default VerifyLayout