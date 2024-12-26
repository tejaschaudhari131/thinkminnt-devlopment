import React, { useState, useEffect } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "./Maintenance.css";
import logo from "./logo.jpg";

function Maintenance() {
  const [timeLeft, setTimeLeft] = useState(() => {
    const endTime = new Date("2024-12-31T23:59:59").getTime();
    return Math.max(0, endTime - new Date().getTime());
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesOptions = {
    particles: {
      number: { value: 50 },
      size: { value: 4 },
      move: { enable: true, speed: 3 },
      color: { value: "#ffd700" },
      line_linked: { enable: false },
    },
    interactivity: {
      events: { onHover: { enable: true, mode: "repulse" } },
    },
  };

  return (
    <div className="maintenance-container">
      <Particles id="tsparticles" init={particlesInit} options={particlesOptions} />
      <div className="logo-container">
        <img src={logo} alt="Think MiNNT Logo" className="company-logo" />
      </div>
      <div className="maintenance-message">
        <h1>🔧 Site Under Maintenance 🔧</h1>
        <p>We're making something amazing. Stay tuned!</p>
        <div className="timer-container">
          <h2>⏳ Time Remaining:</h2>
          <h2>{formatTime(timeLeft)}</h2>
        </div>
      </div>
    </div>
  );
}

export default Maintenance;
