import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Box, List, ListItem, Text } from "@chakra-ui/react";

const SearchBar = ({ properties }) => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Properties in SearchBar:", properties);
  }, [properties]);

  const handleSearch = () => {
    if (!address.trim()) {
      setError('Please enter an address');
      return;
    }

    console.log("Searching for address:", address);
    console.log("Available properties:", properties);

    if (!properties || properties.length === 0) {
      console.error("No properties available to search");
      setError('No properties available to search');
      return;
    }

    const matchingProperties = properties.filter(
      prop => prop.address && prop.address.toLowerCase().includes(address.toLowerCase())
    );

    console.log("Matching properties:", matchingProperties);

    if (matchingProperties.length === 1) {
      const property = matchingProperties[0];
      console.log("Navigating to property:", property);
      navigate(`/properties/${property._id}/reviews`);
      setError('');
      setSuggestions([]);
    } else if (matchingProperties.length > 1) {
      setSuggestions(matchingProperties);
      setError('');
    } else {
      setError('No properties found with this address');
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (propertyId) => {
    console.log("Suggestion clicked for property ID:", propertyId);
    navigate(`/properties/${propertyId}/reviews`);
    setSuggestions([]);
    setAddress('');
    setError('');
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    setError('');
    
    // show possible addresses to choose from when user types
    if (value.length >= 3 && properties && properties.length > 0) {
      const matches = properties.filter(
        prop => prop.address && prop.address.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matches.slice(0, 5));
    } else {
      setSuggestions([]);
    }
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