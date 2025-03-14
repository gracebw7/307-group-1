import {
  Box,
  SimpleGrid,
  Center,
  VStack,
  Text
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

Reviews.propTypes = {
  //prop_id: PropTypes.string.isRequired
  reviews: PropTypes.array.isRequired
};

function Reviews(props) {
  const reviews = props.reviews;

  return (
    <Box>
      <VStack spacing={4} align="stretch" w="100%" mx="auto">
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
}

export default Reviews;
