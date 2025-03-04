import { useEffect, useState } from "react";
import { Box, VStack, Divider, Text } from "@chakra-ui/react";
import PropertySummary from "../components/PropertySummary";
import ReviewCard from "../components/ReviewCard";

// Simulated API call (Replace with real API fetch)
const fetchPropertyData = async () => {
  return {
    name: "Sunny Apartments",
    address: "123 Main St, Springfield",
    averageRating: 4.5,
    tags: ["Close to campus", "Pet friendly", "Free parking"],
    reviews: [
      {
        author: "Alice Johnson",
        rating: 5,
        review: "Amazing place!",
        tags: ["Quiet", "Safe neighborhood"]
      },
      {
        author: "Bob Smith",
        rating: 3,
        review: "Okay experience.",
        tags: ["Affordable", "Needs better maintenance"]
      },
      {
        author: "Charlie Davis",
        rating: 4,
        review: "Nice location.",
        tags: ["Great location", "Responsive landlord"]
      },
      {
        author: "Dana Lee",
        rating: 5,
        review: "Best place I've lived!",
        tags: ["Spacious", "Modern appliances"]
      }
    ]
  };
};

export default function PropertyPage() {
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetchPropertyData().then(setProperty);
  }, []);

  if (!property) return <Text>Loading...</Text>;

  return (
    <Box p={6} maxW="800px" mx="auto">
      {/* Use PropertySummary Component */}
      <PropertySummary
        name={property.name}
        address={property.address}
        averageRating={property.averageRating}
        tags={property.tags}
      />

      <Divider my={6} />

      {/* Reviews Section */}
      <VStack spacing={4} align="stretch">
        {property.reviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </VStack>
    </Box>
  );
}
