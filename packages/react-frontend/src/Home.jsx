import React from "react";
import { Text, Box, Input } from "@chakra-ui/react";

function Home() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="80vh" flexDirection="column">
      <Text fontSize="100" fontWeight="bold">PropHunt</Text>
      <Input
        placeholder="Search..."
        width="300px"
        mt={4}
      />
    </Box>
  );
}

export default Home;
