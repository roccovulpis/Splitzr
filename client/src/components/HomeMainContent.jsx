import React, { lazy, Suspense, memo } from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import splitzrImg from '../assets/bill.png';
import Carousel from './Carousel';

const HomeHowItWorks = lazy(() => import('./HomeHowItWorks'));

const HomeMainContent = () => {
  return (
    <div id="home-main-container">
      <div id="home-header-container">
        <h1 id="home-header">
          <img src={splitzrImg} alt="Splitzr Logo" loading="lazy" />
          Splitzr
        </h1>
        <h2 id="home-header-desc">
          Splitting Your Tabs Just Became Effortless With Splitzr!
        </h2>

        <div className="how">
          <Suspense fallback={<div>Loading How It Works...</div>}>
            <HomeHowItWorks />
          </Suspense>
        </div>

        <Link to="/create-bill">
          <button id="home-split-btn">
            Start Splitting Now
          </button>
        </Link>

      </div>

      <MemoizedCarousel />
    </div>
  );
};

const MemoizedCarousel = memo(Carousel);

export default HomeMainContent;
