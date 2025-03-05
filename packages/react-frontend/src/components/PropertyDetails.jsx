import React from 'react';
import { useParams } from 'react-router-dom';

const PropertyDetails = ({ properties }) => {
  const { id } = useParams();
  const property = properties.find(prop => prop._id === id);

  if (!property) {
    return <p>Property not found</p>;
  }

  return (
    <div>
      <h1>Property Details</h1>
      <p>Address: {property.address}</p>
      <p>Name: {property.name}</p>
      {/* Add more property details as needed */}
    </div>
  );
};

export default PropertyDetails;