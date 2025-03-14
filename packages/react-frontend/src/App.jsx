import { ChakraProvider, Box, Image } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PropertyPage from "./pages/PropertyPage";
import Home from "./pages/Home";
import PHLogo from "./assets/PHLogo.png";
import { ReviewsProvider } from "./reviewsContext";

const API_PREFIX = "https://prophuntapi.azurewebsites.net";

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
  };

  const linkStyle = {
    marginRight: "20px",
    display: "flex",
    alignItems: "center",
    fontSize: "1em",
    height: "1.5em" // Matches the default line height
  };

  return (
    <ChakraProvider>
      <ReviewsProvider>
        <Router>
          <Box
            p={4}
            bg="gray.100"
            minH="100vh"
            w="100%"
            m="0"
            boxSizing="border-box"
            position="absolute"
            top="0"
            left="0">
            <Box
              as="nav"
              bg="white"
              p={4}
              mb={6}
              boxShadow="md"
              width="100%"
              justifyContent="flex-start"
              display="flex">
              <Link to="/" style={linkStyle}>
                <Image
                  src={PHLogo}
                  alt="Home"
                  style={{ height: "3em", width: "auto" }}
                />
              </Link>
              <Link to="/signup" style={linkStyle}>
                Sign up
              </Link>
              <Link to="/login" style={linkStyle}>
                Log in
              </Link>
              <Link
                to="/"
                onClick={logoutUser}
                style={{
                  ...linkStyle,
                  cursor: "pointer"
                }}>
                Logout
              </Link>
            </Box>

            <Routes>
              <Route
                path="/properties/:propertyId"
                element={<PropertyPage />}
              />
              <Route path="/" element={<Home />} />

              <Route
                path="/login"
                element={<Login handleSubmit={loginUser} />}
              />
              <Route
                path="/signup"
                element={
                  <SignUp
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
