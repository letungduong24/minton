'use client'

import React from 'react'
import useAuthStore from '@/store/auth.store'
import AuthWrapper from '@/components/wrapper/auth.wrapper'
import { EPageTypes } from '@/type/page.enum'
import { useQueryToast } from '@/hooks/UseQueryToast'

const Home = () => {
    useQueryToast({
        param: 'success',
        type: 'success'
    })

    useQueryToast({
        param: 'error',
        type: 'error'
    })



    return (
        <AuthWrapper pageType={EPageTypes.PUBLIC}>
            <>Hello</>
        </AuthWrapper>
    )
}

export default Home