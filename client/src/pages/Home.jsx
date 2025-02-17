import React from 'react'
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
      <HomeMainContent />
      <hr />
      <div className='middle-content'>
        <HomeFeatureHighlights />
      </div>
      <HomeTestimonials />
      <hr />
      <Footer />
    </div>
  )
}
