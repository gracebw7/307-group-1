import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  FormLabel,
  VStack,
  NumberInput,
  NumberInputField,
  Tag,
  TagLabel,
  Wrap,
  WrapItem,
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
  TagCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const PropertyForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    bedrooms: 0,
    bathrooms: 0,
    tags: []
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check token on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Set to true if token exists
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNumberChange = (
    valueAsString,
    valueAsNumber,
    name
  ) => {
    setFormData({
      ...formData,
      [name]: valueAsNumber
    });
  };

  const handleTagsChange = (selectedTags) => {
    setFormData({
      ...formData,
      tags: selectedTags
    });
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setIsOpen(true);
      return;
    }
    console.log(formData);
    onSubmit(formData);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const tagOptions = [
    { value: "Apartment", label: "Apartment" },
    { value: "House", label: "House" },
    { value: "Close to campus", label: "Close to campus" },
    { value: "Pet friendly", label: "Pet friendly" },
    { value: "Studio", label: "Studio" },
    { value: "Free parking", label: "Free parking" }
  ];

  return (
    <Box p={4} bg="white" borderRadius="lg" boxShadow="md">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Box>
            <FormLabel>Property Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Box>
          <Box>
            <FormLabel>Address</FormLabel>
            <Input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Box>
          <Box>
            <FormLabel>Bedrooms</FormLabel>
            <NumberInput
              min={0}
              name="bedrooms"
              value={formData.bedrooms}
              onChange={(valueAsString, valueAsNumber) =>
                handleNumberChange(
                  valueAsString,
                  valueAsNumber,
                  "bedrooms"
                )
              }
              required>
              <NumberInputField />
            </NumberInput>
          </Box>
          <Box>
            <FormLabel>Bathrooms</FormLabel>
            <NumberInput
              min={0}
              name="bathrooms"
              value={formData.bathrooms}
              onChange={(valueAsString, valueAsNumber) =>
                handleNumberChange(
                  valueAsString,
                  valueAsNumber,
                  "bathrooms"
                )
              }
              required>
              <NumberInputField />
            </NumberInput>
          </Box>
          <Box>
            <FormLabel>Tags</FormLabel>
            <Popover>
              <PopoverTrigger>
                <Button>Select Tags</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Select Tags</PopoverHeader>
                <PopoverBody>
                  <CheckboxGroup
                    value={formData.tags}
                    onChange={handleTagsChange}>
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
                  <Button
                    onClick={() =>
                      setFormData({ ...formData, tags: [] })
                    }>
                    Clear All
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </Box>
          <Wrap mt={2}>
            {formData.tags.map((tag, index) => (
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
          <Button type="submit" colorScheme="blue">
            Add Property
          </Button>
        </VStack>
      </form>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login Required</ModalHeader>
          <ModalBody>
            You must log in to post a review.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

PropertyForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default PropertyForm;
