import { useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import PropertyForm from "../components/PropertyForm";

function addAuthHeader(otherHeaders = {}) {
  const token = localStorage.getItem("token");

  if (!token) {
    return otherHeaders;
  }

  return {
    ...otherHeaders,
    Authorization: `Bearer ${token}`
  };
}

const AddProperty = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(
        "https://prophuntapi.azurewebsites.net/properties",
        {
          method: "POST",
          headers: addAuthHeader({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify(formData)
        }
      );

      if (!response.ok)
        throw new Error("Failed to submit property.");

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting property:", error);
    }
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Add a Property</Heading>
      {!submitted ? (
        <PropertyForm onSubmit={handleSubmit} />
      ) : (
        <p>Property submitted successfully!</p>
      )}
    </Box>
  );
};

export default AddProperty;
