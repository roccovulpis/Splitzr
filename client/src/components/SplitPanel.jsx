import React from "react";
import { useNavigate } from "react-router-dom";

export default function SplitPanel() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Under Construction</h1>
      <button onClick={() => navigate("/create-bill")}>Go to Bill & Action Panel</button>
    </div>
  );
}
