"use client"; // Mark this component as a Client Component

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Use the correct import for Next.js 13+

const HomePage: React.FC = () => {
  // Example skin types and their descriptions with emojis
  const skinTypes = [
    {
      type: 'Dry',
      description: 'Discover products that hydrate and nourish dry skin.',
      emoji: '🌵', // Emoji for dry skin
      link: '/skin-type/dry',
    },
    {
      type: 'Oily',
      description: 'Find solutions to control excess oil and achieve a matte finish.',
      emoji: '🛢️', // Emoji for oily skin
      link: '/skin-type/oily',
    },
    {
      type: 'Combination',
      description: 'Balance your skin with products designed for combination skin types.',
      emoji: '⚖️', // Emoji for combination skin
      link: '/skin-type/combination',
    },
    {
      type: 'Sensitive',
      description: 'Gentle and soothing products for sensitive skin.',
      emoji: '🌼', // Emoji for sensitive skin
      link: '/skin-type/sensitive',
    },
  ];

  // State to manage selected skin type
  const [selectedSkinType, setSelectedSkinType] = useState<string>('');
  const router = useRouter(); // Initialize the router

  // Handle skin type selection
  const handleSkinTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSkinType(event.target.value);
  };

  // Navigate to the selected skin type page
  const handleGoToSkinType = () => {
    if (selectedSkinType) {
      router.push(`/skin-type/${selectedSkinType.toLowerCase()}`); // Use router.push for navigation
    }
  };

  // Ensure the component is mounted before rendering client-specific content
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Return null during SSR to avoid hydration mismatch
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white py-12 shadow-sm">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Fix<span className="text-fuchsia-600">sk.in</span>
          </h1>
          <p className="text-lg text-gray-600">Healthy skin, happy you.</p>
        </div>
      </header>

      {/* Skin Type Selection Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Your Skin Type</h2>
          <div className="flex flex-col space-y-4">
            <select
              value={selectedSkinType}
              onChange={handleSkinTypeChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Choose your skin type
              </option>
              {skinTypes.map((skinType, index) => (
                <option key={index} value={skinType.type}>
                  {skinType.type} {skinType.emoji}
                </option>
              ))}
            </select>
            <button
              onClick={handleGoToSkinType}
              disabled={!selectedSkinType}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Find Products
            </button>
          </div>
        </div>
      </section>

      {/* Skin Type Grid Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Explore Products by Skin Type
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skinTypes.map((skinType, index) => (
            <Link key={index} href={skinType.link}>
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 text-center p-6">
                <div className="text-6xl mb-4">{skinType.emoji}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{skinType.type}</h3>
                <p className="text-gray-600">{skinType.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-white py-6 mt-12 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">&copy; 2023 GlowCare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;