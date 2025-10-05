import AuthWrapper from '@/components/wrapper/auth.wrapper'
import { EPageTypes } from '@/type/page.enum'
import React from 'react'

const Shop = () => {
  return (
    <AuthWrapper pageType={EPageTypes.AUTHENTICATION}>
        <div>Shop</div>
    </AuthWrapper>
  )
}

export default Shop