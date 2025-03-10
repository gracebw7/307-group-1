import { ChakraProvider, Box } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Reviews from "./pages/Reviews";
import PropertyPageDemo from "./pages/PropertyPageDemo";
import AddProperty from "./pages/AddProperty";
import { useState, useEffect } from "react";
import Login from "./Login";
import ReviewForm from "./components/ReviewForm";
import { ReviewsProvider } from "./reviewsContext";
import PropertyPage from "./pages/PropertyPage";

const API_PREFIX = "http://localhost:8000";

function App() {
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(
    localStorage.getItem("token") || INVALID_TOKEN
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (token !== INVALID_TOKEN) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  function loginUser(creds) {
    return fetch(`${API_PREFIX}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then((response) => response.json())
      .then((payload) => {
        if (payload.token) {
          setToken(payload.token);
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  }

  function signupUser(creds) {
    return fetch(`${API_PREFIX}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then((response) => response.json())
      .then((payload) => {
        if (payload.token) {
          setToken(payload.token);
        }
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });
  }

  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(INVALID_TOKEN);
  };

  return (
    <ChakraProvider>
      <ReviewsProvider>
        <Router>
          <Box p={4} bg="gray.100" minH="100vh">
            <Box as="nav" bg="white" p={4} mb={6} boxShadow="md">
              <Link to="/reviews" style={{ marginRight: "20px" }}>
                Reviews
              </Link>
              <Link to="/add-property" style={{ marginRight: "20px" }}>
                Add Property
              </Link>
              <Link to="/properties/:id/reviews" style={{ marginRight: "20px" }}>
                Create Review
              </Link>
              <Link to="/signup" style={{ marginRight: "20px" }}>
                Sign up
              </Link>
              <Link to="/login" style={{ marginRight: "20px" }}>
                Log in
              </Link>
              <Link onClick={logoutUser} style={{ marginLeft: "20px" }}>
                Logout
              </Link>
            </Box>

            <Routes>
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/add-property" element={<AddProperty />} />
              <Route path="/properties/:id/reviews" element={<ReviewForm />} />
              <Route path="/login" element={<Login handleSubmit={loginUser} />} />
              <Route path="/signup" element={<Login handleSubmit={signupUser} buttonLabel="Sign Up" />} />
              <Route path="/property/:id" element={<PropertyPage />} />
            </Routes>
          </Box>
        </Router>
      </ReviewsProvider>
    </ChakraProvider>
  );
}

export default App;
