import React, { useState, useEffect, useCallback } from "react";
import { Box, VStack, Divider, Text } from "@chakra-ui/react";
import PropertySummary from "../components/PropertySummary";
import ReviewCard from "../components/ReviewCard";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
PropertyPage.propTypes = {
  propertyId: PropTypes.string.isRequired
};

const PropertyPage = ({ propertyId }) => {
  const params = useParams();
  propertyId = propertyId || params.propertyId;

  console.log("Final Property ID:", propertyId);
  const constantPropertyId = propertyId;
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);

  console.log("Constant Property ID:", constantPropertyId);

  // Fetch property details
  useEffect(() => {
    if (!propertyId) return;
    fetch(
      `http://localhost:8000/properties/${constantPropertyId}`
    )
      .then((res) => res.json())
      .then(setProperty)
      .catch((err) =>
        console.error("Error fetching property:", err)
      );
  }, [propertyId, constantPropertyId]);

  // Define fetchReviews using useCallback
  const fetchReviews = useCallback(() => {
    if (!propertyId) return;
    fetch(
      `http://localhost:8000/properties/${constantPropertyId}/reviews`
    )
      .then((res) => res.json())
      .then((reviewIds) => {
        // Fetch each review by ID
        Promise.all(
          reviewIds.map((id) =>
            fetch(`http://localhost:8000/reviews/${id}`).then(
              (res) => res.json()
            )
          )
        )
          .then(setReviews)
          .catch((err) =>
            console.error("Error fetching reviews:", err)
          );
      })
      .catch((err) =>
        console.error("Error fetching review IDs:", err)
      );
  }, [constantPropertyId, propertyId]);

  // Fetch reviews for the property
  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]); // Include fetchReviews in the dependency array

  if (!propertyId)
    return <Text>Error: Property ID is missing</Text>;

  if (!property) return <Text>Loading...</Text>;

  return (
    <Box p={6} maxW="800px" mx="auto">
      {/* Property Summary Component */}
      <PropertySummary
        name={property.name}
        address={property.address}
        averageRating={property.averageRating}
        tags={property.tags}
      />

      <Divider my={6} />

      {/* Reviews Section */}
      <VStack spacing={4} align="stretch">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))
        ) : (
          <Text>No reviews yet.</Text>
        )}
      </VStack>
    </Box>
  );
};

export default PropertyPage;
