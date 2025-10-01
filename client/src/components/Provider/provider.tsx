import React, { ReactNode } from 'react'

type ProviderProps = {
  children: ReactNode
}

const Provider = ({ children }: ProviderProps) => {
  return (
    <>
      {children}
    </>
  )
}

export default Provider
