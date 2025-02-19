import { Box, SimpleGrid } from "@chakra-ui/react";
import ReviewCard from "../components/ReviewCard";

function Reviews() {
  const reviews = [
    {
      author: "John Doe",
      rating: 4,
      review: "Great place! The landlord was very responsive.",
      tags: ["Close to campus", "Pet friendly", "Free parking"]
    },
    {
      author: "Jane Smith",
      rating: 5,
      review:
        "Loved living here! The maintenance was quick to respond.",
      tags: ["Safe neighborhood", "Great amenities"]
    },
    {
      author: "Alice Brown",
      rating: 3,
      review: "Decent place, but a bit noisy at night.",
      tags: ["Good price", "Near public transport"]
    },
    {
      author: "Bob Johnson",
      rating: 2,
      review:
        "Had issues with the landlord, slow to fix things.",
      tags: ["Affordable", "Lots of space"]
    }
  ];

  return (
    <Box
      p={8}
      bg="gray.100"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center">
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={6}
        maxW="900px">
        {reviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Reviews;
