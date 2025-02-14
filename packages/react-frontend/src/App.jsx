import React from 'react';
import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Reviews from "./pages/Reviews";
import ReviewForm from './components/ReviewForm';
import { ReviewsProvider } from './reviewsContext';

function App() {
  return (
    <ChakraProvider>
      <ReviewsProvider>
        <Router>
          <Box p={4} bg="gray.100" minH="100vh">
            <Box as="nav" bg="white" p={4} mb={6} boxShadow="md">
              <Link to="/reviews" style={{ marginRight: "20px" }}>Reviews</Link>
              <Link to="/create-review" style={{ marginRight: "20px" }}>Create Review</Link>
            </Box>

            <Routes>
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/create-review" element={<ReviewForm />} />
            </Routes>
          </Box>
        </Router>
      </ReviewsProvider>
    </ChakraProvider>
  );
}

export default App;

