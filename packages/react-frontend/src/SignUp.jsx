import React, { useState } from "react";
import { Box, Heading, Input, Button } from "@chakra-ui/react";

function SignUp(props) {
  const [creds, setCreds] = useState({
    username: "",
    pwd: ""
  });

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

  function submitForm() {
    props.handleSubmit(creds);
    setCreds({ username: "", pwd: "" });
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
    </Box>
  );
}
export default SignUp;
