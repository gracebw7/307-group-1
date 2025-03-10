import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  Heading,
  Text,
  Stack,
  HStack,
  useDisclosure,
  Input
} from "@chakra-ui/react";
import { Link as HLink } from "react-router-dom";
import homeImage from "../assets/home.jpg";
import PropertyForm from "../components/PropertyForm";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [submitted, setSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handlePropertySubmit = async (formData) => {
    try {
      const response = await fetch(
        "http://localhost:8000/properties",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit property.");
      } else {
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (data._id) {
        navigate(`/properties/${data._id}`); // Use the _id from the response
      } else {
        throw new Error("No _id returned from the server.");
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting property:", error);
    }
  };

  const handleSearch = () => {
    navigate(`/properties/search?address=${searchQuery}`); // Navigate to the search results page
  };

  return (
    <Box>
      <Box
        height="50vh"
        width="75"
        bgImage={homeImage}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          color="white">
          <Stack spacing={4} textAlign="center">
            <Heading as="h1" size="xl">
              Welcome to Cal Poly Prop Hunt
            </Heading>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center">
              <Input
                placeholder="Search properties by address..."
                size="lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
              />
              <Button onClick={handleSearch} ml={2}>
                Search
              </Button>{" "}
              {/* Add search button */}
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center">
              <HStack spacing={4}>
                <HLink
                  to="properties/67ac37ff87bbc59ba2e00dbb"
                  color="teal"
                  size="lg">
                  Search
                </HLink>

                <>
                  <Button
                    spacing={2}
                    mt={3}
                    wrap="wrap"
                    onClick={onOpen}>
                    Add Property
                  </Button>
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>
                        <ModalCloseButton />
                      </ModalHeader>
                      <ModalBody>
                        <PropertyForm
                          onSubmit={handlePropertySubmit}
                        />
                      </ModalBody>
                      <ModalFooter></ModalFooter>
                    </ModalContent>
                  </Modal>
                </>
              </HStack>
            </Box>
          </Stack>
        </Box>
      </Box>
      <Box p={5}>
        <Stack spacing={4} align="center">
          <Heading as="h1" size="xl">
            What is Cal Poly Prop Hunt?
          </Heading>
          <Text fontSize="lg">
            Will List Site Description Here.
          </Text>
        </Stack>
      </Box>
    </Box>
  );
}

export default Home;
