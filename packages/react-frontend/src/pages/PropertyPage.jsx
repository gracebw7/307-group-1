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
  useDisclosure,
  Center
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

const API_PREFIX = "https://prophuntapi.azurewebsites.net";

export default function PropertyPage({ propertyId }) {
  const params = useParams();
  propertyId = propertyId || params.propertyId;

  console.log("Final Property ID:", propertyId);
  const constantPropertyId = useRef(propertyId).current;
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);

  function fetchReviews(prop_id) {
    return fetch(`${API_PREFIX}/properties/${prop_id}/reviews`);
  }

  function buildReviewList(id_list) {
    return Promise.all(
      id_list.map((c_id) =>
        fetch(`${API_PREFIX}/reviews/${c_id}`).then((res) =>
          res.json()
        )
      )
    );
  }

  console.log("Constant Property ID:", constantPropertyId);

  useEffect(() => {
    if (!constantPropertyId) return;
    fetch(`${API_PREFIX}/properties/${constantPropertyId}`)
      .then((res) => res.json())
      .then(setProperty)
      .catch((err) =>
        console.error("Error fetching property:", err)
      );
  }, [constantPropertyId]);

  useEffect(() => {
    fetchReviews(constantPropertyId)
      .then((res) => res.json())
      .then((obj) => {
        console.log(obj["review_ids"]);
        let review_ids = [...obj["review_ids"]];
        buildReviewList(review_ids).then((res) => {
          console.log(res);
          setReviews(res);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [constantPropertyId]);

  function updateProperty() {
    if (!constantPropertyId) return;
    fetch(`${API_PREFIX}/properties/${constantPropertyId}`)
      .then((res) => res.json())
      .then((prop) => {
        setProperty(prop);
        console.log("Updated Property:", prop);
      })
      .catch((err) =>
        console.error("Error fetching property:", err)
      );
  }

  function addNewReviewState(new_review) {
    setReviews((prevReviews) => [...prevReviews, new_review]);
    updateProperty(); // Ensure property summary updates after a new review
  }

  // Refresh property summary whenever reviews change
  useEffect(() => {
    updateProperty();
  }, [reviews]);

  if (!propertyId)
    return <Text>Error: Property ID is missing</Text>;

  if (!property) return <Text>Loading...</Text>;

  return (
    <Center>
      <Box w="80vh" maxW="800px" mx="auto">
        {/* Property Summary Component */}
        <Center>
          <PropertySummary
            name={property.name}
            address={property.address}
            averageRating={property.averageRating}
            tags={property.tags}
            id={propertyId}
            setNewReview={addNewReviewState}
            updateProperty={updateProperty}
          />
        </Center>

        <Divider my={6} />

        <Center>
          <Box maxWidth="80vw" mx="auto" w="80%">
            <Reviews reviews={reviews} />
          </Box>
        </Center>
      </Box>
    </Center>
  );
}
