import {
  Box,
  Heading,
  Text,
  Tag,
  HStack
} from "@chakra-ui/react";
import PropTypes from "prop-types";

PropertySummary.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  averageRating: PropTypes.number.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired
};

function PropertySummary({
  name,
  address,
  averageRating,
  tags
}) {
  return (
    <Box
      p={5}
      bg="white"
      boxShadow="md"
      borderRadius="lg"
      maxW="400px"
      w="100%">
      {/* Property Name */}
      <Heading size="md" mb={2}>
        {name}
      </Heading>

      {/* Address */}
      <Text fontSize="sm" color="gray.600">
        {address}
      </Text>

      {/* Average Rating */}
      <Text fontWeight="bold" mt={2}>
        ⭐ {averageRating.toFixed(1)} / 5
      </Text>

      {/* Tags */}
      {tags.length > 0 && (
        <HStack spacing={2} mt={3} wrap="wrap">
          {tags.map((tag, index) => (
            <Tag key={index} colorScheme="blue">
              {tag}
            </Tag>
          ))}
        </HStack>
      )}
    </Box>
  );
}

export default PropertySummary;
