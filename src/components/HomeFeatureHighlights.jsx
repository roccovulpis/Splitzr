import React from "react";
import "../styles/HomeFeatureHighlights.css";

export default function HomeFeatureHighlights() {
  return (
    <div id="features-container">
      <h2>Why Use Splitzr?</h2>
      <p className="feature-intro">
        Tired of doing math every time you split a bill? Let <strong>Splitzr</strong> handle the hard work. Whether you're out with friends, traveling, or splitting rent, we've got you covered! 🚀
      </p>
      <div className="features-grid">
        <div className="feature">
          <h3>📊 Easy Bill Splitting</h3>
          <p>Enter your bill details, and we’ll calculate each person's share instantly. No more awkward number crunching!</p>
        </div>
        <div className="feature">
          <h3>💳 Multiple Payment Options</h3>
          <p>Venmo, PayPal, and direct cash calculations—all in one place. Send and settle payments seamlessly.</p>
        </div>
        <div className="feature">
          <h3>📱 Mobile-Friendly</h3>
          <p>Access Splitzr anytime, anywhere. Whether on your phone, tablet, or desktop, we ensure a smooth experience.</p>
        </div>
      </div>
    </div>
  );
}
