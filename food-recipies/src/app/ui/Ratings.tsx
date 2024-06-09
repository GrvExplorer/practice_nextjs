// src/components/Rating.js
import React from 'react';

const Rating = ({ rating }: { rating: number}) => {
  // Create an array of 5 items to represent the 5 stars
  const stars = Array(5).fill(0);

  return (
    <div className="flex mt-4">
      {stars.map((_, index) => (
        <svg
          key={index}
          className={`w-6 h-6 ${
            index < rating ? 'text-yellow-500' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.284 3.95a1 1 0 00.95.69h4.18c.97 0 1.371 1.24.588 1.81l-3.39 2.461a1 1 0 00-.364 1.118l1.285 3.95c.3.921-.755 1.688-1.538 1.118l-3.39-2.461a1 1 0 00-1.175 0l-3.39 2.461c-.782.57-1.838-.197-1.538-1.118l1.285-3.95a1 1 0 00-.364-1.118L2.23 9.377c-.783-.57-.382-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.284-3.95z" />
        </svg>
      ))}
    </div>
  );
};

export default Rating;
