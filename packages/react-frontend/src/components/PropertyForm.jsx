import { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormLabel,
  VStack
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const PropertyForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onSubmit(formData);
  };

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

          <Button type="submit" colorScheme="blue">
            Add Property
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

PropertyForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default PropertyForm;
