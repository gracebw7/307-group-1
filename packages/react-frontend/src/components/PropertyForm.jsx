import { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormLabel,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const PropertyForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: ""
  });

  const { isOpen, onOpen, onClose } = useDisclosure(); // For the modal

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      onOpen();
      return;
    }

    console.log(formData);
    onSubmit(formData);
  };

  return (
    <>
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

      {/* Login Required Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login Required</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              You need to be logged in to post a review.
            </Text>
            <Button mt={4} colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

PropertyForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default PropertyForm;
