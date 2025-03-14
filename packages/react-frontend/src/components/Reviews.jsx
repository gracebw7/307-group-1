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
      {/*<Box
        p={8}
        bg="gray.100"
        maxW="80vw"
        display="flex"
        justifyContent="center"
        alignItems="center"
        overflowX="auto"
        w="100%"> */}
      <VStack spacing={4} align="stretch" w="100%" mx="auto">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))
        ) : (
          <Text>No reviews yet.</Text>
        )}
      </VStack>
      {/*
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={150}
          maxW="80%"
          w="100%">
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </SimpleGrid>
        */}
      {/*</Box> */}
    </Box>
  );
}

export default Reviews;
