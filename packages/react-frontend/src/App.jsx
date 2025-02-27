import { useState } from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Reviews from "./pages/Reviews";
import AddProperty from "./pages/AddProperty";
import Login from "./Login";
import ReviewForm from "./components/ReviewForm";
import { ReviewsProvider } from "./reviewsContext";

const API_PREFIX = "http://localhost:8000";

function App() {
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");

  function loginUser(creds) {
    const promise = fetch(`${API_PREFIX}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then((response) => {
        if (response.status === 200) {
          response
            .json()
            .then((payload) => setToken(payload.token));
          setMessage(
            `Login successful; auth token saved`
          );
        } else {
          setMessage(
            `Login Error ${response.status}: ${response.data}`
          );
        }
      })
      .catch((error) => {
        setMessage(
          `Login Error: ${error}`
        );
      });

    return promise;
  }

  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(INVALID_TOKEN);
    window.location.href = "/login";
  };

  function signupUser(creds) {
    const promise = fetch(`${API_PREFIX}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then((response) => {
        if (response.status === 201) {
          response
            .json()
            .then((payload) => setToken(payload.token));
          setMessage(
            `Signup successful for user: ${creds.username}; auth token saved`
          );
        } else {
          setMessage(
            `Signup Error ${response.status}: ${response.data}`
          );
        }
      })
      .catch((error) => {
        setMessage(
          `Signup Error: ${error}`
        );
      });

    return promise;
  }

  return (
    <ChakraProvider>
      <ReviewsProvider>
        <Router>
          <Box
            p={4}
            bg="gray.100"
            minH="100vh"
            width="100vw">
            <Box
              as="nav"
              bg="white"
              p={4}
              mb={6}
              boxShadow="md">
              <Link
                to="/reviews"
                style={{ marginRight: "20px" }}>
                  Reviews
              </Link>
              <Link
                to="/add-property"
                style={{ marginRight: "20px" }}>
                  Add Property
              </Link>
              <Link
                to="/create-review"
                style={{ marginRight: "20px" }}>
                  Create Review
              </Link>
              <Link
                to="/signup"
                style={{ marginRight: "20px" }}>
                  Sign up
              </Link>

              <Link
                to="/login"
                style={{ marginRight: "20px" }}>
                  Log in
              </Link>
              <Link
                onClick={logoutUser}
                style={{ marginLeft: "20px" }}>
                  Logout
              </Link>
            </Box>

            <Routes>
              <Route path="/reviews" element={<Reviews />} />
              <Route
                path="/add-property"
                element={<AddProperty />}
              />
              <Route
                path="/create-review"
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
