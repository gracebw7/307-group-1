import { useEffect, useState, useRef } from "react";
import {
  ChakraProvider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  useDisclosure
} from "@chakra-ui/react";
import { Box, VStack, Divider, Text } from "@chakra-ui/react";
import PropertySummary from "../components/PropertySummary";
import ReviewCard from "../components/ReviewCard";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Reviews from "../components/Reviews.jsx";

PropertyPage.propTypes = {
  propertyId: PropTypes.string.isRequired
};

export default function PropertyPage({ propertyId }) {
  const params = useParams();
  propertyId = propertyId || params.propertyId; // Use route param if prop is missing

  console.log("Final Property ID:", propertyId);
  const constantPropertyId = useRef(propertyId).current; // Store propertyId as a constant
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);

  // Debugging log
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
  }, [propertyId, constantPropertyId]); // Dependency on constantPropertyId (which never changes)

  // Fetch reviews for the property
  useEffect(() => {
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
  }, [constantPropertyId, propertyId]); // Dependency on constantPropertyId

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
        id={propertyId}
      />

      <Divider my={6} />

      <Reviews prop_id={propertyId} />

      {/* Reviews Section
      <VStack spacing={4} align="stretch">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))
        ) : (
          <Text>No reviews yet.</Text>
        )}
      </VStack>
      */}
    </Box>
  );
}
