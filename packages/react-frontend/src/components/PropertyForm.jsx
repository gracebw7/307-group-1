import { useState } from "react";
<<<<<<< HEAD
import {
  Box,
  Button,
  Input,
  FormLabel,
  VStack
} from "@chakra-ui/react";
=======
import { Box, Button, Input, FormLabel, VStack } from "@chakra-ui/react";
>>>>>>> origin/main
import PropTypes from "prop-types";

const PropertyForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
<<<<<<< HEAD
    address: ""
=======
    address: "",
>>>>>>> origin/main
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
<<<<<<< HEAD
      [e.target.name]: e.target.value
=======
      [e.target.name]: e.target.value,
>>>>>>> origin/main
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
<<<<<<< HEAD
  onSubmit: PropTypes.func.isRequired
=======
  onSubmit: PropTypes.func.isRequired,
>>>>>>> origin/main
};

export default PropertyForm;
