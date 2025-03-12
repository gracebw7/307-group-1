import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Button,
  Box,
  List,
  ListItem,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react";

const SearchBar = () => {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "https://prophuntapi.azurewebsites.net/properties"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        setProperties(data.properties_list || []);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const handleSearch = async () => {
    if (!address.trim()) {
      setError("Please enter an address");
      setError("Please enter an address");
      return;
    }

    try {
      console.log("Searching for:", address);
      const response = await fetch(
        `https://prophuntapi.azurewebsites.net/search?address=${encodeURIComponent(address)}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Search failed");
      }

      const matchingProperties = await response.json();
      console.log("Found properties:", matchingProperties);

      if (matchingProperties.length === 1) {
        navigate(
          `https://prophuntapi.azurewebsites.net/properties/${matchingProperties[0]._id}`
        );
        setError("");
      } else if (matchingProperties.length > 1) {
        setSuggestions(matchingProperties);
        onOpen();
      }
    } catch (error) {
      console.error("Search error:", error);
      setError(error.message);
    }
  };

  const handlePropertySelect = (propertyId) => {
    navigate(
      `https://prophuntapi.azurewebsites.net/properties/${propertyId}`
    );
    onClose();
  };

  return (
    <Box display="flex" alignItems="center" spacing={4}>
      <Input
        type="text"
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
          setError("");
        }}
        placeholder="Enter Property Address..."
        _placeholder={{ color: "white" }}
      />
      <Button onClick={handleSearch} m={2}>
        Search
      </Button>
      {error && (
        <Text color="white" mt={2}>
          {error}
        </Text>
      )}

      {/* Modal for multiple search results */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search Results</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {suggestions.length > 0 ? (
              <List spacing={2}>
                {suggestions.map((property) => (
                  <ListItem
                    key={property._id}
                    onClick={() =>
                      handlePropertySelect(property._id)
                    }
                    cursor="pointer"
                    _hover={{ bg: "gray.100" }}
                    p={3}
                    borderRadius="md">
                    <Text fontWeight="bold">
                      {property.name}
                    </Text>
                    <Text>{property.address}</Text>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Text color="white">
                No properties found matching your search.
              </Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SearchBar;
