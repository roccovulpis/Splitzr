import React, { lazy, Suspense } from 'react';

const HomeMainContent = lazy(() => import('../components/HomeMainContent'));
const HomeFeatureHighlights = lazy(() => import('../components/HomeFeatureHighlights'));
const HomeHowItWorks = lazy(() => import('../components/HomeHowItWorks'));
const HomeTestimonials = lazy(() => import('../components/HomeTestimonials'));
const Footer = lazy(() => import('../components/Footer'));

export default function Home() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <HomeMainContent />
        <hr />
        <div className="middle-content">
          <HomeFeatureHighlights />
        </div>
        <HomeTestimonials />
        <hr />
        <Footer />
      </Suspense>
    </div>
  );
}
