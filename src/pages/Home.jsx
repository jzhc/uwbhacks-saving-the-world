// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
// import the file so the bundler knows how to process it
import heroImage from "../assets/bg-flag.jpg";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        {/* 1) Blurred background */}
        <div
          className="absolute inset-0 bg-center bg-cover overflow-hidden"
          style={{
            backgroundImage: `url(${heroImage})`,
            filter: "blur(5px)",      // ← change this px value to whatever you like
            transform: "scale(1.05)"   // optional: up-scale so edges don’t peek through
          }}
        />

        {/* 2) Dark overlay to dim the blur */}
        <div className="absolute inset-0 bg-opacity-50" />

        {/* 3) Your content on top */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 text-center">
          <p className="uppercase tracking-wide mb-2">April 26, 2025</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-2xl">
            A Way To Make An Impact
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/dashboard"
              className="px-6 py-3 border border-white hover:bg-white hover:text-black transition"
            >
              Billboard
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 border border-white hover:bg-white hover:text-black transition"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}