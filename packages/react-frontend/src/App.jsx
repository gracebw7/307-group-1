import {
  ChakraProvider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  useDisclosure,
  Box
} from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Reviews from "./components/Reviews";
import PropertyPageDemo from "./pages/PropertyPageDemo";
import AddProperty from "./pages/AddProperty";
import { useState, useEffect } from "react";
import Login from "./Login";
import ReviewForm from "./components/ReviewForm";
import { ReviewsProvider } from "./reviewsContext";
import PropertyPage from "./pages/PropertyPage";
import Home from "./pages/Home";

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
          setMessage("Login successful; auth token saved");
        } else {
          setMessage(
            `Login Error: ${payload.error || "Unknown error"}`
          );
        }
      })
      .catch((error) => setMessage(`Login Error: ${error}`));
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
          setMessage("Signup successful; auth token saved");
        } else {
          setMessage(
            `Signup Error: ${payload.error || "Unknown error"}`
          );
        }
      })
      .catch((error) => setMessage(`Signup Error: ${error}`));
  }

  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(INVALID_TOKEN);
    window.location.href = "/login";
  };

  return (
    <ChakraProvider>
      <ReviewsProvider>
        <Router>
          <Box p={4} bg="gray.100" minH="100vh" width="100vw">
            <Box
              as="nav"
              bg="white"
              p={4}
              mb={6}
              boxShadow="md">
              <Link
                to="properties/67ac37ff87bbc59ba2e00dbb"
                style={{ marginRight: "20px" }}>
                Reviews
              </Link>
              <Link to="/" style={{ marginRight: "20px" }}>
                Home
              </Link>
              <Link
                to="/add-property"
                style={{ marginRight: "20px" }}>
                Add Property
              </Link>
              <Link
                to={`/create-review/67ac37ff87bbc59ba2e00dbb`}
                style={{ marginRight: "20px" }}>
                Create Review
              </Link>
              <Link
                to="/signup"
                style={{ marginRight: "20px" }}>
                Sign up
              </Link>
              <Link to="/login" style={{ marginRight: "20px" }}>
                Log in
              </Link>
              <Link
                onClick={logoutUser}
                style={{
                  marginLeft: "20px",
                  cursor: "pointer"
                }}>
                Logout
              </Link>
              <Link
                to="/propertypagedemo"
                style={{ marginLeft: "20px" }}>
                Property Page Demo
              </Link>
            </Box>

            <Routes>
              <Route
                path="/properties/:id/reviews"
                element={<Reviews />}
              />
              <Route path="/" element={<Home />} />
              <Route
                path="/add-property"
                element={<AddProperty />}
              />
              <Route
                path="/properties/:propertyId"
                element={<PropertyPage />}
              />
              <Route
                path="/propertypagedemo"
                element={<PropertyPageDemo />}
              />
              <Route
                path="/create-review/:id"
                element={<ReviewForm />}
              />
              <Route
                path="/login"
                element={<Login handleSubmit={loginUser} />}
              />
              <Route
                path="/signup"
                element={
                  <Login
                    handleSubmit={signupUser}
                    buttonLabel="Sign Up"
                  />
                }
              />
            </Routes>
          </Box>
        </Router>
      </ReviewsProvider>
    </ChakraProvider>
  );
}

export default App;
