import React, { useState, useEffect } from "react";
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
  WrapItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";

ReviewForm.propTypes = {
  prop_id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  setNewReview: PropTypes.func.isRequired
};

function addAuthHeader(otherHeaders = {}) {
  const token = localStorage.getItem("token");

  if (!token) {
    return otherHeaders;
  }

  return {
    ...otherHeaders,
    Authorization: `Bearer ${token}`
  };
}

function ReviewForm(props) {
  const prop_id = props.prop_id;
  
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check token on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Set to true if token exists
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setIsOpen(true);
      return;
    }

    const newReview = {
      author,
      rating,
      body,
      tags
    };

    newReview.property = prop_id;

    console.log(`The id is ${prop_id}`);
    console.log(`The review is ${JSON.stringify(newReview)}`);
    postReview(prop_id, newReview)
      .then((res) => {
        if (res.status !== 201)
          throw new Error("Content Not Created");
        return res.json();
      })
      .then((review) => {
        props.setNewReview(review);
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

  const onClose = () => {
    setIsOpen(false);
  };

  function postReview(prop_id, review) {
    const promise = fetch(
      `http://localhost:8000/properties/${prop_id}/reviews`,
      {
        method: "POST",
        headers: addAuthHeader({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(review)
      }
    );

    props.onClose();
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
          mt={2}
          mb={2}
          padding={2}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write a review"
        />
        <Input
          type="text"
          mt={2}
          mb={2}
          padding={2}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name"
        />
        <Box>
          <Popover>
            <PopoverTrigger mt={2} mb={2}>
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
                      <Checkbox
                        key={option.value}
                        value={option.value}>
                        {option.label}
                      </Checkbox>
                    ))}
                  </Stack>
                </CheckboxGroup>
              </PopoverBody>
              <PopoverFooter>
                <Button onClick={() => setTags([])}>
                  Clear All
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </Box>
        <Wrap mt={2}>
          {tags.map((tag, index) => (
            <WrapItem key={index}>
              <Tag>
                <TagLabel>{tag}</TagLabel>
                <TagCloseButton
                  onClick={() => handleTagRemove(tag)}
                />
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
        <Button type="submit" mt={2} mb={2}>
          Submit Review
        </Button>
      </form>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login Required</ModalHeader>
          <ModalBody>You must log in to post a review.</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ReviewForm;