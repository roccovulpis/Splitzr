import React from 'react'
import tableImg from '../assets/people-at-table.jpg'
import '../styles/Home.css'
import { Link } from 'react-router-dom'
import Carousel from './Carousel'

export default function HomeMainContent() {
  return (
    <div id="home-main-container">
        <div id="home-header-container">
            <h1 id="home-header">Splitzr</h1>
            <h2 id="home-header-desc">Splitting Your Tabs Just Became Effortless With Splitzr!</h2>
            <button id="home-split-btn"><Link to="/split-bill">Start Splitting Now</Link></button>
        </div>
        <Carousel />
        {/* <div id="home-img-container">
            <img src={tableImg} alt="People sitting at the table" />
        </div> */}
    </div>
  );
}
