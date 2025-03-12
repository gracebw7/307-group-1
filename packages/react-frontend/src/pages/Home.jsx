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
import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

function Home() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [submitted, setSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [properties, setProperties] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "http://prophuntapi.azurewebsites.net/properties"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        setProperties(data.properties_list);
        console.log(
          "Fetched properties:",
          data.properties_list
        );
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const handlePropertySubmit = async (formData) => {
    try {
      const response = await fetch(
        "prophuntapi.azurewebsites.net/properties",
        {
          method: "POST",
          headers: addAuthHeader({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify(formData)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit property.");
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (data._id) {
        navigate(`/properties/${data._id}`);
      } else {
        throw new Error("No _id returned from the server.");
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting property:", error);
    }
  };

  const handleSearch = () => {
    navigate(`/properties/search?address=${searchQuery}`);
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
              <SearchBar properties={properties} />{" "}
              {/* Use SearchBar component */}
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center">
              <HStack spacing={4}>
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
          <Box>
            <Text
              justifyContent="center"
              alignItems="center"
              fontSize="lg"
              textIndent="2em"
              w="50vw">
              Cal Poly Prop Hunt is a website designed to
              support students looking for housing in San Luis
              Obispo. Prop Hunt provides an open forum for
              student to share their opinions about their
              current housing arrangement and view reviews left
              by other students to gain insights into housing
              options in the future. What makes Prop Hunt unique
              is that we recognize and support the unique
              challenges faced by student renters; integrating
              housing attributes like proximity to campus,
              ability to sublease, roommate assignment, and many
              more. Get started by searching up a property
              above! Don’t see your property? Feel free to add
              it to our site and help grow and support our
              community of Cal Poly student tenants. Enjoy!
            </Text>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default Home;
