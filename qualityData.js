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
  { name: "Mustang Village", address: "1 Mustang Drive" },
  { name: "Valencia Apartments", address: "555 Ramona Dr" },
  { name: "Summit SLO", address: "790 Foothill Blvd" },
  { name: "Chorro at SLO", address: "22 Chorro St" }
];

const writtenReviews = {
  "Mustang Village": [
    { author: "Alice", rating: 3, body: "Noisy at night." },
    { author: "Bob", rating: 5, body: "Love the community vibe here!" },
    { author: "Charlie", rating: 3, body: "Decent place, but roommates can be random" },
    { author: "Dana", rating: 4, body: "Love how it's close to campus!" },
    { author: "Eve", rating: 2, body: "Maintenance is slow to respond." },
    { author: "Frank", rating: 5, body: "Best place I've lived so far!" },
    { author: "Grace", rating: 3, body: "WiFi is spotty sometimes." },
    { author: "Hank", rating: 2, body: "Not very clean or safe" },
    { author: "Ivy", rating: 4, body: "Pretty solid!" },
  ],
  "Valencia Apartments": [
    { author: "Mia", rating: 5, body: "Affordable and well-maintained." },
    { author: "Nate", rating: 4, body: "Great community vibe!" },
    { author: "Olivia", rating: 1, body: "Bathrooms kept breaking." },
    { author: "Paul", rating: 2, body: "Parking is too expensive." },
    { author: "Quinn", rating: 4, body: "Love how it has public transportation access!" },
    { author: "Rachel", rating: 4, body: "Modern appliances and fast internet." },
    { author: "Sam", rating: 5, body: "Location is nice, good food and stores nearby" },
    { author: "Tina", rating: 3, body: "Nice quiet area." },
    { author: "Victor", rating: 3, body: "Thin walls, noisy neighbors." },
    { author: "Xander", rating: 5, body: "Would recommend to students!" }
  ],
  "Summit SLO": [
    { author: "Yara", rating: 4, body: "A bit expensive but cozy" },
    { author: "Zane", rating: 3, body: "Loud parties on weekends." },
    { author: "Anna", rating: 5, body: "The best in the area!" },
    { author: "Brian", rating: 4, body: "Spacious apartments, well-lit." },
    { author: "Cindy", rating: 2, body: "Laundry machines always broken." },
    { author: "David", rating: 5, body: "Great staff, very responsive!" },
    { author: "Holly", rating: 3, body: "Noisy road nearby." },
    { audthor: "James", rating: 4, body: "Good resturants and stores nearby"},
    { author: "Ian", rating: 4, body: "Decently close to university." },
    { author: "Jill", rating: 5, body: "10/10 would rent again!" }
  ],
  "Chorro at SLO": [
    { author: "Kyle", rating: 3, body: "Too expensive for what you get." },
    { author: "Liam", rating: 4, body: "Nice, but small rooms." },
    { author: "Monica", rating: 5, body: "Love the rooftop terrace!" },
    { author: "Nathan", rating: 3, body: "Needs more parking spaces." },
    { author: "Olga", rating: 4, body: "Staff is very helpful." },
    { author: "Peter", rating: 5, body: "Amazing place, love it here." },
    { author: "Quincy", rating: 3, body: "Heating could be better." },
    { author: "Rachel", rating: 4, body: "Lots of natural light." },
    { author: "Steve", rating: 5, body: "Secure and safe." },
    { author: "Tina", rating: 3, body: "Far from downtown." },
    { author: "Uma", rating: 4, body: "Great amenities!" },
    { author: "Victor", rating: 5, body: "The best property in SLO!" }
  ]
};

const seedDatabase = async () => {
  try {
    await Property.deleteMany({});
    await Review.deleteMany({});

    for (const propertyData of propertiesData) {
      const property = new Property(propertyData);
      await property.save();

      const reviews = writtenReviews[property.name].map(review => ({
        ...review,
        property: property._id
      }));

      await Review.insertMany(reviews);
    }

    console.log("Database seeded successfully.");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
