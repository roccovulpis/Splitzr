import React from 'react'
import Waves from '../components/Waves'
import HomeMainContent from '../components/HomeMainContent'
import HomeFeatureHighlights from '../components/HomeFeatureHighlights'
import HomeHowItWorks from '../components/HomeHowItWorks'
import HomeTestimonials from '../components/HomeTestimonials'
import Footer from '../components/Footer'
import '../styles/Home.css'
import '../styles/index.css'

export default function Home() {
  return (
    <div>
      <Waves />
      <HomeMainContent />
      <hr />
      <div className='middle-content'>
        <HomeFeatureHighlights />
        <HomeHowItWorks />
      </div>
      <HomeTestimonials />
      <hr />
      <Footer />
    </div>
  )
}
