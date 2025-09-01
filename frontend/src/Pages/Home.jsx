import React from 'react'
import Hero from '../Components/Home/Hero'
import Shop from '../Components/Home/Shop'
import Court from '../Components/Home/Court'
import Match from '../Components/Home/Match'

const Home = () => {
  return (
    <div className=''>
        <Hero />
        <Shop />
        <Court />
        <Match />
    </div>
  )
}

export default Home