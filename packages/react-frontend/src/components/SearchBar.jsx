import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ properties }) => {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!address.trim()) {
      setError("Please enter an address");
      return;
    }

    // Find the property by address (case-insensitive)
    const foundProperty = properties.find((prop) =>
      prop.address.toLowerCase().includes(address.toLowerCase())
    );

    if (foundProperty) {
      // Navigate to the property details page
      navigate(`/property/${foundProperty._id}`);
      setError("");
    } else {
      setError("No property found with this address");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
          setError(""); // Clear error when user starts typing
        }}
        placeholder="Enter property address"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SearchBar;
