import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Card,
  CardBody,
  CardHeader,
  Badge,
  Flex,
  Spinner,
  Center
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import SearchBar from "../components/SearchBar";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/properties");
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setProperties(data.properties_list || []);
      setFilteredProperties(data.properties_list || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    const searchTerm = query.toLowerCase();
    if (!searchTerm.trim()) {
      // If search is empty, show all properties
      setFilteredProperties(properties);
      return;
    }
    
    // Filter properties by address
    const filtered = properties.filter(property => 
      property.address && property.address.toLowerCase().includes(searchTerm)
    );
    
    setFilteredProperties(filtered);
  };

  if (loading) {
    return (
      <Center h="200px">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  if (error) {
    return <Text color="red.500">Error loading properties: {error}</Text>;
  }

  return (
    <Box>
      <Heading mb={4}>Properties</Heading>
      <SearchBar onSearch={handleSearch} />
      
      {filteredProperties.length === 0 ? (
        <Text>No properties found matching your search.</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredProperties.map((property) => (
            <Card key={property._id} boxShadow="md" borderRadius="lg">
              <CardHeader pb={0}>
                <Heading size="md">{property.name}</Heading>
                <Text color="gray.600" fontSize="sm">{property.address}</Text>
              </CardHeader>
              <CardBody>
                <Flex align="center" mb={2}>
                  {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <StarIcon
                        key={i}
                        color={i < property.averageRating ? "yellow.400" : "gray.300"}
                        size="sm"
                      />
                    ))}
                  <Text ml={2} fontSize="sm">
                    {property.averageRating ? property.averageRating.toFixed(1) : "No ratings"}
                  </Text>
                </Flex>
                <Flex wrap="wrap" gap={1}>
                  {property.tags && property.tags.map((tag, index) => (
                    <Badge key={index} colorScheme="blue" mr={1}>
                      {tag}
                    </Badge>
                  ))}
                </Flex>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Properties;