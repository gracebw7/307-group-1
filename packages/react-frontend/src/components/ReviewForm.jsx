import React, { useState } from "react";
import {
  Box,
  HStack,
  Input,
  Button,
  Checkbox,
  CheckboxGroup,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem
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
      tags,
      property: id // Include the property id
    };

    console.log(`The id is ${id}`);
    console.log(`The review is ${JSON.stringify(newReview)}`);
    postReview(id, newReview)
      .then((res) => {
        if (res.status !== 201) throw new Error("Content Not Created");
        return res.json();
      })
      .then((review) => {
        setReviews([...reviews, review]);
      })
      .catch((error) => {
        console.log(error);
      });

    // Clear the form fields after submission
    setRating(0);
    setBody("");
    setAuthor("");
    setTags([]);
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

  const tagOptions = [
    { value: "Convenient", label: "Convenient" },
    { value: "Cheap", label: "Cheap" },
    { value: "Worth the price", label: "Worth the price" },
    { value: "Overpriced", label: "Overpriced" },
    { value: "Bad experience", label: "Bad experience" },
    { value: "Good experience", label: "Good experience" },
    { value: "Great experience!", label: "Great experience!" }
  ];

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
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
        <Box>
          <Popover>
            <PopoverTrigger>
              <Button>Select Tags</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Select Tags</PopoverHeader>
              <PopoverBody>
                <CheckboxGroup value={tags} onChange={setTags}>
                  <Stack spacing={2}>
                    {tagOptions.map((option) => (
                      <Checkbox key={option.value} value={option.value}>
                        {option.label}
                      </Checkbox>
                    ))}
                  </Stack>
                </CheckboxGroup>
              </PopoverBody>
              <PopoverFooter>
                <Button onClick={() => setTags([])}>Clear All</Button>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </Box>
        <Wrap mt={2}>
          {tags.map((tag, index) => (
            <WrapItem key={index}>
              <Tag>
                <TagLabel>{tag}</TagLabel>
                <TagCloseButton onClick={() => handleTagRemove(tag)} />
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
        <Button type="submit" mt={4}>
          Submit Review
        </Button>
      </form>
      {reviews.map((review, index) => (
        <ReviewCard
          key={index}
          author={review.author}
          rating={review.rating}
          body={review.body}
          tags={review.tags}
        />
      ))}
    </Box>
  );
};

export default ReviewForm;