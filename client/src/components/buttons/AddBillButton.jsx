import React, { useState } from "react";

export default function AddBillButton({ onClick, isBillSubmitted, disabled }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = async () => {
    if (isBillSubmitted || isSubmitting || disabled) return;
    setIsSubmitting(true);
    try {
      const success = await onClick();
      if (success) {
        console.log("Bill successfully added.");
      }
    } catch (error) {
      console.error("Error adding bill:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={isSubmitting || isBillSubmitted || disabled}>
      <span className="button-icon">💸</span>
      <span className="button-text">
        {isSubmitting
          ? "Adding..."
          : isBillSubmitted
          ? "Already Added"
          : disabled
          ? "Log in to save bill"
          : "Add to My Bills"}
      </span>
    </button>
  );
}
