import NavbarWrapper from "@/components/wrapper/navbar.wrapper"

const AllLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavbarWrapper>
        {children}
    </NavbarWrapper>
  )
}

export default AllLayout