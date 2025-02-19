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

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState([]);
  const [reviews, setReviews] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      author,
      rating,
      review,
      tags
    };
    setReviews([...reviews, newReview]);
  };

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
          value={review}
          onChange={(e) => setReview(e.target.value)}
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
          review={review.review}
          tags={review.tags}
        />
      ))}
    </Box>
  );
};

export default ReviewForm;
