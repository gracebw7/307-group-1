import {
  Box,
  Heading,
  Text,
  Tag,
  HStack,
  Button
} from "@chakra-ui/react";
import {
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
  useDisclosure
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import ReviewForm from "./ReviewForm";

PropertySummary.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  averageRating: PropTypes.number.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  setNewReview: PropTypes.func.isRequired,
  updateProperty: PropTypes.func.isRequired
};

function PropertySummary({
  name,
  address,
  averageRating,
  tags,
  id,
  setNewReview,
  updateProperty
}) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box
      p={5}
      bg="white"
      boxShadow="md"
      borderRadius="lg"
      maxW="40vw"
      position="center"
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
        {averageRating === 0 ? (
          <i>No Reviews Yet</i>
        ) : (
          `⭐ ${averageRating.toFixed(1)} / 5`
        )}
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
      <>
        <Button spacing={2} mt={3} wrap="wrap" onClick={onOpen}>
          Add Review
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <ModalCloseButton />
            </ModalHeader>
            <ModalBody>
              <ReviewForm
                prop_id={id}
                onClose={onClose}
                setNewReview={setNewReview}
                updateProperty={updateProperty}
              />
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </Box>
  );
}

export default PropertySummary;
