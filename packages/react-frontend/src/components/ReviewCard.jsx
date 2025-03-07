import {
  Box,
  Text,
  Badge,
  HStack,
  Avatar
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";

const ReviewCard = ({ author, rating, body, tags }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      shadow="md"
      maxW="60vw"
      bg="white">
      <HStack spacing={2} mb={2}>
        {Array(5)
          .fill("")
          .map((_, i) => (
            <StarIcon
              key={i}
              color={i < rating ? "yellow.400" : "gray.300"}
            />
          ))}
      </HStack>
      <Text fontSize="md" mb={2}>
        &quot;{body}&quot;
      </Text>
      <HStack spacing={2} mb={2} wrap="wrap">
        {tags.map((tag, index) => (
          <Badge key={index} colorScheme="purple">
            {tag}
          </Badge>
        ))}
      </HStack>
      <HStack mt={4}>
        <Avatar size="sm" name={author} />
        <Text fontWeight="bold">{author}</Text>
      </HStack>
    </Box>
  );
};
ReviewCard.propTypes = {
  author: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ReviewCard;
