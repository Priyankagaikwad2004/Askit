import React from 'react';

const Banner = ({ image, name }) => (
  <div className="relative mb-4">
    <img src={image} alt={name} className="w-full h-72 object-cover rounded-xl" />
    <h1 className="absolute bottom-4 left-4 text-3xl text-white font-bold bg-black/50 p-2 rounded">
      Let's Explore {name}
    </h1>
  </div>
);

export default Banner;
