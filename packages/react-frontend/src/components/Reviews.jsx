import {
  Box,
  //SimpleGrid,
  //Center,
  VStack,
  Text
} from "@chakra-ui/react";
//import React, { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";
//import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

Reviews.propTypes = {
  //prop_id: PropTypes.string.isRequired
  reviews: PropTypes.array.isRequired
};

function Reviews(props) {
  const reviews = props.reviews;
  //const { id } = useParams();
  //const id = props.prop_id;

  /*
  const [reviews, setReviews] = useState([]);

  function fetchReviews(prop_id) {
    //const promise = fetch(`http://localhost:8000/properties/${prop_id}/reviews`);
    const promise = fetch(
      `http://localhost:8000/properties/${id}/reviews`
    );
    return promise;
  }

  function buildReviewList(id_list) {
    return Promise.all(
      id_list.map((c_id) =>
        fetch(`http://localhost:8000/reviews/${c_id}`).then(
          (res) => res.json()
        )
      )
    );
  }

  /*
  THIS WORKS!
  fetchReviews(id)
    .then((res) => res.json())
    .then((obj) => {
      console.log(obj["review_ids"]);
      let review_ids = [...obj["review_ids"]];
      buildReviewList(review_ids).then((res) => {
        console.log(res);
        setReviews(res);
      });
    });
    */

  /*
  useEffect(() => {
    fetchReviews(id)
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
  }, []);
  */

  /*
  const reviews = [
    {
      author: "John Doe",
      rating: 4,
      review: "Great place! The landlord was very responsive.",
      tags: ["Close to campus", "Pet friendly", "Free parking"]
    },
    {
      author: "Jane Smith",
      rating: 5,
      review:
        "Loved living here! The maintenance was quick to respond.",
      tags: ["Safe neighborhood", "Great amenities"]
    },
    {
      author: "Alice Brown",
      rating: 3,
      review: "Decent place, but a bit noisy at night.",
      tags: ["Good price", "Near public transport"]
    },
    {
      author: "Bob Johnson",
      rating: 2,
      review:
        "Had issues with the landlord, slow to fix things.",
      tags: ["Affordable", "Lots of space"]
    }
  ];
*/

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
