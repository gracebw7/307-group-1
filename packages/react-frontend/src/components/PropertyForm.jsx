import { useState } from "react";
import { Box, Button, Input, FormLabel, VStack, NumberInput, NumberInputField } from "@chakra-ui/react";
import PropTypes from "prop-types";
import Select from "react-select";

const PropertyForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    bedrooms: 0,
    bathrooms: 0,
    tags: [],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNumberChange = (valueAsString, valueAsNumber, name) => {
    setFormData({
      ...formData,
      [name]: valueAsNumber,
    });
  };

  const handleTagsChange = (selectedOptions) => {
    setFormData({
      ...formData,
      tags: selectedOptions.map(option => option.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const tagOptions = [
    { value: "apartment", label: "Apartment" },
    { value: "house", label: "House" },
    { value: "close-to-campus", label: "Close to Campus" },
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
              onChange={(valueAsString, valueAsNumber) => handleNumberChange(valueAsString, valueAsNumber, "bedrooms")}
              required
            >
              <NumberInputField />
            </NumberInput>
          </Box>

          <Box>
            <FormLabel>Bathrooms</FormLabel>
            <NumberInput
              min={0}
              name="bathrooms"
              value={formData.bathrooms}
              onChange={(valueAsString, valueAsNumber) => handleNumberChange(valueAsString, valueAsNumber, "bathrooms")}
              required
            >
              <NumberInputField />
            </NumberInput>
          </Box>

          <Box>
            <FormLabel>Tags</FormLabel>
            <Select
              isMulti
              name="tags"
              options={tagOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleTagsChange}
            />
          </Box>

          <Button type="submit" colorScheme="blue">
            Add Property
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

PropertyForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PropertyForm;
