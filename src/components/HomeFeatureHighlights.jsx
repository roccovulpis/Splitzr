import React from 'react'
import '../styles/HomeFeatureHighlights.css'

export default function HomeFeatureHighlights() {
  return (
    <div id="features-container">
        <h2>Why Use Splitzr?</h2>
        <div className="feature">
          <h3>📊 Easy Bill Splitting</h3>
          <p>Enter your bill details, and we’ll split it fairly for you.</p>
        </div>
        <div className="feature">
          <h3>💳 Multiple Payment Options</h3>
          <p>Venmo, PayPal, and direct cash calculations supported.</p>
        </div>
        <div className="feature">
          <h3>📱 Mobile-Friendly</h3>
          <p>Use Splitzr on any device, anywhere.</p>
        </div>
      </div>
  );
}
