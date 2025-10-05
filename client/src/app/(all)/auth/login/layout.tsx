import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Đăng nhập - minton.",
  description: "Trang đăng nhập minton.",
}

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-gray-700 flex-col flex-1 flex">
      {children}
    </div>
  )
}

export default LoginLayout