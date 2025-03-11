import mongoose from "mongoose";
import dotenv from "dotenv";
import Property from "../express-backend/models/property";
import Review from "../express-backend/models/review";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });


const propertiesData = [
  { name: "Greenwood Apartments", address: "123 Main St" },
  { name: "Blue Horizon Towers", address: "456 Ocean Ave" },
  { name: "Sunset Villas", address: "789 Sunset Blvd" },
  { name: "Downtown Lofts", address: "321 City Center Dr" }
];

// Function to generate placeholder reviews
const generatePlaceholderReviews = (propertyId) => {
  const placeholderTexts = [
    "Great place to live, very clean and spacious.",
    "Nice location but a bit noisy at night.",
    "Affordable rent with good amenities.",
    "Friendly neighbors and safe community.",
    "Could use some maintenance but overall good.",
    "Amazing management, very responsive.",
    "Love the gym and pool area!",
    "Parking is a bit of an issue.",
    "Quiet neighborhood with lots of parks.",
    "Public transport access is a huge plus.",
    "High-speed internet and modern appliances.",
    "Best value for the price!"
  ];

  return Array.from({ length: 12 }, (_, i) => ({
    property: propertyId,
    author: `User`,
    rating: 5,
    tags: [],
    body: placeholderTexts[i % placeholderTexts.length]
  }));
};

const seedDatabase = async () => {
  try {
    await Property.deleteMany({});
    await Review.deleteMany({});

    for (const propertyData of propertiesData) {
      const property = new Property(propertyData);
      await property.save();

      const reviews = generatePlaceholderReviews(property._id);
      await Review.insertMany(reviews);

    }

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
