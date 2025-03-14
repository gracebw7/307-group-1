import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import property_service from "./services/property-service.js";
import review_service from "./services/review-service.js";
import Property from "./models/property.js";
import Review from "./models/review.js";
import {
  registerUser,
  authenticateUser,
  loginUser
} from "./auth.js";
dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users")
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

/* GET REQUESTS */
app.get("/search", async (req, res) => {
  console.log("Search endpoint reached!");
  console.log("Query parameters:", req.query);


  const { address } = req.query;
  if (!address) {
    return res
      .status(400)
      .json({ error: "Address is required" });
  }

  try {
    const matchingProperties = await Property.find({
      address: { $regex: new RegExp(address, "i") }
      address: { $regex: new RegExp(address, "i") }
    });

    console.log("Found properties:", matchingProperties);

    if (matchingProperties.length === 0) {
      return res
        .status(404)
        .json({ error: "No properties found" });
      return res
        .status(404)
        .json({ error: "No properties found" });
    }

    res.json(matchingProperties);
  } catch (error) {
    console.error("Error searching properties:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//GET Property Review from property IDs
//returns array of review id
app.get("/properties/:_id/reviews", (req, res) => {
  const _id = req.params["_id"]; //or req.params.id
  let rev_list = undefined;
  property_service
    .findPropertyById(_id)
    .then((property) => {
      rev_list = { review_ids: property.toObject()["reviews"] };
      if (rev_list === undefined) {
        res.status(404).send("Resource not found.");
      } else {
        console.log(`${rev_list}`);
        res.send(rev_list);
      }
    })
    .catch(console.log((error) => console.error(error)));
});
//get property by id
app.get("/properties/:_id", async (req, res) => {
  const _id = req.params["_id"]; //or req.params.id
  property_service
    .findPropertyById(_id)
    .then((prop) => {
      const property = prop.toObject();
      if (property === undefined) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(property);
      }
    })
    .catch(console.log((error) => console.error(error)));
});

// search bar
app.get("/properties/search", async (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res
      .status(400)
      .json({ error: "Address is required" });
  }

  try {
    const matchingProperties = await Property.find({
      address: { $regex: new RegExp(address, "i") }
      address: { $regex: new RegExp(address, "i") }
    });

    if (matchingProperties.length === 0) {
      return res
        .status(404)
        .json({ error: "No properties found" });
    }

    res.json(matchingProperties);
  } catch (error) {
    console.error("Error searching properties:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//GET review by id
app.get("/reviews/:_id", (req, res) => {
  const _id = req.params["_id"]; //or req.params.id
  review_service
    .getReviewById(_id)
    .then((rev) => {
      const review = rev.toObject();
      if (review === undefined) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(review);
      }
    })
    .catch(console.log((error) => console.error(error)));
});

//GET properties
app.get("/properties", (req, res) => {
  property_service
    .getProps()
    .then((properties) => {
      let properties_list = {
        properties_list: properties.map((properties) =>
          properties.toObject()
        )
      };
      res.send(properties_list);
    })
    .catch(console.log((error) => console.error(error)));
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//GET reviews
app.get("/reviews", (req, res) => {
  review_service
    .getReviews()
    .then((reviews) => {
      let reviews_list = {
        reviews_list: reviews.map((reviews) =>
          reviews.toObject()
        )
      };
      res.send(reviews_list);
    })
    .catch(console.log((error) => console.error(error)));
});

/* POST REQUESTS */

//Signup POST
app.post("/signup", registerUser);

//Login POST
app.post("/login", loginUser);

//POST new property
//configrues with blank review array
app.post("/properties", authenticateUser, (req, res) => {
  const propertyToAdd = req.body;
  propertyToAdd["reviews"] = [];
  property_service
    .addProperty(propertyToAdd)
    .then((property) =>
      res.status(201).send(JSON.stringify(property.toObject()))
    );
});

// Helper function to summarize property attributes
const updatePropertyStats = (propertyId) => {
  return Review.find({ property: propertyId })
    .then((reviews) => {
      let averageRating = 0;

      if (reviews.length > 0) {
        let totalRating = 0;
        for (let i = 0; i < reviews.length; i++) {
          totalRating += reviews[i].rating;
        }
        let rawAverage = totalRating / reviews.length;
        averageRating = parseFloat(rawAverage.toFixed(2));
      }

      const tags = [
        ...new Set(reviews.flatMap((review) => review.tags))
      ];

      return Property.findByIdAndUpdate(
        propertyId,
        { averageRating, tags },
        { new: true }
      );
    })
    .catch((error) => {
      console.error("Error updating property stats:", error);
    });
};

//POST new review
//endpoint requries property id, this id is added to the review
//the review is additionally added to its property review list
app.post(
  "/properties/:_id/reviews",
  authenticateUser,
  (req, res) => {
    const _id = req.params["_id"];
app.post(
  "/properties/:_id/reviews",
  authenticateUser,
  (req, res) => {
    const _id = req.params["_id"];

    const reviewToAdd = { ...req.body };
    //reviewToAdd.property = _id;
    review_service
      .addReview(reviewToAdd, _id)
      .then((review) => {
        return property_service
          .addPropertyReview(_id, review["_id"])
          .then(() => review);
      })
      .then((review) => {
        return updatePropertyStats(_id).then(() => review);
      })
      .then((review) =>
        res.status(201).send(JSON.stringify(review.toObject()))
      )
      .catch(console.log((error) => console.error(error)));
  }
);

app.listen(process.env.PORT || port, () => {
  console.log("REST API is listening.");
});
