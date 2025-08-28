import React from 'react';
import Banner from './Banner';
import ImageGallery from './ImageGallery';

const PlaceDetails = ({ place }) => (
  <div className="mt-6">
    <Banner image={place.banner} name={place.name} />

    <div className="space-y-4">
      <p><strong>Location:</strong> {place.location}</p>
      <p><strong>Description:</strong> {place.description}</p>
      <p><strong>History:</strong> {place.history}</p>
      <p><strong>Architecture:</strong> {place.architecture}</p>

      <div>
        <strong>Fun Facts:</strong>
        <ul className="list-disc ml-6">
          {place.fun_facts.map((fact, index) => (
            <li key={index}>{fact}</li>
          ))}
        </ul>
      </div>

      <div>
        <strong>Visitor Tips:</strong>
        <ul className="list-disc ml-6">
          {place.visitor_tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>

      <ImageGallery images={place.images} />
    </div>
  </div>
);

export default PlaceDetails;
