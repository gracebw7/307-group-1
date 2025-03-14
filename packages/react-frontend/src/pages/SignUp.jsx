import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  Text
} from "@chakra-ui/react";

function SignUp(props) {
  const [creds, setCreds] = useState({
    username: "",
    pwd: ""
  });
  const [signupStatus, setSignupStatus] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case "username":
        setCreds({ ...creds, username: value });
        break;
      case "password":
        setCreds({ ...creds, pwd: value });
        break;
    }
  }

  async function submitForm() {
    try {
      await props.handleSubmit(creds);
      setSignupStatus("You have successfully signed up!");
      setCreds({ username: "", pwd: "" });
    } catch (error) {
      setSignupStatus("Signup failed. Please try again.");
    }
  }

  return (
    <Box p={6} bg="white" borderRadius="md" boxShadow="md">
      <Heading mb={4}>Sign Up</Heading>
      <form>
        <Box mb={3}>
          <label htmlFor="username">Username</label>
          <Input
            type="text"
            name="username"
            id="username"
            value={creds.username}
            onChange={handleChange}
          />
        </Box>
        <Box mb={3}>
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            name="password"
            id="password"
            value={creds.pwd}
            onChange={handleChange}
          />
        </Box>
        <Button type="button" onClick={submitForm}>
          {props.buttonLabel || "Sign Up"}
        </Button>
      </form>
      {signupStatus && (
        <Text
          mt={3}
          color={
            signupStatus.includes("success")
              ? "green.500"
              : "red.500"
          }>
          {signupStatus}
        </Text>
      )}
    </Box>
  );
}

export default SignUp;
