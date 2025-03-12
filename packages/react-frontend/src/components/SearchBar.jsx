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
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8000/properties/search?address=${encodeURIComponent(address)}`);
      
      if (!response.ok) {
        throw new Error("No matching properties found");
      }
  
      const matchingProperties = await response.json();
  
      if (matchingProperties.length === 1) {
        navigate(`/properties/${matchingProperties[0]._id}`);
        setError("");
      } else {
        setSuggestions(matchingProperties);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSuggestionClick = (propertyId) => {
    navigate(`/properties/${propertyId}`);
    setSuggestions([]); 
  };

  return (
    <Box>
      <Input
        type="text"
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
          setError('');
        }}
        placeholder="Enter property address"
      />
      <Button onClick={handleSearch}>Search</Button>
      {error && <Text color="red">{error}</Text>}
      {suggestions.length > 0 && (
        <List 
          mt={2} 
          bg="white" 
          borderRadius="md" 
          boxShadow="sm" 
          position="absolute" 
          zIndex="1"
          width="100%"
        >
          {suggestions.map((property) => (
            <ListItem 
              key={property._id}
              onClick={() => handleSuggestionClick(property._id)}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              p={2}
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