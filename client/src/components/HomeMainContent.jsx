import React from 'react'
import '../styles/Home.css'
import { Link } from 'react-router-dom'
import Carousel from './Carousel'
import HomeHowItWorks from './HomeHowItWorks'
import splitzrImg from '../assets/bill.png'

export default function HomeMainContent() {
  return (
    <div id="home-main-container">
        <div id="home-header-container">
            <h1 id="home-header"><img src={splitzrImg} alt="Splitzr Logo" loading="lazy" />Splitzr</h1>
            <h2 id="home-header-desc">Splitting Your Tabs Just Became Effortless With Splitzr!</h2>
            <div className='how'>
              <HomeHowItWorks />
            </div>
            
            <button id="home-split-btn"><Link to="/split-bill">Start Splitting Now</Link></button>
        </div>
        <Carousel />
        {/* <div id="home-img-container">
            <img src={tableImg} alt="People sitting at the table" />
        </div> */}
    </div>
  );
}
