import React, { lazy, Suspense } from 'react';

const HomeMainContent = lazy(() => import('../components/HomeMainContent'));
const HomeFeatureHighlights = lazy(() => import('../components/HomeFeatureHighlights'));
const HomeHowItWorks = lazy(() => import('../components/HomeHowItWorks'));
const HomeTestimonials = lazy(() => import('../components/HomeTestimonials'));
const Footer = lazy(() => import('../components/Footer'));

export default function Home() {
  return (
    <div>
      <Suspense fallback={<div>Loading Main Content...</div>}>
        <HomeMainContent />
      </Suspense>

      <hr />

      <div className="middle-content">
        <Suspense fallback={<div>Loading Features...</div>}>
          <HomeFeatureHighlights />
        </Suspense>
      </div>

      <Suspense fallback={<div>Loading Testimonials...</div>}>
        <HomeTestimonials />
      </Suspense>

      <hr />

      <Suspense fallback={<div>Loading Footer...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
}
