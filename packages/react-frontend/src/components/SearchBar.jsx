import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Box, List, ListItem, Text } from "@chakra-ui/react";

const SearchBar = () => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:8000/properties");
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const handleSearch = async () => {
    if (!address.trim()) {
      setError("Please enter an address");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8000/properties/search?address=${encodeURIComponent(address)}`);
      
      if (!response.ok) {
        throw new Error("No matching properties found");
      }
  
      const matchingProperties = await response.json();
  
      if (matchingProperties.length === 1) {
        navigate(`/properties/${matchingProperties[0]._id}/reviews`);
        setError("");
        setSuggestions([]);
      } else if (matchingProperties.length > 1) {
        setSuggestions(matchingProperties);
        setError("");
      } else {
        setError("No properties found with this address");
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setError("No properties found");
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (propertyId) => {
    navigate(`/properties/${propertyId}/reviews`);
    setSuggestions([]);
    setAddress('');
    setError('');
  };

  const handleInputChange = (e) => {
    setAddress(e.target.value);
    setError('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box display="flex" flexDirection="column" width="100%" position="relative">
      <Box display="flex" alignItems="center" width="100%">
        <Input
          type="text"
          value={address}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter property address"
          size="lg"
          variant="filled"
          bg="rgba(255, 255, 255, 0.8)"
          _placeholder={{ color: 'gray.500' }}
          mr={2}
        />
        <Button onClick={handleSearch} colorScheme="teal" size="lg">Search</Button>
      </Box>
      
      {error && <Text color="red.500" mt={2}>{error}</Text>}
      
      {suggestions.length > 0 && (
        <List 
          position="absolute" 
          top="100%" 
          left="0" 
          right="0" 
          zIndex="10" 
          bg="white" 
          boxShadow="md" 
          borderRadius="md"
          mt={1}
          maxH="200px"
          overflowY="auto"
        >
          {suggestions.map((property) => (
            <ListItem 
              key={property._id} 
              p={3} 
              _hover={{ bg: "gray.100" }}
              cursor="pointer"
              onClick={() => handleSuggestionClick(property._id)}
            >
              {property.address}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SearchBar;
