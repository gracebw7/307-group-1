// backend.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import property_service from "./services/property-service.js";
import review_service from "./services/review-service.js";
import {
  registerUser,
  authenticateUser,
  loginUser
} from "./auth.js";
dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

function addAuthHeader(otherHeaders = {}) {
  if (token === INVALID_TOKEN) {
    return otherHeaders;
  } else {
    return {
      ...otherHeaders,
      Authorization: `Bearer ${token}`
    };
  }
}

/* GET REQUESTS */

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
app.post("/properties", (req, res) => {
  const propertyToAdd = req.body;
  propertyToAdd["reviews"] = [];
  property_service
    .addProperty(propertyToAdd)
    .then((property) =>
      res.status(201).send(JSON.stringify(property.toObject()))
    );
});

//POST new review
//endpoint requries property id, this id is added to the review
//the review is additionally added to its property review list
app.post("/properties/:_id/reviews", (req, res) => {
  const _id = req.params["_id"];

  const reviewToAdd = { ...req.body };
  //reviewToAdd.property = _id;
  review_service
    .addReview(reviewToAdd, _id)
    .then((review) => {
      property_service
        .addPropertyReview(_id, review["_id"])
        .then(
          res
            .status(201)
            .send(JSON.stringify(review.toObject()))
        );
    })
    .catch(console.log((error) => console.error(error)));
});

/* DELETE REQUESTS */

/*
//delete review by id
app.delete("/reviews/:_id", (req, res) => {
  const _id = req.params["_id"]; //or req.params.id

  console.log("Running Delete");

  let rev_obj = undefined;
  review_service
    .getReviewById(_id)
    .then((rev) => {
      rev_obj = rev.toObject();
      const prop_id = rev_obj["property"];
      console.log(`Prop Id: ${prop_id}`);
      property_service.removePropReview(prop_id, _id);
    })
    .catch(console.log((error) => console.error(error)));

  if (_id == undefined) {
    res.status(404).send("Resource not found.");
  } else {
    review_service
      .deleteReviewById(_id)
      .then(() => res.status(204).send())
      .catch(console.log((error) => console.error(error)));
  }
});

//delete property by id
//note, this will also delete all reviews attached to the property
app.delete("/properties/_id", (req, res) => {
  const _id = req.params["_id"]; //or req.params.id

  if (_id == undefined) {
    res.status(404).send("Resource not found.");
  } else {
    //pull up property review list
    let rev_list = undefined;
    property_service
      .findPropertyById(_id)
      .then((property) => {
        rev_list = property.toObject()["reviews"];
        if (rev_list === undefined) {
          res.status(404).send("Resource not found.");
        } else {
          console.log(`${rev_list}`);
        }
      })
      .catch(console.log((error) => console.error(error)));

    rev_list.forEach((rev_id) =>
      review_service
        .deleteReviewById(rev_id)
        .catch(console.log((error) => console.error(error)))
    );

    property_service
      .deletePropertyById(_id)
      .then(() => res.status(204).send())
      .catch(console.log((error) => console.error(error)));
  }
});
*/

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
