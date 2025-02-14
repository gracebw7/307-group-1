import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Reviews from "./pages/Reviews";
import AddProperty from "./pages/AddProperty";  // ✅ Import the new page

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Box p={4} bg="gray.100" minH="100vh">
          <Box as="nav" bg="white" p={4} mb={6} boxShadow="md">
            <Link to="/reviews" style={{ marginRight: "20px" }}>Reviews</Link>
            <Link to="/add-property">Add Property</Link>  {/* ✅ New link */}
          </Box>

          <Routes>
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/add-property" element={<AddProperty />} />  {/* ✅ New route */}
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
