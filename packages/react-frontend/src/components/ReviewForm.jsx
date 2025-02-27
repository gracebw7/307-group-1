import React, { useState } from "react";
import {
  Box,
  Text,
  Badge,
  HStack,
  Avatar,
  Input,
  Button
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import ReviewCard from "./ReviewCard";
import { useParams } from "react-router-dom";

const ReviewForm = () => {
  const { id } = useParams();
  console.log(id);

  const [rating, setRating] = useState(0);
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState([]);
  const [reviews, setReviews] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      author,
      rating,
      body,
      tags
    };

    newReview.property = id;

    console.log(`The id is ${id}`);
    console.log(`The review is ${JSON.stringify(newReview)}`);
    postReview(id, newReview)
      .then((res) => {
        if (res.status != 201)
          throw new Error("Content Not Created");
        return res.json();
      })
      .then((review) => {
        setReviews([...reviews, review]);
      })
      .catch((error) => {
        console.log(error);
      });

    //setReviews([...reviews, newReview]);
  };

  function postReview(prop_id, review) {
    const promise = fetch(
      `http://localhost:8000/properties/${prop_id}/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
      }
    );

    return promise;
  }

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <HStack spacing={2} mb={2}>
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < rating ? "yellow.400" : "gray.300"}
                onClick={() => setRating(i + 1)}
              />
            ))}
        </HStack>
        <Input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write a review"
        />
        <Input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name"
        />
        <Input
          type="text"
          value={tags.join(", ")}
          onChange={(e) => setTags(e.target.value.split(", "))}
          placeholder="Tags (separated by commas)"
        />
        <Button type="submit">Submit Review</Button>
      </form>
      {reviews.map((review, index) => (
        <ReviewCard
          key={index}
          author={review.author}
          rating={review.rating}
          review={review.body}
          tags={review.tags}
        />
      ))}
    </Box>
  );
};

export default ReviewForm;
